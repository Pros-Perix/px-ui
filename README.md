# px-ui – Monorepo Component Library

Welcome to **px-ui**, a scalable, modular, and blazing-fast component library built with:

* **React + TypeScript**
* **Tailwind CSS v4** (centralized in `@px-ui/core`)
* **Storybook** (per-package or global)
* **Vitest + Testing Library**
* **Vite** for builds
* **PlopJS** for scaffolding new components

---

## Getting Started

```bash
pnpm install
```

---

## Development Workflow

### Start Storybook (Global for All Packages)

```bash
pnpm run dev
```

This will:

* Watch Tailwind styles in `@px-ui/core`
* Launch Storybook with all components

Or run storybook for a specific package:

```bash
pnpm --filter @px-ui/button dev
```
---

### Run Storybook Only (No Style Watch)

```bash
pnpm run storybook
```

---

### Watch Tailwind Styles Only

```bash
pnpm run watch-core-styles
```

Watches `@px-ui/core/src/index.css` and regenerates `dist/core.css` on changes.
Used in all Storybook previews.

---

## Run Tests

```bash
pnpm run test
```

Or run tests for a specific package:

```bash
pnpm --filter @px-ui/button test
```

---

## Create a New Component Package

```bash
pnpm run gen:component
```

This runs **PlopJS** and scaffolds:

* `packages/<your-component>`
* With boilerplate: `.storybook`, `src/`, tests, stories, vite, etc.

---

## Linting

```bash
pnpm run lint
```

---

## Building Packages

Build all packages:

```bash
pnpm run build
```

Or build a specific one:

```bash
pnpm --filter @px-ui/button build
```

---

## Publishing

This project uses [`changesets`](https://github.com/changesets/changesets) for version management and automated npm publishing via GitHub Actions.

### Creating a New Release

1. Make your changes to components (e.g., `packages/core/src/Button.tsx`)
2. Create a changeset:
   ```bash
   pnpm changeset
   ```
   - Select which packages changed (@px-ui/core, @px-ui/forms)
   - Choose version bump type (patch/minor/major)
   - Write a description of the changes (used in CHANGELOG)
3. Commit both your code changes AND the changeset file:
   ```bash
   git add .
   git commit -m "feat: add new Button variant"
   git push origin master
   ```

### Automated Publishing Workflow

When you push to `master`:

1. GitHub Actions detects changeset files
2. It creates/updates a "Version Packages" PR that:
   - Bumps package versions in package.json
   - Updates CHANGELOG.md files
   - Handles dependency updates (e.g., if @px-ui/core updates, @px-ui/forms dependency updates too)
3. Review the PR to see what will be released
4. Merge the PR → Packages automatically publish to npm

### Setup Requirements

To enable automated publishing, configure the following GitHub secret:

* `NPM_TOKEN` - Your npm authentication token
  * Generate at [npmjs.com/settings/tokens](https://www.npmjs.com/settings/YOUR_USERNAME/tokens)
  * Must have "Automation" or "Publish" permission
  * Add to: Settings → Secrets and variables → Actions → New repository secret

### Manual Publishing (if needed)

```bash
# 1. Version packages (reads changesets, bumps versions, updates CHANGELOGs)
pnpm run version

# 2. Build all packages
pnpm run build

# 3. Publish to npm
pnpm run release
```

### Commands Reference

- `pnpm changeset` - Create a new changeset
- `pnpm run version` - Apply changesets (bump versions)
- `pnpm run release` - Publish packages to npm
- `pnpm run build` - Build all packages

---

## Folder Structure

```
px-ui/
├── packages/
│   ├── core/         # Tailwind v4, design tokens, central CSS
│   └── button/       # Sample component package
│       ├── .storybook/
│       ├── src/
│       └── ...
├── generators/       # PlopJS template logic
├── tsconfig.base.json
├── pnpm-workspace.yaml
└── README.md
```

---

## Tips for Contributors

* Always **extend root Storybook configs** in per-package `main.ts`/`preview.ts`
* Use static Tailwind class strings for purge friendliness
* Keep `@px-ui/core` as the only source of design system and Tailwind config
* Keep component logic dumb (UI only), delegate smart behavior to consumers

---
