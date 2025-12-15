import { Code, Github, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Code className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                PHP/Symfony <span className="gradient-text">Prompts</span>
              </h1>
              <p className="text-xs text-muted-foreground">Référentiel de prompts pour la revue de code</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
              asChild
            >
              <a href="https://github.com/sdieunidou/ho-my-prompt" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
              asChild
            >
              <a href="https://github.com/sdieunidou/ho-my-prompt/blob/main/README.md" target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Docs</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
