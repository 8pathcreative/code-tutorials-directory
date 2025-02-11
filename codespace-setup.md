# Code Tutorials Directory - Setup Guide

## Project Structure
```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── category-nav.tsx
│   │   │   ├── resource-card.tsx
│   │   │   └── search-bar.tsx
│   │   ├── pages/
│   │   │   └── home.tsx
│   │   └── App.tsx
├── server/
│   ├── routes.ts
│   ├── storage.ts
│   └── db.ts
└── shared/
    └── schema.ts
```

## Setup Instructions

1. Create a new repository in GitHub
2. Open in GitHub Codespaces
3. Install dependencies:
```bash
npm install @tanstack/react-query @hookform/resolvers/zod drizzle-orm @neondatabase/serverless drizzle-zod express react react-dom wouter lucide-react zod tailwindcss @radix-ui/react-* class-variance-authority
```

4. Create a PostgreSQL database (you can use Neon.tech, which has a free tier)
5. Set up your environment variables:
   - Create `.env` file with your database URL:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   ```

6. Initialize the database:
```bash
npm run db:push
```

7. Start the development server:
```bash
npm run dev
```

## Key Files to Implement

Copy these files into your repository structure:
