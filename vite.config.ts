import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      '.trycloudflare.com',
    ],
  },
  build: {
    target: 'ES2020',
    sourcemap: true,
    outDir: 'dist',
  },
});