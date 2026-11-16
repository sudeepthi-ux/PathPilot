import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sendPasswordResetEmail } from './emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY);
const DATA_DIR = IS_SERVERLESS ? path.join(os.tmpdir(), 'pathpilot_data') : path.join(__dirname, 'data');
const AUTH_DB_PATH = path.join(DATA_DIR, 'auth_db.json');

export const RESET_TOKEN_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes
export const RESET_RATE_LIMIT_MS = 60 * 1000; // 60 seconds
export const SESSION_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function readAuthDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(AUTH_DB_PATH)) {
    return { users: {}, resets: {}, sessions: {}, profiles: {} };
  }
  try {
    const raw = fs.readFileSync(AUTH_DB_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      users: parsed?.users && typeof parsed.users === 'object' ? parsed.users : {},
      resets: parsed?.resets && typeof parsed.resets === 'object' ? parsed.resets : {},
      sessions: parsed?.sessions && typeof parsed.sessions === 'object' ? parsed.sessions : {},
      profiles: parsed?.profiles && typeof parsed.profiles === 'object' ? parsed.profiles : {}
    };
  } catch {
    return { users: {}, resets: {}, sessions: {}, profiles: {} };
  }
}

function writeAuthDb(db) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(
    AUTH_DB_PATH,
    JSON.stringify(
      {
        users: db.users || {},
        resets: db.resets || {},
        sessions: db.sessions || {},
        profiles: db.profiles || {}
      },
      null,
      2
    ),
    'utf8'
  );
}

