import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  // Maintain your existing plugins while adding optimization configurations
  plugins: [react(), runtimeErrorOverlay(), themePlugin()],

  // Keep your current path aliases while ensuring they work with the new structure
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },

  // Maintain your root directory configuration
  root: path.resolve(__dirname, "client"),

  // Enhanced build configuration for Vercel deployment
  build: {
    // Update the output directory to align with our server expectations
    outDir: path.resolve(__dirname, "dist/client"),
    emptyOutDir: true,
    sourcemap: true,
    
    // Optimize chunk splitting for better performance
    rollupOptions: {
      output: {
        // Create separate chunks for large dependencies
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group Radix UI components together
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            // Group React and related packages
            if (id.includes('react')) {
              return 'vendor-react';
            }
            // Group other large dependencies
            return 'vendor';
          }
        }
      }
    }
  },

  // Development server configuration for better local development
  server: {
    // Handle API requests during development
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },

  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu'
    ]
  }
});
