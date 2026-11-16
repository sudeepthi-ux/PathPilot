import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
import tls from 'node:tls';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY);
const DATA_DIR = IS_SERVERLESS ? path.join(os.tmpdir(), 'pathpilot_data') : path.join(__dirname, 'data');
const MAIL_SPOOL_PATH = path.join(DATA_DIR, 'mail_spool.json');

/**
 * Load environment variables from .env without overriding existing process.env entries.
 */
function loadDotEnv() {
  const envVars = {};
  for (const envFile of ['.env', '.env.local']) {
    const filePath = path.join(ROOT_DIR, envFile);
    if (!fs.existsSync(filePath)) continue;
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      for (const rawLine of content.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) continue;
        const eqIdx = line.indexOf('=');
        if (eqIdx === -1) continue;
        const key = line.slice(0, eqIdx).trim();
        let val = line.slice(eqIdx + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (key) envVars[key] = val;
      }
    } catch (err) {
      console.warn(`[PathPilot Email] Could not parse ${envFile}:`, err.message);
    }
  }
  return { ...envVars, ...process.env };
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildPasswordResetEmailContent({ name, resetUrl }) {
  const safeName = escapeHtml(name || 'Student');
  const safeUrl = escapeHtml(resetUrl);
  const subject = 'Reset your PathPilot password';

  const text = [
    `Hi ${name || 'Student'},`,
    '',
    'We received a request to reset your PathPilot account password.',
    'Open the link below within 15 minutes to set a new password:',
    '',
    `    ${resetUrl}`,
    '',
    'If you did not request a password reset, you can safely ignore this email.',
    '',
    '— The PathPilot Team'
  ].join('\n');

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF9F5; padding: 36px 20px; color: #131615;">
      <div style="max-width: 520px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #EAE6DB; border-radius: 24px; padding: 32px;">
        <div style="margin-bottom: 20px;">
          <span style="display: inline-block; background-color: #1D4D38; color: #FAF9F5; font-weight: 700; font-size: 13px; letter-spacing: 0.04em; padding: 6px 14px; border-radius: 999px;">
            PathPilot
          </span>
        </div>
        <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 12px; color: #131615;">
          Reset your password
        </h1>
        <p style="font-size: 14px; line-height: 1.6; color: #4A4F4D; margin: 0 0 24px;">
          Hi ${safeName},<br/><br/>
          Click the button below to choose a new password for your PathPilot student account:
        </p>
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${safeUrl}" style="display: inline-block; background-color: #1D4D38; color: #FAF9F5; text-decoration: none; font-weight: 600; font-size: 14px; padding: 14px 28px; border-radius: 999px;">
            Reset Password
          </a>
        </div>
        <p style="font-size: 12px; line-height: 1.5; color: #5C6360; margin: 0 0 12px; word-break: break-all;">
          Or copy this link into your browser: <br/>
          <a href="${safeUrl}" style="color: #1D4D38;">${safeUrl}</a>
        </p>
        <p style="font-size: 12px; line-height: 1.5; color: #5C6360; margin: 0 0 8px;">
          <strong>Important:</strong> This reset link expires in <strong>15 minutes</strong>.
        </p>
        <p style="font-size: 12px; line-height: 1.5; color: #7C827F; margin: 0;">
          If you did not request a password reset, you can safely ignore this message.
        </p>
      </div>
    </div>
  `.trim();

  return { subject, text, html };
}

function appendToMailSpool(record) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  let spool = [];
  if (fs.existsSync(MAIL_SPOOL_PATH)) {
    try {
      const existing = JSON.parse(fs.readFileSync(MAIL_SPOOL_PATH, 'utf8'));
      if (Array.isArray(existing)) spool = existing;
    } catch {
      spool = [];
    }
  }
  spool.push(record);
  // Keep latest 100 emails
  if (spool.length > 100) {
    spool = spool.slice(-100);
  }
  fs.writeFileSync(MAIL_SPOOL_PATH, JSON.stringify(spool, null, 2), 'utf8');
}

async function sendViaResend({ apiKey, from, to, subject, html, text }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({ from, to: [to], subject, html, text })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Resend API error (${response.status}): ${errText}`);
  }
  return await response.json();
}

async function sendViaSendGrid({ apiKey, from, to, subject, html, text }) {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from },
      subject,
      content: [
        { type: 'text/plain', value: text },
        { type: 'text/html', value: html }
      ]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`SendGrid API error (${response.status}): ${errText}`);
  }
  return { status: response.status };
}

/**
 * Lightweight SMTP over TLS/STARTTLS client using Node built-in net/tls.
 */
