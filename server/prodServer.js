import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { otpAuthPlugin } from './otpAuthPlugin.js';
import { aiCompanionPlugin } from './aiCompanionPlugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const middlewares = [];
const serverAdapter = {
  middlewares: {
    use(fn) {
      middlewares.push(fn);
    }
  }
};

otpAuthPlugin().configureServer(serverAdapter);
aiCompanionPlugin().configureServer(serverAdapter);

function serveStaticOrSpa(req, res) {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const safeRel = path.normalize(urlPath).replace(/^(\.\.(\/|\\|$))+/, '');
  const candidate = path.join(DIST_DIR, safeRel);

  if (
    candidate.startsWith(DIST_DIR) &&
    fs.existsSync(candidate) &&
    fs.statSync(candidate).isFile()
  ) {
    const ext = path.extname(candidate).toLowerCase();
    res.statusCode = 200;
    res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
    if (urlPath.startsWith('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    fs.createReadStream(candidate).pipe(res);
    return;
  }

  const indexHtml = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexHtml)) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    fs.createReadStream(indexHtml).pipe(res);
    return;
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Production build not found. Run "npm run build" before "npm start".');
}

const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  let idx = 0;
  const next = () => {
    const fn = middlewares[idx++];
    if (!fn) {
      serveStaticOrSpa(req, res);
      return;
    }
    fn(req, res, next);
  };
  next();
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`PathPilot production server listening on http://0.0.0.0:${PORT}`);
});
