```typescript
// server/db.ts
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
  max: 20
});

export const db = drizzle({ client: pool, schema });

// server/storage.ts
import { resources, type Resource, type InsertResource } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAllResources(): Promise<Resource[]>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  searchResources(query: string): Promise<Resource[]>;
}

export class DatabaseStorage implements IStorage {
  async getAllResources(): Promise<Resource[]> {
    return await db.select().from(resources);
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return await db
      .select()
      .from(resources)
      .where(eq(resources.category, category));
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const [resource] = await db
      .insert(resources)
      .values(insertResource)
      .returning();
    return resource;
  }

  async searchResources(query: string): Promise<Resource[]> {
    const lowerQuery = query.toLowerCase();
    const results = await db.select().from(resources);
    return results.filter(
      resource =>
        resource.title.toLowerCase().includes(lowerQuery) ||
        resource.description.toLowerCase().includes(lowerQuery) ||
        resource.category.toLowerCase().includes(lowerQuery)
    );
  }
}

export const storage = new DatabaseStorage();
```
