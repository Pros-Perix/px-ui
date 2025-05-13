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

## Publishing (optional)

If publishing to npm (private or public):

* Ensure `dist/` is built
* Use [`changesets`](https://github.com/changesets/changesets) for versioning
* Trigger GitHub Actions or manual `npm publish`

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
