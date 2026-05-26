# next-ssr-app

Next.js 16 App Router app used as the **SSR** side of a rendering-strategy benchmark (compared to a client-rendered SPA). Primary routes load product data from **PostgreSQL** on the server.

## Stack

- **Next.js** 16.2.x (App Router, Turbopack in dev via `next dev`, **`cacheComponents: true`** in [`next.config.ts`](next.config.ts))
- **React** 19.2 + **React DOM** 19.2
- **TypeScript** ~5.8 (strict)
- **Tailwind CSS** 3.4
- **Zod** 4.x — environment rules and **product row** validation at the DB boundary
- **Prisma ORM** (`@prisma/client` + `prisma`) with **`@prisma/adapter-pg`** + `pg` for runtime DB access

`reactCompiler` is **not** enabled in `next.config.ts`;

## Scripts

- `npm run dev` — development server (Turbopack)
- `npm run build` — production build
- `npm run start` — production server
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — ESLint flat config (`eslint.config.mjs`): TypeScript recommended + `@next/eslint-plugin-next` (**recommended** + **core-web-vitals** rules)
- `npm run format` / `npm run format:check` — Prettier
- `npm run prisma:generate` — generate Prisma Client from `prisma/schema.prisma`
- `npm run prisma:migrate` — create/apply local Prisma migration in development
- `npm run db:push` — `prisma db push` (sync schema without generating migration files)
- `npm run db:studio` — Prisma Studio

## Environment

Set **`DATABASE_URL`** to a full PostgreSQL connection string (e.g. `postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require`). Prisma CLI reads the same variable via [`prisma.config.ts`](prisma.config.ts) (with `dotenv` loading `.env`).

Validation lives in [`src/schemas/env.schema.ts`](src/schemas/env.schema.ts). The URL is resolved when the DB is first used ([`src/config/env.ts`](src/config/env.ts)).

Copy [`.env.example`](.env.example) to `.env` or `.env.local` and fill in values. **Do not commit secrets.**

There is **no** `API_URL` for product data; the app does not fetch the catalog over HTTP for SSR.

### Database setup

If you already use **Prisma** on the backend against this database, point this app at the same `DATABASE_URL`. This repo's local Prisma model in [`prisma/schema.prisma`](prisma/schema.prisma) mirrors the `products` table (`UUID id`, `Decimal(10,2) price`, `String[] images`, `Json attributes`, `created_at` / `updated_at` mapping).

1. Ensure the `products` table exists via your existing Prisma migrations.
2. Seed or sync data so rows match the Zod shape in [`src/schemas/product.schema.ts`](src/schemas/product.schema.ts).

Use `npm run prisma:generate` after schema changes, then `npm run prisma:migrate` (or `npm run db:push`) only if this repo owns schema changes.

### Troubleshooting: `getaddrinfo ENOTFOUND postgres`

That hostname is the **Docker Compose** service name. It only resolves for containers on the same network. If you run **`next dev` on your PC** (outside Docker), point the app at the database using **`localhost`** (or `127.0.0.1`) and the **host-mapped port** (often `5432`), e.g. `postgresql://USER:PASSWORD@localhost:5432/DBNAME`. Keep `postgres` as the host only when this Next.js process also runs **inside** Compose next to the DB service.

### Troubleshooting: `unrecognized configuration parameter "schema"`

Prisma `DATABASE_URL` values often include `?schema=public` (common when sharing URLs with backend services). Runtime DB access in this app strips `schema` before creating the `pg` adapter connection, so Postgres startup does not reject unknown parameters.

## Routes

| Route                  | Rendering                          | Description                                                                                                          |
| ---------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `/`                    | PPR-style shell + streamed content | Hero, home search (client), featured grid in `Suspense`                                                              |
| `/search`              | Same pattern                       | Server `getSearchPageData` + client `SearchFiltersShell` (URL-synced filters via `useTransition` + `router.replace`) |
| `/product/[id]`        | Same pattern                       | Detail and similar products in separate `Suspense` boundaries; 404 via `notFound()`                                  |
| `/api/products`        | Route Handler                      | JSON: featured list (via `productService` → Postgres)                                                                |
| `/api/products/search` | Route Handler                      | JSON: `getSearchPageData` payload                                                                                    |
| `/api/products/[id]`   | Route Handler                      | JSON: `getProductDetailPageData` payload                                                                             |

