# PHP/Symfony Prompts - Référentiel de Prompts

Une interface moderne pour parcourir et utiliser une collection de prompts destinés à la revue de code PHP/Symfony.

## 🚀 Fonctionnalités

- **Parcourir les prompts** : Interface intuitive avec recherche et filtrage par catégorie
- **Copie rapide** : Copiez n'importe quel prompt en un clic
- **Données centralisées** : Fetch automatique depuis un manifest JSON hébergé sur GitHub
- **Design moderne** : Interface sombre et épurée, optimisée pour les développeurs

## 📁 Structure du Manifest

L'interface récupère les données depuis un fichier `manifest.json` hébergé sur GitHub. Voici la structure attendue :

```json
{
  "version": "1.0.0",
  "lastUpdated": "2024-01-15",
  "categories": [
    {
      "id": "security",
      "name": "Sécurité",
      "icon": "shield",
      "description": "Prompts de vérification de sécurité"
    }
  ],
  "prompts": [
    {
      "id": "sql-injection",
      "title": "Vérification des injections SQL",
      "description": "Analysez le code pour détecter les vulnérabilités...",
      "category": "security",
      "tags": ["SQL", "Doctrine", "Injection"],
      "contentUrl": "https://raw.githubusercontent.com/your-username/php-prompts/main/prompts/sql-injection.md",
      "difficulty": "intermediate"
    }
  ]
}
```

### Champs du Manifest

#### Categories
| Champ | Type | Description |
|-------|------|-------------|
| `id` | string | Identifiant unique de la catégorie |
| `name` | string | Nom affiché de la catégorie |
| `icon` | string | Icône (code, shield, zap, file, database, settings, layers, bug) |
| `description` | string | Description de la catégorie |

#### Prompts
| Champ | Type | Description |
|-------|------|-------------|
| `id` | string | Identifiant unique du prompt |
| `title` | string | Titre du prompt |
| `description` | string | Description courte |
| `category` | string | ID de la catégorie parente |
| `tags` | string[] | Tags pour le filtrage |
| `contentUrl` | string | URL du fichier Markdown contenant le prompt complet |
| `difficulty` | string | Niveau de difficulté (beginner, intermediate, advanced) |

## 🔧 Configuration

### Modifier l'URL du Manifest

Pour pointer vers votre propre dépôt GitHub, modifiez la constante `MANIFEST_URL` dans `src/hooks/usePrompts.ts` :

```typescript
const MANIFEST_URL = "https://raw.githubusercontent.com/VOTRE-USERNAME/VOTRE-REPO/main/manifest.json";
```

### Structure du Dépôt de Prompts

```
your-repo/
├── manifest.json        # Fichier manifest principal
└── prompts/
    ├── sql-injection.md
    ├── xss-check.md
    └── ...
```

## 📝 Format des Fichiers Prompt

Chaque prompt est un fichier Markdown (.md) contenant le texte complet à copier :

```markdown
# Titre du Prompt

Analysez le code suivant pour [description de l'objectif]...

## Instructions
1. Première instruction
2. Deuxième instruction

## Exemple de code à analyser
[Le code PHP/Symfony à analyser]

## Points à vérifier
- Point 1
- Point 2
```

## 🛠️ Technologies

- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **Shadcn/ui** pour les composants
- **Lucide React** pour les icônes
- **Vite** pour le bundling

## 📦 Installation

```bash
# Cloner le projet
git clone https://github.com/your-username/php-prompts-ui

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour la production
npm run build
```

## 🎨 Personnalisation

### Thème

Les couleurs et styles sont définis dans `src/index.css` via les CSS custom properties. Modifiez les variables pour personnaliser le thème :

```css
:root {
  --primary: 175 80% 50%;        /* Couleur d'accent */
  --background: 222 47% 6%;      /* Fond principal */
  /* ... */
}
```

### Icônes de Catégorie

Les icônes disponibles sont définies dans `CategoryFilter.tsx` et `PromptCard.tsx` :
- `code`, `shield`, `zap`, `file`, `database`, `settings`, `layers`, `bug`

## 📄 License

MIT