function hashSessionToken(token = '') {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

function issueSessionForUser(db, user) {
  const now = Date.now();
  // Prune expired sessions
  for (const [key, sess] of Object.entries(db.sessions || {})) {
    if (!sess || !sess.expiresAt || sess.expiresAt < now) {
      delete db.sessions[key];
    }
  }
  const sessionToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashSessionToken(sessionToken);
  db.sessions[tokenHash] = {
    userId: user.id,
    email: user.email,
    createdAt: now,
    expiresAt: now + SESSION_EXPIRY_MS
  };
  return sessionToken;
}

function extractBearerToken(req) {
  const header = req?.headers?.authorization || '';
  const match = String(header).match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : '';
}

function authenticateRequest(req) {
  const token = extractBearerToken(req);
  if (!token) {
    return { authenticated: false };
  }
  const tokenHash = hashSessionToken(token);
  const db = readAuthDb();
  const session = db.sessions?.[tokenHash];
  if (!session || (session.expiresAt && Date.now() > session.expiresAt)) {
    if (session) {
      delete db.sessions[tokenHash];
      writeAuthDb(db);
    }
    return { authenticated: false };
  }
  const user = db.users?.[session.email];
  if (!user) {
    return { authenticated: false };
  }
  return { authenticated: true, user, session, tokenHash, db };
}

function normalizeEmail(email = '') {
  return String(email).trim().toLowerCase();
}

function isValidEmail(email = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

function hashSecret(value, salt) {
  return crypto.scryptSync(String(value), salt, 64).toString('hex');
}

function verifySecret(value, salt, expectedHash) {
  if (!salt || !expectedHash) return false;
  const computed = crypto.scryptSync(String(value), salt, 64);
  const expected = Buffer.from(expectedHash, 'hex');
  if (computed.length !== expected.length) return false;
  return crypto.timingSafeEqual(computed, expected);
}

function readJsonBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return Promise.resolve(req.body);
  }
  if (typeof req.body === 'string' && req.body.length > 0) {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch {
      return Promise.reject(new Error('Invalid JSON request body'));
    }
  }
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1e6) {
        reject(new Error('Request payload too large'));
      }
    });
    req.on('end', () => {
      if (!data) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error('Invalid JSON request body'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

function toSafeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    university: user.university,
    major: user.major,
    gradYear: user.gradYear || '2026',
    targetIndustry: user.targetIndustry || '',
    bio: user.bio || '',
    createdAt: user.createdAt
  };
}

function handleRegister(body) {
  const name = String(body.name || '').trim();
  const email = normalizeEmail(body.email);
  const password = String(body.password || '');
  const university = String(body.university || '').trim() || 'University Student';
  const major = String(body.major || '').trim() || 'Interdisciplinary Studies';

  if (!name) {
    return {
      status: 400,
      payload: { error: 'Please provide your full student name.', code: 'VALIDATION_ERROR' }
    };
  }
  if (!isValidEmail(email)) {
    return {
      status: 400,
      payload: { error: 'Please provide a valid email address.', code: 'VALIDATION_ERROR' }
    };
  }
  if (password.length < 6) {
    return {
      status: 400,
      payload: { error: 'Password must contain at least 6 characters.', code: 'VALIDATION_ERROR' }
    };
  }

  const db = readAuthDb();
  if (db.users[email]) {
    return {
      status: 409,
      payload: {
        error: 'An account with this email address already exists. Please sign in.',
        code: 'EMAIL_EXISTS'
      }
    };
  }

  const now = new Date().toISOString();
  const passwordSalt = generateSalt();
  const passwordHash = hashSecret(password, passwordSalt);

  const user = {
    id: `student-${crypto.randomUUID()}`,
    name,
    email,
    university,
    major,
    gradYear: '2026',
    passwordHash,
    passwordSalt,
    createdAt: now,
    updatedAt: now
  };

  db.users[email] = user;
  const sessionToken = issueSessionForUser(db, user);
  const profile = db.profiles?.[user.id] || null;
  writeAuthDb(db);

  return {
    status: 200,
    payload: {
      success: true,
      user: toSafeUser(user),
      sessionToken,
      profile
    }
  };
}

function handleLogin(body) {
  const email = normalizeEmail(body.email);
  const password = String(body.password || '');

  if (!isValidEmail(email) || !password) {
    return {
      status: 400,
      payload: { error: 'Please provide both your email address and password.', code: 'VALIDATION_ERROR' }
    };
  }

  const db = readAuthDb();
  const user = db.users[email];

  if (!user || !verifySecret(password, user.passwordSalt, user.passwordHash)) {
    return {
      status: 401,
      payload: {
        error: 'Invalid email or password. Please check your credentials and try again.',
        code: 'INVALID_CREDENTIALS'
      }
    };
  }

  const sessionToken = issueSessionForUser(db, user);
  const profile = db.profiles?.[user.id] || null;
  writeAuthDb(db);

  return {
    status: 200,
    payload: {
      success: true,
      user: toSafeUser(user),
      sessionToken,
      profile
    }
  };
}

function handleLogout(req, body = {}) {
  const token = extractBearerToken(req) || String(body.sessionToken || '').trim();
  if (token) {
    const db = readAuthDb();
    const tokenHash = hashSessionToken(token);
    if (db.sessions?.[tokenHash]) {
      delete db.sessions[tokenHash];
      writeAuthDb(db);
    }
  }
  return {
    status: 200,
    payload: { success: true }
  };
}

function handleGetSession(req) {
  const auth = authenticateRequest(req);
  if (!auth.authenticated) {
    return {
      status: 401,
      payload: {
        authenticated: false,
        error: 'Authentication required.',
        code: 'UNAUTHORIZED'
      }
    };
  }
  return {
    status: 200,
    payload: {
      authenticated: true,
      user: toSafeUser(auth.user),
      profile: auth.db.profiles?.[auth.user.id] || null
    }
  };
}

function handleGetProfile(req) {
  const auth = authenticateRequest(req);
  if (!auth.authenticated) {
    return {
      status: 401,
      payload: {
        error: 'Authentication required to access private student data.',
        code: 'UNAUTHORIZED'
      }
    };
  }
  return {
    status: 200,
    payload: {
      user: toSafeUser(auth.user),
      profile: auth.db.profiles?.[auth.user.id] || null
    }
  };
}

function handleUpdateProfile(req, body = {}) {
  const auth = authenticateRequest(req);
  if (!auth.authenticated) {
    return {
      status: 401,
      payload: {
        error: 'Authentication required to update private student data.',
        code: 'UNAUTHORIZED'
      }
    };
  }

  if (body.userUpdates && typeof body.userUpdates === 'object') {
    const allowedKeys = ['name', 'university', 'major', 'gradYear', 'targetIndustry', 'bio'];
    const currentUser = auth.db.users[auth.user.email];
    const nextUser = { ...currentUser };
    for (const key of allowedKeys) {
      if (body.userUpdates[key] !== undefined) {
        nextUser[key] = String(body.userUpdates[key] || '').trim();
      }
    }
    nextUser.updatedAt = new Date().toISOString();
    auth.db.users[auth.user.email] = nextUser;
    auth.user = nextUser;
  }

  const incoming = body.profile && typeof body.profile === 'object' ? body.profile : body;
  const existingProfile = auth.db.profiles?.[auth.user.id] || {};
  const hasProfilePayload = Boolean(body.profile) || !body.userUpdates;

  const sanitized = hasProfilePayload
    ? {
        personalityResult: incoming.personalityResult ?? null,
        interestResult: incoming.interestResult ?? null,
        strengthResult: incoming.strengthResult ?? null,
        assessmentResponses: {
          personality: incoming.assessmentResponses?.personality || {},
          interests: incoming.assessmentResponses?.interests || {},
          strengths: incoming.assessmentResponses?.strengths || {}
        },
        completedExperiments: Array.isArray(incoming.completedExperiments) ? incoming.completedExperiments : [],
        savedCareers: Array.isArray(incoming.savedCareers) ? incoming.savedCareers : [],
        exploredCareers: Array.isArray(incoming.exploredCareers) ? incoming.exploredCareers : [],
        skillGapResults: incoming.skillGapResults || {},
        learningRoadmaps: incoming.learningRoadmaps || {},
        airaMessages: Array.isArray(incoming.airaMessages) ? incoming.airaMessages : [],
        airaPastSessions: Array.isArray(incoming.airaPastSessions) ? incoming.airaPastSessions : [],
        recentActivities: Array.isArray(incoming.recentActivities) ? incoming.recentActivities : [],
        notifications: Array.isArray(incoming.notifications) ? incoming.notifications : [],
        updatedAt: new Date().toISOString()
      }
    : existingProfile;

  if (hasProfilePayload) {
    auth.db.profiles[auth.user.id] = sanitized;
  }
  writeAuthDb(auth.db);

  return {
    status: 200,
    payload: {
      success: true,
      user: toSafeUser(auth.user),
      profile: sanitized
    }
  };
}

async function handleForgotPassword(body, req) {
  const email = normalizeEmail(body.email);
  if (!isValidEmail(email)) {
    return {
      status: 400,
      payload: { error: 'Please provide a valid email address.', code: 'VALIDATION_ERROR' }
    };
  }

  const db = readAuthDb();
  const user = db.users[email];

  if (!user) {
    return {
      status: 404,
      payload: {
        error: 'No account found with that email address.',
        code: 'USER_NOT_FOUND'
      }
    };
  }

  const now = Date.now();
  const existingReset = db.resets?.[email];
  if (existingReset && existingReset.requestedAt && now - existingReset.requestedAt < RESET_RATE_LIMIT_MS) {
    const retryAfterSeconds = Math.ceil((RESET_RATE_LIMIT_MS - (now - existingReset.requestedAt)) / 1000);
    return {
      status: 429,
      payload: {
        error: `Please wait ${retryAfterSeconds} second${retryAfterSeconds === 1 ? '' : 's'} before requesting another password reset email.`,
        code: 'RATE_LIMITED',
        retryAfterSeconds
      }
    };
  }

  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenSalt = generateSalt();
  const tokenHash = hashSecret(rawToken, tokenSalt);

  db.resets[email] = {
    tokenHash,
    tokenSalt,
    expiresAt: now + RESET_TOKEN_EXPIRY_MS,
    requestedAt: now,
    used: false
  };
  writeAuthDb(db);

  const rawOrigin = String(body.origin || '').trim() || `http://${req?.headers?.host || 'localhost:3000'}`;
  const cleanOrigin = rawOrigin.replace(/\/+$/, '');
  const resetUrl = `${cleanOrigin}/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

  try {
    await sendPasswordResetEmail({
      to: email,
      name: user.name,
      resetUrl
    });

    return {
      status: 200,
      payload: {
        success: true,
        message: 'Password reset instructions have been sent to your email.'
      }
    };
  } catch (err) {
    if (err.code === 'EMAIL_PROVIDER_NOT_CONFIGURED') {
      return {
        status: 503,
        payload: {
          error: err.message,
          code: 'EMAIL_PROVIDER_NOT_CONFIGURED'
        }
      };
    }

    return {
      status: 502,
      payload: {
        error: `Failed to send password reset email: ${err.message}`,
        code: 'EMAIL_DELIVERY_FAILED'
      }
    };
  }
}

function validateResetRecord(db, email, token) {
  if (!isValidEmail(email) || !token) {
    return {
      valid: false,
      status: 400,
      code: 'TOKEN_INVALID',
      error: 'This password reset link is invalid or incomplete.'
    };
  }

  const user = db.users?.[email];
  if (!user) {
    return {
      valid: false,
      status: 404,
      code: 'USER_NOT_FOUND',
      error: 'No student account matches this password reset link.'
    };
  }

  const record = db.resets?.[email];
  if (!record || record.used === true) {
    return {
      valid: false,
      status: 400,
      code: 'TOKEN_INVALID',
      error: 'This password reset link is invalid or has already been used.'
    };
  }

  if (Date.now() > record.expiresAt) {
    return {
      valid: false,
      status: 400,
      code: 'TOKEN_EXPIRED',
      error: 'This password reset link has expired (links are valid for 15 minutes). Please request a new reset link.'
    };
  }

  if (!verifySecret(token, record.tokenSalt, record.tokenHash)) {
    return {
      valid: false,
      status: 400,
      code: 'TOKEN_INVALID',
      error: 'Invalid password reset token. Please request a fresh password reset link.'
    };
  }

  return { valid: true, user, record };
}

function handleVerifyResetToken(body) {
  const email = normalizeEmail(body.email);
  const token = String(body.token || '').trim();
  const db = readAuthDb();
  const check = validateResetRecord(db, email, token);

  if (!check.valid) {
    return {
      status: check.status,
      payload: { valid: false, error: check.error, code: check.code }
    };
  }

  return {
    status: 200,
    payload: { valid: true, email }
  };
}

function handleResetPassword(body) {
  const email = normalizeEmail(body.email);
  const token = String(body.token || '').trim();
  const newPassword = String(body.newPassword || '');

  if (newPassword.length < 6) {
    return {
      status: 400,
      payload: {
        error: 'New password must contain at least 6 characters.',
        code: 'VALIDATION_ERROR'
      }
    };
  }

  const db = readAuthDb();
  const check = validateResetRecord(db, email, token);

  if (!check.valid) {
    return {
      status: check.status,
      payload: { error: check.error, code: check.code }
    };
  }

  const passwordSalt = generateSalt();
  const passwordHash = hashSecret(newPassword, passwordSalt);

  db.users[email] = {
    ...check.user,
    passwordSalt,
    passwordHash,
    updatedAt: new Date().toISOString()
  };
  delete db.resets[email];
  writeAuthDb(db);

  return {
    status: 200,
    payload: {
      success: true,
      message: 'Your password has been reset successfully. You can now sign in with your new password.'
    }
  };
}

function attachAuthMiddleware(middlewares) {
  middlewares.use(async (req, res, next) => {
    const reqUrl = (req.url || '').split('?')[0];
    const isAuthRoute = reqUrl.startsWith('/api/auth/');
    const isUserRoute = reqUrl.startsWith('/api/user/');
    if (!isAuthRoute && !isUserRoute) {
      next();
      return;
    }

    try {
      if (reqUrl === '/api/user/profile') {
        if (req.method === 'GET') {
          const result = handleGetProfile(req);
          sendJson(res, result.status, result.payload);
          return;
        }
        if (req.method === 'PUT') {
          const body = await readJsonBody(req);
          const result = handleUpdateProfile(req, body);
          sendJson(res, result.status, result.payload);
          return;
        }
        sendJson(res, 405, { error: 'Method not allowed' });
        return;
      }

      if (reqUrl === '/api/auth/session' && req.method === 'GET') {
        const result = handleGetSession(req);
        sendJson(res, result.status, result.payload);
        return;
      }

      if (req.method !== 'POST') {
        sendJson(res, 405, { error: 'Method not allowed' });
        return;
      }

      const body = await readJsonBody(req);
      let result;

      if (reqUrl === '/api/auth/register') {
        result = handleRegister(body);
      } else if (reqUrl === '/api/auth/login') {
        result = handleLogin(body);
      } else if (reqUrl === '/api/auth/logout') {
        result = handleLogout(req, body);
      } else if (reqUrl === '/api/auth/session') {
        result = handleGetSession(req);
      } else if (reqUrl === '/api/auth/forgot-password') {
        result = await handleForgotPassword(body, req);
      } else if (reqUrl === '/api/auth/verify-reset-token') {
        result = handleVerifyResetToken(body);
      } else if (reqUrl === '/api/auth/reset-password') {
        result = handleResetPassword(body);
      } else {
        sendJson(res, 404, { error: 'Endpoint not found' });
        return;
      }

      sendJson(res, result.status, result.payload);
    } catch (err) {
      console.error('[PathPilot Auth API Error]:', err);
      sendJson(res, 500, {
        error: err.message || 'An unexpected server error occurred. Please try again.',
        code: 'SERVER_ERROR'
      });
    }
  });
}

export function otpAuthPlugin() {
  return {
    name: 'pathpilot-auth-plugin',
    configureServer(server) {
      attachAuthMiddleware(server.middlewares);
    },
    configurePreviewServer(server) {
      attachAuthMiddleware(server.middlewares);
    }
  };
}
