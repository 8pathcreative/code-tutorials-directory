```json
// package.json
{
  "name": "code-tutorials-directory",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx server/index.ts",
    "build": "vite build",
    "db:push": "drizzle-kit push"
  }
}

// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"]
    }
  }
}
```
