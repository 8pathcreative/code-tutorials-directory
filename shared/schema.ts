import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // "tool", "ebook", "tutorial", etc.
  imageUrl: text("image_url").notNull(),
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  title: true,
  description: true,
  url: true,
  category: true,
  type: true,
  imageUrl: true,
});

export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;

export const categories = [
  "UI Design",
  "UX Design",
  "Frontend Development",
  "Design Systems",
  "CSS",
  "JavaScript",
  "React",
  "Typography",
  "Color Theory",
  "Accessibility"
] as const;

export const resourceTypes = [
  "Tool",
  "Ebook",
  "Tutorial",
  "Course",
  "Article",
  "Video",
  "Resource"
] as const;
