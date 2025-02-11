import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Resource } from "@shared/schema";
import CategoryNav from "@/components/category-nav";
import SearchBar from "@/components/search-bar";
import ResourceCard from "@/components/resource-card";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: [
      selectedCategory
        ? `/api/resources/category/${selectedCategory}`
        : searchQuery
        ? `/api/resources/search?q=${searchQuery}`
        : "/api/resources",
    ],
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-b from-background to-background/95 border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-in slide-in-from-left">
            Code Tutorials
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl animate-in slide-in-from-left duration-500">
            Discover curated resources, tools, and tutorials to level up your design and development skills.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-4">
              <CategoryNav
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          </aside>

          <div className="flex-1 space-y-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
            />

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-48 rounded-lg bg-muted animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}

            {!isLoading && resources.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No resources found. Try adjusting your search or category filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}