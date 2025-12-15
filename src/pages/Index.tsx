import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PromptCard } from "@/components/PromptCard";
import { PromptViewer } from "@/components/PromptViewer";
import { usePrompts } from "@/hooks/usePrompts";
import { PromptItem } from "@/types/prompt";
import { Loader2, FileSearch } from "lucide-react";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    prompts,
    categories,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    getCategoryById,
    getPromptById,
  } = usePrompts();

  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Open prompt from URL parameter
  useEffect(() => {
    const promptId = searchParams.get("prompt");
    if (promptId && !isLoading) {
      const prompt = getPromptById(promptId);
      if (prompt) {
        setSelectedPrompt(prompt);
        setIsViewerOpen(true);
      }
    }
  }, [searchParams, isLoading, getPromptById]);

  const handlePromptClick = (prompt: PromptItem) => {
    setSelectedPrompt(prompt);
    setIsViewerOpen(true);
    setSearchParams({ prompt: prompt.id });
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background glow effect */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ background: "var(--gradient-glow)" }}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vérifiez votre code <span className="gradient-text">PHP/Symfony</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Une collection de prompts prêts à l'emploi pour analyser et améliorer votre code. 
            Copiez, collez, et obtenez des retours instantanés.
          </p>
          
          <div className="flex justify-center mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Rechercher un prompt (ex: SQL, sécurité, performance...)"
            />
          </div>
          
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </section>

        {/* Prompts Grid */}
        <section>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Chargement des prompts...</p>
            </div>
          ) : prompts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <FileSearch className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg text-foreground mb-2">Aucun prompt trouvé</p>
              <p className="text-muted-foreground">
                Essayez de modifier vos filtres ou votre recherche.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {prompts.length} prompt{prompts.length > 1 ? "s" : ""} trouvé{prompts.length > 1 ? "s" : ""}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prompts.map((prompt, index) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    category={getCategoryById(prompt.category)}
                    onClick={() => handlePromptClick(prompt)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        {/* Stats Section */}
        <section className="mt-16 py-8 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-2xl font-bold gradient-text">{prompts.length}</p>
              <p className="text-sm text-muted-foreground">Prompts</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">{categories.length}</p>
              <p className="text-sm text-muted-foreground">Catégories</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">100%</p>
              <p className="text-sm text-muted-foreground">Open Source</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">∞</p>
              <p className="text-sm text-muted-foreground">Copies gratuites</p>
            </div>
          </div>
        </section>
      </main>

      <PromptViewer
        prompt={selectedPrompt}
        category={selectedPrompt ? getCategoryById(selectedPrompt.category) : undefined}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
      />
    </div>
  );
};

export default Index;
