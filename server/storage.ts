import { resources, type Resource, type InsertResource } from "@shared/schema";

export interface IStorage {
  getAllResources(): Promise<Resource[]>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  searchResources(query: string): Promise<Resource[]>;
}

export class MemStorage implements IStorage {
  private resources: Map<number, Resource>;
  private currentId: number;

  constructor() {
    this.resources = new Map();
    this.currentId = 1;
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockData: InsertResource[] = [
      {
        title: "Figma",
        description: "Professional vector graphics editor and prototyping tool",
        url: "https://figma.com",
        category: "UI Design",
        type: "Tool",
        imageUrl: "https://cdn.svgporn.com/logos/figma.svg"
      },
      {
        title: "Don't Make Me Think",
        description: "A common sense approach to web usability by Steve Krug",
        url: "https://sensible.com/dont-make-me-think/",
        category: "UX Design",
        type: "Ebook",
        imageUrl: "https://cdn.svgporn.com/logos/bookstack.svg"
      },
      {
        title: "MDN Web Docs",
        description: "Comprehensive web development documentation",
        url: "https://developer.mozilla.org",
        category: "Frontend Development",
        type: "Resource",
        imageUrl: "https://cdn.svgporn.com/logos/mdn.svg"
      }
    ];

    mockData.forEach(resource => this.createResource(resource));
  }

  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(
      resource => resource.category.toLowerCase() === category.toLowerCase()
    );
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.currentId++;
    const resource: Resource = { ...insertResource, id };
    this.resources.set(id, resource);
    return resource;
  }

  async searchResources(query: string): Promise<Resource[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.resources.values()).filter(
      resource =>
        resource.title.toLowerCase().includes(lowerQuery) ||
        resource.description.toLowerCase().includes(lowerQuery) ||
        resource.category.toLowerCase().includes(lowerQuery)
    );
  }
}

export const storage = new MemStorage();
