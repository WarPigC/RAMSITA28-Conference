import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'health-endpoint',
      configureServer(server) {
        server.middlewares.use('/api/health', (req, res) => {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify({ status: 'ok' }));
        });
      }
    }
  ],
  server: {
    port: 3000
  }
});