Pages that touch the database call **`connection()`** from `next/server` so `next build` can complete **without** a live Postgres (data still requires a configured DB at **runtime**).

Unknown paths are redirected to `/` by [`src/proxy.ts`](src/proxy.ts) (Next.js **Proxy**; see [Proxy file convention](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)).

## Folder structure (high level)

```
next-app/
  prisma/
    schema.prisma             # Prisma data model for Product (migrations/ not committed in this repo)
  src/
    app/
      api/products/           # Route handlers (JSON BFF)
      product/[id]/
      search/
      layout.tsx
      page.tsx
      loading.tsx
      error.tsx
      not-found.tsx
      globals.css
    components/
      layout/                 # Navbar (server), NavActiveLink (client), HeroSection, RouteErrorView (client)
      product/                # ProductCard (next/image), ProductDetailView, FeaturedProductsSection,
                              # ProductDetailMain, SimilarProductsSection, skeletons,
                              # HomeSearchBar / ProductSearchInput / SearchFiltersShell /
                              # SearchFiltersPanel / SearchResultsGrid
      ui/
    config/env.ts
    constants/                # search-filters.ts (category/brand option lists)
    db/                       # prisma.ts, products.repository.ts
    features/
      home/data.ts            # server: getHomePageData ("use cache")
      product-detail/         # data.ts (orchestrates detail payload),
                              # cached.ts (Next.js "use cache" per id and similar-by-category)
      search/                 # data.ts (getSearchPageData), query/search-query-params.ts
    lib/                      # errors.ts (ProductNotFoundError), strings.ts (splitCommaSeparated)
    schemas/                  # env.schema.ts, product.schema.ts
    services/                 # product.service.ts, product.mapper.ts, price.formatter.ts
    types/                    # product.types.ts (ApiProduct, ProductSummary, ProductDetail)
    proxy.ts
  prisma.config.ts
  next.config.ts
  package.json
```

## Architecture notes

- **Default:** React Server Components. Explicit client components are `NavActiveLink`, `RouteErrorView`, `HomeSearchBar`, `ProductSearchInput`, `SearchFiltersShell`, and `SearchFiltersPanel` (each marked with `"use client"`).
- **Data:** [`src/db/products.repository.ts`](src/db/products.repository.ts) runs Prisma queries through [`src/db/prisma.ts`](src/db/prisma.ts). [`src/services/product.service.ts`](src/services/product.service.ts) is the thin domain/service layer used by feature **`data.ts`** modules. Route handlers under `/api/products` delegate to those feature modules (`getSearchPageData`, `getProductDetailPageData`); only `/api/products` (featured list) calls `productService.listFeatured` directly. **There is no `api.service.ts`** HTTP client for products.
- **Caching:** Server data reads use **`"use cache"`** with **`cacheLife`** / **`cacheTag`** in [`src/features/home/data.ts`](src/features/home/data.ts), [`src/features/search/data.ts`](src/features/search/data.ts) (inside `getCachedSearchResults`), and [`src/features/product-detail/cached.ts`](src/features/product-detail/cached.ts) (per id and per `similar:<category>`). [`src/features/product-detail/data.ts`](src/features/product-detail/data.ts) is a pure orchestrator on top of the cached helpers. `export const dynamic` / `revalidate` segment configs are not used where they conflict with `cacheComponents` (see Next.js 16 docs).
- **Images:** [`next/image`](https://nextjs.org/docs/app/getting-started/images) with `remotePatterns` for `images.unsplash.com` and `plus.unsplash.com` in [`next.config.ts`](next.config.ts). Add more hosts if your product image URLs differ.
- **Loading / errors:** Segment [`loading.tsx`](src/app/loading.tsx) files and error boundaries [`src/app/error.tsx`](src/app/error.tsx), [`src/app/search/error.tsx`](src/app/search/error.tsx), [`src/app/product/[id]/error.tsx`](src/app/product/[id]/error.tsx) all render the shared client [`RouteErrorView`](src/components/layout/RouteErrorView.tsx) (with `error` + `reset`). Product missing: `notFound()` + [`src/app/product/[id]/not-found.tsx`](src/app/product/[id]/not-found.tsx).

## Design parity with the SPA benchmark

Styling uses Tailwind with [`tailwind.config.ts`](tailwind.config.ts) and [`src/app/globals.css`](src/app/globals.css). The goal is **visual and UX alignment** with the companion CSR app where the benchmark requires it; this repo does not guarantee byte-for-byte class parity in every file.
