import { useState, useEffect, useMemo } from "react";
import { PromptManifest, PromptItem, Category } from "@/types/prompt";

// Demo manifest URL - replace with your actual GitHub raw URL
const MANIFEST_URL = "https://raw.githubusercontent.com/your-username/php-prompts/main/manifest.json";

// Demo data for development
const demoManifest: PromptManifest = {
  version: "1.0.0",
  lastUpdated: "2024-01-15",
  categories: [
    { id: "security", name: "Sécurité", icon: "shield", description: "Prompts de vérification de sécurité" },
    { id: "performance", name: "Performance", icon: "zap", description: "Optimisation des performances" },
    { id: "architecture", name: "Architecture", icon: "layers", description: "Patterns et architecture" },
    { id: "debugging", name: "Debugging", icon: "bug", description: "Débogage et résolution de problèmes" },
    { id: "database", name: "Base de données", icon: "database", description: "Doctrine et requêtes SQL" },
  ],
  prompts: [
    {
      id: "sql-injection",
      title: "Vérification des injections SQL",
      description: "Analysez le code pour détecter les vulnérabilités d'injection SQL potentielles dans les requêtes Doctrine.",
      category: "security",
      tags: ["SQL", "Doctrine", "Injection"],
      contentUrl: "https://raw.githubusercontent.com/your-username/php-prompts/main/prompts/sql-injection.md",
      difficulty: "intermediate",
    },
    {
      id: "xss-check",
      title: "Détection des failles XSS",
      description: "Identifiez les vulnérabilités Cross-Site Scripting dans les templates Twig et les sorties utilisateur.",
      category: "security",
      tags: ["XSS", "Twig", "Sécurité"],
      contentUrl: "https://raw.githubusercontent.com/your-username/php-prompts/main/prompts/xss-check.md",
      difficulty: "beginner",
    },
    {
      id: "n-plus-one",
      title: "Détection du problème N+1",
      description: "Trouvez les requêtes N+1 dans vos relations Doctrine et optimisez vos chargements.",
      category: "performance",
      tags: ["Doctrine", "Performance", "ORM"],
      contentUrl: "https://raw.githubusercontent.com/your-username/php-prompts/main/prompts/n-plus-one.md",
      difficulty: "intermediate",
    },
    {
      id: "cache-strategy",
      title: "Stratégie de cache Symfony",
      description: "Évaluez et améliorez votre stratégie de mise en cache avec les composants Symfony.",
      category: "performance",
      tags: ["Cache", "Symfony", "Redis"],
      contentUrl: "https://raw.githubusercontent.com/your-username/php-prompts/main/prompts/cache-strategy.md",
      difficulty: "advanced",
    },
    {
      id: "solid-principles",
      title: "Vérification des principes SOLID",
      description: "Analysez votre code pour vérifier le respect des principes SOLID et identifiez les améliorations.",
      category: "architecture",
      tags: ["SOLID", "Clean Code", "Design Patterns"],
      contentUrl: "https://raw.githubusercontent.com/your-username/php-prompts/main/prompts/solid-principles.md",
      difficulty: "intermediate",
    },
    {
      id: "service-layer",
      title: "Architecture en couches de services",
      description: "Évaluez la séparation des responsabilités dans vos services Symfony.",
      category: "architecture",
      tags: ["Services", "Architecture", "DI"],
      contentUrl: "https://raw.githubusercontent.com/your-username/php-prompts/main/prompts/service-layer.md",
      difficulty: "advanced",
    },
    {
      id: "exception-handling",
      title: "Gestion des exceptions",
      description: "Vérifiez la bonne gestion des exceptions et erreurs dans votre application Symfony.",
      category: "debugging",
      tags: ["Exceptions", "Logging", "Debug"],
      contentUrl: "https://raw.githubusercontent.com/your-username/php-prompts/main/prompts/exception-handling.md",
      difficulty: "beginner",
    },
    {
      id: "doctrine-migrations",
      title: "Audit des migrations Doctrine",
      description: "Analysez vos migrations pour détecter les problèmes potentiels et les bonnes pratiques.",
      category: "database",
      tags: ["Doctrine", "Migrations", "Schema"],
      contentUrl: "https://raw.githubusercontent.com/your-username/php-prompts/main/prompts/doctrine-migrations.md",
      difficulty: "intermediate",
    },
  ],
};

export function usePrompts(manifestUrl?: string) {
  const [manifest, setManifest] = useState<PromptManifest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchManifest = async () => {
      try {
        setIsLoading(true);
        
        // Try to fetch from the provided URL, fallback to demo data
        if (manifestUrl) {
          const response = await fetch(manifestUrl);
          if (response.ok) {
            const data = await response.json();
            setManifest(data);
          } else {
            throw new Error("Failed to fetch manifest");
          }
        } else {
          // Use demo data
          setManifest(demoManifest);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching manifest:", err);
        // Fallback to demo data on error
        setManifest(demoManifest);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchManifest();
  }, [manifestUrl]);

  const filteredPrompts = useMemo(() => {
    if (!manifest) return [];

    return manifest.prompts.filter((prompt) => {
      const matchesSearch =
        searchQuery === "" ||
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === null || prompt.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [manifest, searchQuery, selectedCategory]);

  const getCategoryById = (id: string): Category | undefined => {
    return manifest?.categories.find((c) => c.id === id);
  };

  return {
    manifest,
    prompts: filteredPrompts,
    categories: manifest?.categories || [],
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    getCategoryById,
  };
}
