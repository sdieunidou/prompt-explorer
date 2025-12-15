import { Category } from "@/types/prompt";
import { cn } from "@/lib/utils";
import { Code, Shield, Zap, FileCode, Database, Settings, Layers, Bug } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  shield: Shield,
  zap: Zap,
  file: FileCode,
  database: Database,
  settings: Settings,
  layers: Layers,
  bug: Bug,
};

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          selectedCategory === null
            ? "bg-primary text-primary-foreground glow"
            : "bg-secondary text-secondary-foreground hover:bg-muted"
        )}
      >
        Tous
      </button>
      {categories.map((category) => {
        const Icon = iconMap[category.icon] || Code;
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground glow"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            )}
          >
            <Icon className="h-4 w-4" />
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
