import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { categories } from "@shared/schema";
import { cn } from "@/lib/utils";

interface CategoryNavProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryNav({
  selectedCategory,
  onSelectCategory,
}: CategoryNavProps) {
  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="space-y-2">
        <Button
          variant={selectedCategory === null ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectCategory(null)}
        >
          All Resources
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            className={cn("w-full justify-start")}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
