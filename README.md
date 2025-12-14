# px-ui – Modern React Component Library

Welcome to **px-ui**, a scalable, modular component library built with:

- **React 19 + TypeScript**
- **Tailwind CSS v4**
- **tsdown** for fast builds
- **Changesets** for version management

---

## Packages

### [@px-ui/core](./packages/core)

Core UI components including Button, Input, Select, Dialog, Calendar, and more. Built with Tailwind CSS v4 and TypeScript.

### [@px-ui/forms](./packages/forms)

Form management components built on React Hook Form with Zod validation support.

### [@px-ui/docs](./apps/docs)

Documentation site built with Fumadocs and TanStack Start.

---

## Getting Started

```bash
pnpm install
```

---

## Development Workflow

### Start Documentation Site

```bash
pnpm start docs dev
```

This starts the documentation site where you can preview all components.

### Watch a Package in Development Mode

```bash
pnpm start core dev
```

This watches the package and rebuilds on changes.

## Linting

```bash
pnpm run lint
```

## Building Packages

Build all packages:

```bash
pnpm run build
```

Or build a specific package:

```bash
pnpm --filter @px-ui/core build
```

---

## Publishing

This project uses [`changesets`](https://github.com/changesets/changesets) for version management and automated npm publishing via GitHub Actions.

### Creating a New Release

1. Make your changes to components
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

- `NPM_TOKEN` - Your npm authentication token
  - Generate at [npmjs.com/settings/tokens](https://www.npmjs.com/settings/YOUR_USERNAME/tokens)
  - Must have "Automation" or "Publish" permission
  - Add to: Settings → Secrets and variables → Actions → New repository secret

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
- `pnpm start <package> <script>` - Run a script in a specific package

---

## Folder Structure

```
px-ui/
├── packages/
│   ├── core/         # Core UI components with Tailwind CSS v4
│   └── forms/        # Form components with React Hook Form
├── apps/
│   └── docs/         # Documentation site (Fumadocs + TanStack Start)
├── .changeset/       # Changesets for version management
├── .github/          # GitHub Actions workflows
├── pnpm-workspace.yaml
└── README.md
```

---

## Tips for Contributors

- Use our defined style classes instead of tailwind classes
- Keep `@px-ui/core` as the single source of truth for design tokens
- All components are built with accessibility in mind using Base UI
- Run the lint before committing: `pnpm run lint`

---
