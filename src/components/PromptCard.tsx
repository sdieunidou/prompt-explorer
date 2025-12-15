import { PromptItem, Category } from "@/types/prompt";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Code, Shield, Zap, FileCode, Database, Settings, Layers, Bug, ChevronRight } from "lucide-react";

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

const difficultyColors = {
  beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  advanced: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

const difficultyLabels = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

interface PromptCardProps {
  prompt: PromptItem;
  category?: Category;
  onClick: () => void;
  style?: React.CSSProperties;
}

export function PromptCard({ prompt, category, onClick, style }: PromptCardProps) {
  const Icon = category ? iconMap[category.icon] || Code : Code;

  return (
    <button
      onClick={onClick}
      style={style}
      className={cn(
        "w-full text-left p-5 rounded-xl bg-card border border-border",
        "hover:border-primary/50 hover:bg-card/80 transition-all duration-300",
        "group card-shadow opacity-0 animate-fade-in"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-md bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </div>
            {category && (
              <span className="text-xs text-muted-foreground">{category.name}</span>
            )}
          </div>
          
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {prompt.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {prompt.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {prompt.difficulty && (
              <Badge variant="outline" className={cn("text-xs", difficultyColors[prompt.difficulty])}>
                {difficultyLabels[prompt.difficulty]}
              </Badge>
            )}
            {prompt.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
      </div>
    </button>
  );
}