function sendViaSmtp({ host, port, user, pass, from, to, subject, text, html }) {
  return new Promise((resolve, reject) => {
    const portNum = Number(port) || 465;
    const useDirectTls = portNum === 465;
    const boundary = `----PathPilot_${Date.now().toString(36)}`;

    const rawEmail = [
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/plain; charset="UTF-8"',
      'Content-Transfer-Encoding: 7bit',
      '',
      text,
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset="UTF-8"',
      'Content-Transfer-Encoding: 7bit',
      '',
      html,
      '',
      `--${boundary}--`,
      '.'
    ].join('\r\n');

    let socket = useDirectTls
      ? tls.connect({ host, port: portNum, rejectUnauthorized: true })
      : net.connect({ host, port: portNum });

    let buffer = '';
    let settled = false;
    const finish = (err, info) => {
      if (settled) return;
      settled = true;
      try {
        socket.end();
      } catch {}
      if (err) reject(err);
      else resolve(info);
    };

    socket.setTimeout(15000, () => {
      finish(new Error('SMTP connection timed out'));
    });
    socket.on('error', (err) => finish(err));

    const readResponse = () =>
      new Promise((res, rej) => {
        const tryParse = () => {
          const lines = buffer.split(/\r?\n/);
          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i];
            if (/^\d{3} /.test(line)) {
              const code = Number(line.slice(0, 3));
              const full = lines.slice(0, i + 1).join('\n');
              buffer = lines.slice(i + 1).join('\n');
              cleanup();
              res({ code, text: full });
              return;
            }
          }
        };
        const onData = (chunk) => {
          buffer += chunk.toString('utf8');
          tryParse();
        };
        const onErr = (e) => {
          cleanup();
          rej(e);
        };
        const cleanup = () => {
          socket.off('data', onData);
          socket.off('error', onErr);
        };
        socket.on('data', onData);
        socket.on('error', onErr);
        tryParse();
      });

    const sendCmd = async (cmd, expectedCodes) => {
      socket.write(`${cmd}\r\n`);
      const resp = await readResponse();
      if (!expectedCodes.includes(resp.code)) {
        throw new Error(`SMTP command failed (${cmd.split(' ')[0]}): ${resp.text}`);
      }
      return resp;
    };

    (async () => {
      const greeting = await readResponse();
      if (greeting.code !== 220) {
        throw new Error(`SMTP greeting error: ${greeting.text}`);
      }
      const ehloResp = await sendCmd('EHLO pathpilot.local', [250]);

      if (!useDirectTls && /STARTTLS/i.test(ehloResp.text)) {
        await sendCmd('STARTTLS', [220]);
        socket = await new Promise((res, rej) => {
          const tlsSock = tls.connect({ socket, servername: host, rejectUnauthorized: true }, () => {
            res(tlsSock);
          });
          tlsSock.on('error', rej);
        });
        socket.on('error', (err) => finish(err));
        await sendCmd('EHLO pathpilot.local', [250]);
      }

      if (user && pass) {
        await sendCmd('AUTH LOGIN', [334]);
        await sendCmd(Buffer.from(user, 'utf8').toString('base64'), [334]);
        await sendCmd(Buffer.from(pass, 'utf8').toString('base64'), [235]);
      }

      const envelopeFrom = from.includes('<') ? from.match(/<([^>]+)>/)?.[1] || from : from;
      await sendCmd(`MAIL FROM:<${envelopeFrom}>`, [250]);
      await sendCmd(`RCPT TO:<${to}>`, [250, 251]);
      await sendCmd('DATA', [354]);
      const dataResp = await sendCmd(rawEmail, [250]);
      await sendCmd('QUIT', [221]).catch(() => {});
      finish(null, { accepted: [to], response: dataResp.text });
    })().catch((err) => finish(err));
  });
}

/**
 * Send Password Reset Email using a configured external provider (Resend, SendGrid, or SMTP).
 * Records generated email details in server/data/mail_spool.json for server inspection.
 * Never falsely reports delivery success if no real provider is configured or if sending fails.
 */
export async function sendPasswordResetEmail({ to, name, resetUrl }) {
  const env = loadDotEnv();
  const { subject, text, html } = buildPasswordResetEmailContent({ name, resetUrl });
  const from =
    env.EMAIL_FROM || env.SMTP_FROM || env.SMTP_USER || 'PathPilot <no-reply@pathpilot.local>';

  const hasResend = Boolean(env.RESEND_API_KEY && !env.RESEND_API_KEY.includes('xxxxx'));
  const hasSendGrid = Boolean(env.SENDGRID_API_KEY && !env.SENDGRID_API_KEY.includes('xxxxx'));
  const hasSmtp = Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);

  const transport = hasResend
    ? 'resend'
    : hasSendGrid
    ? 'sendgrid'
    : hasSmtp
    ? 'smtp'
    : 'unconfigured';

  const spoolRecord = {
    id: `mail_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type: 'password_reset',
    to,
    from,
    subject,
    resetUrl,
    text,
    html,
    transport,
    delivered: false,
    dispatchedAt: new Date().toISOString()
  };

  if (!hasResend && !hasSendGrid && !hasSmtp) {
    appendToMailSpool(spoolRecord);
    const err = new Error(
      'Email delivery service is not configured on the server. Configure SMTP_HOST/SMTP_USER/SMTP_PASS, RESEND_API_KEY, or Supabase Auth in .env to send password reset emails.'
    );
    err.code = 'EMAIL_PROVIDER_NOT_CONFIGURED';
    throw err;
  }

  let providerResult = null;
  try {
    if (hasResend) {
      providerResult = await sendViaResend({
        apiKey: env.RESEND_API_KEY,
        from,
        to,
        subject,
        html,
        text
      });
    } else if (hasSendGrid) {
      providerResult = await sendViaSendGrid({
        apiKey: env.SENDGRID_API_KEY,
        from,
        to,
        subject,
        html,
        text
      });
    } else if (hasSmtp) {
      providerResult = await sendViaSmtp({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT || '587',
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
        from,
        to,
        subject,
        text,
        html
      });
    }

    spoolRecord.delivered = true;
    appendToMailSpool(spoolRecord);

    console.info(
      `[PathPilot Email] Password reset email dispatched to ${to} via ${transport} (spool id: ${spoolRecord.id})`
    );

    return {
      delivered: true,
      transport,
      spoolId: spoolRecord.id,
      providerResult
    };
  } catch (err) {
    spoolRecord.error = err.message;
    appendToMailSpool(spoolRecord);

    const wrapped = new Error(err.message || 'Email provider failed to send password reset email.');
    wrapped.code = err.code || 'EMAIL_DELIVERY_FAILED';
    throw wrapped;
  }
}
