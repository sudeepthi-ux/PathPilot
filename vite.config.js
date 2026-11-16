import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { otpAuthPlugin } from './server/otpAuthPlugin.js';
import { aiCompanionPlugin } from './server/aiCompanionPlugin.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), otpAuthPlugin(), aiCompanionPlugin()],
  server: {
    port: 3000,
    host: true
  }
});
