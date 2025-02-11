import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from 'path';
import { fileURLToPath } from 'url';

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Your existing middleware for logging
app.use((req, res, next) => {
  // ... existing logging middleware ...
  next();
});

(async () => {
  const server = registerRoutes(app);

  // Error handling middleware
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err); // Log error instead of throwing
  });

  // Environment-specific setup
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    // Production static file serving
    app.use(express.static(path.join(__dirname, '../client')));
    
    // Handle client-side routing
    app.get('*', (req, res) => {
      // Don't serve HTML for API routes
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ message: 'API route not found' });
      }
      res.sendFile(path.join(__dirname, '../client/index.html'));
    });
  }

  // Use PORT from environment variables for Vercel
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    log(`Server running on port ${PORT}`);
  });
})();
