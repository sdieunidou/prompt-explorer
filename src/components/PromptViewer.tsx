import { useEffect, useState } from "react";
import { PromptItem, Category } from "@/types/prompt";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

interface PromptViewerProps {
  prompt: PromptItem | null;
  category?: Category;
  isOpen: boolean;
  onClose: () => void;
}

export function PromptViewer({ prompt, category, isOpen, onClose }: PromptViewerProps) {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prompt && isOpen) {
      setIsLoading(true);
      fetch(prompt.contentUrl)
        .then((res) => res.text())
        .then((text) => {
          setContent(text);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch prompt content:", err);
          setContent("Erreur lors du chargement du contenu.");
          setIsLoading(false);
        });
    }
  }, [prompt, isOpen]);

  const handleCopy = async () => {
    if (!content) return;
    
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success("Prompt copié dans le presse-papiers !");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Erreur lors de la copie");
    }
  };

  if (!prompt) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] bg-card border-border p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold text-foreground mb-2">
                {prompt.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mb-3">
                {prompt.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category && (
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                    {category.name}
                  </Badge>
                )}
                {prompt.difficulty && (
                  <Badge variant="outline" className={cn("text-xs", difficultyColors[prompt.difficulty])}>
                    {difficultyLabels[prompt.difficulty]}
                  </Badge>
                )}
                {prompt.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex items-center justify-between px-6 py-3 bg-secondary/50 border-b border-border">
          <span className="text-sm text-muted-foreground font-mono">prompt.md</span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => window.open(prompt.contentUrl, '_blank')}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Source
            </Button>
            <Button
              variant="default"
              size="sm"
              className="h-8 gap-2"
              onClick={handleCopy}
              disabled={isLoading}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copié
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copier
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <pre className="text-sm text-foreground whitespace-pre-wrap font-mono bg-secondary/30 p-4 rounded-lg overflow-x-auto">
              {content}
            </pre>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
