import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { categories } from "@shared/schema";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

interface CategoryNavProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryNav({
  selectedCategory,
  onSelectCategory,
}: CategoryNavProps) {
  return (
    <div className="bg-card rounded-lg border p-4">
      <h2 className="font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="h-4 w-4" />
        Categories
      </h2>
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="space-y-1.5">
          <Button
            variant={selectedCategory === null ? "default" : "ghost"}
            className={cn(
              "w-full justify-start font-normal",
              selectedCategory === null && "bg-primary/10 hover:bg-primary/20"
            )}
            onClick={() => onSelectCategory(null)}
          >
            All Resources
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className={cn(
                "w-full justify-start font-normal",
                selectedCategory === category && "bg-primary/10 hover:bg-primary/20"
              )}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}