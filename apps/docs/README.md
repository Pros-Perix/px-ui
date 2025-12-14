# @px-ui/docs

Documentation site for the px-ui component library, built with [Fumadocs](https://fumadocs.vercel.app/) and [TanStack Start](https://tanstack.com/start).

## Development

### Prerequisites

Make sure you have built the packages first:

```bash
# From the root of the monorepo
pnpm run build
```

### Run Development Server

```bash
# From the root of the monorepo
pnpm start @px-ui/docs dev

# Or from this directory
pnpm dev
```

The documentation site will be available at `http://localhost:3000`.

## Building

Build the documentation site:

```bash
# From the root of the monorepo
pnpm --filter @px-ui/docs build

# Or from this directory
pnpm build
```

## Preview Production Build

```bash
# From this directory
pnpm preview
```

## Deployment

Deploy to Cloudflare Pages:

```bash
# From this directory
pnpm deploy
```

This will build the site and deploy it using Wrangler.

## Tech Stack

- **TanStack Start** - Modern React framework
- **Fumadocs** - Documentation framework with MDX support
- **Vite** - Fast build tool
- **Tailwind CSS v4** - Styling
- **React Hook Form + Zod** - Form examples and validation
- **@px-ui/core** - Core UI components
- **@px-ui/forms** - Form components
- **Cloudflare Pages** - Deployment platform

## Project Structure

```
apps/docs/
├── app/           # Application code
├── content/       # MDX documentation content
├── public/        # Static assets
└── package.json
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm deploy` - Deploy to Cloudflare Pages
- `pnpm types:check` - Type check TypeScript files

## License

MIT
