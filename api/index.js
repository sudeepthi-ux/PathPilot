import { otpAuthPlugin } from '../server/otpAuthPlugin.js';
import { aiCompanionPlugin } from '../server/aiCompanionPlugin.js';

const handlers = [];
const mockServer = {
  middlewares: {
    use(fn) {
      handlers.push(fn);
    }
  }
};

otpAuthPlugin().configureServer(mockServer);
aiCompanionPlugin().configureServer(mockServer);

/**
 * Vercel Serverless Function entrypoint for /api/auth/*, /api/user/*, and /api/companion/*
 */
export default function handler(req, res) {
  let idx = 0;
  const next = () => {
    const fn = handlers[idx++];
    if (!fn) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: 'API endpoint not found' }));
      return;
    }
    fn(req, res, next);
  };
  next();
}
