```typescript
// client/src/App.tsx
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import Home from "@/pages/home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

// client/src/pages/home.tsx
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
      <header className="bg-gradient-to-b from-background to-background/95 border-b border-border/40">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4">Code Tutorials</h1>
          <p className="text-muted-foreground text-xl max-w-2xl">
            Discover curated resources, tools, and tutorials to level up your skills.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <CategoryNav
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </aside>

          <div className="flex-1 space-y-8">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
```
