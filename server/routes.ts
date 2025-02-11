import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertResourceSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express): Server {
  app.get("/api/resources", async (_req, res) => {
    const resources = await storage.getAllResources();
    res.json(resources);
  });

  app.get("/api/resources/category/:category", async (req, res) => {
    const category = req.params.category;
    const resources = await storage.getResourcesByCategory(category);
    res.json(resources);
  });

  app.get("/api/resources/search", async (req, res) => {
    const query = z.string().parse(req.query.q);
    const resources = await storage.searchResources(query);
    res.json(resources);
  });

  app.post("/api/resources", async (req, res) => {
    const resource = insertResourceSchema.parse(req.body);
    const created = await storage.createResource(resource);
    res.status(201).json(created);
  });

  const httpServer = createServer(app);
  return httpServer;
}
