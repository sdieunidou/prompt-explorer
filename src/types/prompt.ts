export interface PromptManifest {
  version: string;
  lastUpdated: string;
  categories: Category[];
  prompts: PromptItem[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface PromptItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  contentUrl: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}
