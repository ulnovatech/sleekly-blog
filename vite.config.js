import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// Vite Plugin to serve admin interface
function adminPlugin() {
  let viteConfig = null;
  
  return {
    name: 'admin-plugin',
    configResolved(config) {
      viteConfig = config;
    },
    configureServer(server) {
      return () => {
        // Add pre-middleware that runs BEFORE default HTML middleware
        server.middlewares.use((req, res, next) => {
          // Only handle admin root path in middleware: /admin, /admin/, /blog/admin, /blog/admin/
          const requestPath = req.url.split('?')[0];
          const rootMatch = /^(?:\/(?:blog\/)?admin\/?$)/i.test(requestPath);
          const fileMatch = /^(?:\/(?:blog\/)?admin\/(.+))$/i.exec(requestPath);

          if (!rootMatch && !fileMatch) {
            return next();
          }

          console.log(`[ADMIN PLUGIN] Intercepted request: ${req.url}`);

          // Serve admin UI shell for root admin URL
          if (rootMatch) {
            const adminIndexPath = path.resolve(viteConfig.root, 'public/admin/index.html');

            if (!fs.existsSync(adminIndexPath)) {
              console.error(`[ADMIN PLUGIN] Admin index.html not found at: ${adminIndexPath}`);
              res.statusCode = 404;
              res.end('Admin interface not configured');
              return;
            }

            try {
              const html = fs.readFileSync(adminIndexPath, 'utf-8');
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
              res.end(html);
              console.log(`[ADMIN PLUGIN] ✓ Served admin interface`);
            } catch (err) {
              console.error(`[ADMIN PLUGIN] Error serving admin:`, err);
              res.statusCode = 500;
              res.end(`Error: ${err.message}`);
            }
            return;
          }

          // For asset requests under admin (config.yml, test.txt, etc.) map /blog/admin/* -> /admin/*
          if (fileMatch) {
            const requestedFile = fileMatch[1];
            const assetPath = path.resolve(viteConfig.root, 'public/admin', requestedFile);

            if (fs.existsSync(assetPath) && fs.statSync(assetPath).isFile()) {
              const ext = path.extname(assetPath).toLowerCase();
              const mime = {
                '.html': 'text/html; charset=utf-8',
                '.css': 'text/css; charset=utf-8',
                '.js': 'application/javascript; charset=utf-8',
                '.json': 'application/json; charset=utf-8',
                '.yml': 'text/yaml; charset=utf-8',
                '.yaml': 'text/yaml; charset=utf-8',
                '.txt': 'text/plain; charset=utf-8',
              }[ext] || 'application/octet-stream';

              res.setHeader('Content-Type', mime);
              res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
              const data = fs.readFileSync(assetPath);
              res.end(data);
              console.log(`[ADMIN PLUGIN] ✓ Served admin asset: ${requestedFile}`);
              return;
            }

            // if asset does not exist, let normal static/SPA handle it
            return next();
          }
        });
      };
    }
  };
}

export default defineConfig({
  plugins: [adminPlugin(), react()],
  base: '/blog/',
  css: {
    postcss: "./postcss.config.cjs",
  },
  server: {
    fs: {
      allow: ["."],
    },
    headers: {
      "Content-Security-Policy":
        process.env.NODE_ENV === "production"
          ? "script-src 'self';"
          : "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
    },
    proxy: {
      "/php": {
        target: "http://localhost/ulnovatech",
        changeOrigin: true,
        secure: false,
      },
      "/api/optimizer": {
        target: "http://localhost:5173",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/optimizer/, ""),
      },
      "/api/v1": {
        target: "http://localhost:8081",
        changeOrigin: true,
      },
    },
  },
});