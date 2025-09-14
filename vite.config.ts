/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow access via localhost, 127.0.0.1, or LAN IP
    port: 5173, // Default dev server port
    strictPort: false, // Try another port if 5173 is taken
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
