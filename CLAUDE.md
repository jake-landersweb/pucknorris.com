# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website for **Puck Norris**, a beer league hockey team in the Pacific Northwest. Built with Next.js 15 (App Router) and TypeScript. Hosted at pucknorris.com.

## Key Commands

### Development

- `npm run dev` - Start dev server with Turbopack
- `npm run build` - Production build (also runs `next-sitemap` via postbuild)
- `npm run start` - Run production server
- `npm run lint` - ESLint with Next.js rules

No test framework is configured.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3 with custom theme
- **Data fetching:** TanStack React Query 5 (with LocalStorage persistence)
- **Backend integrations:** PocketBase, Shopify Storefront API, AWS API Gateway

## Project Structure

```
/app/                  # App Router pages (main site)
  layout.tsx           # Root layout + providers
  page.tsx / client.tsx  # Pattern: server component + client component
  /about/
  /schedule/
  /gallery/
  /merch/
/pages/                # Legacy Pages Router
  /api/chat.ts         # ChuckBot API proxy (AWS Lambda)
  /chat/index.tsx      # Chat page
/components/           # Reusable UI components
/lib/
  /apiRoutes/          # External API integration modules
  /data/               # TypeScript type definitions
  /functions/          # Event data utility functions
/utils/                # General utilities
/public/               # Static assets, fonts, images, SVGs
/styles/globals.css    # Tailwind directives + custom fonts
```

## Architecture Patterns

### Routing
- App Router (`/app`) for all main pages
- Pages Router (`/pages`) retained only for API routes and the `/chat` page
- Avoid mixing them further

### Server/Client Component Split
Each page follows this pattern:
- `page.tsx` — server component, prefetches data via React Query, passes via `HydrationBoundary`
- `client.tsx` — client component (`"use client"`), handles interactivity

### Data Fetching
- React Query handles all server state
- 5-minute stale time; cache persisted to LocalStorage
- `/merch` and `/gallery` routes have cache-control headers set to `no-store` in `next.config.js`

### Styling
- Tailwind utility classes throughout
- Custom color tokens: `bg-*` (dark grays), `txt-*` (text), `main` (gold `#f9bf3c`)
- Custom font: Gainsborough Sans (loaded from `/public/fonts/`)
- Dark theme site

## External Integrations

| Service | Purpose | Key file |
|---|---|---|
| AWS API Gateway | Game schedule data | `lib/apiRoutes/getSchedule.ts` |
| PocketBase | Gallery image storage | `lib/apiRoutes/getGallery.ts` |
| Shopify Storefront API | Merchandise catalog | `lib/apiRoutes/shopifyClient.ts` |
| AWS Lambda (ChuckBot) | Chat bot | `pages/api/chat.ts` |

## Environment Variables

Stored in `.env.local` (not committed). Required vars:

```
HOST                              # AWS API Gateway base URL
TEAMID                            # Team ID for schedule API
NEXT_PUBLIC_TEAMID                # Same, exposed to client
SHOPIFY_STORE_FRONT_ACCESS_TOKEN
SHOPIFY_STORE_DOMAIN
CHAT_HOST                         # ChuckBot Lambda URL
CHAT_API_KEY
```

## Key Configuration

- `next.config.js` — `output: 'standalone'` (Docker-ready), strict cache headers on merch/gallery
- `tailwind.config.js` — custom color palette and Gainsborough Sans font
- `tsconfig.json` — strict mode, `moduleResolution: node`, `target: es5`
- Google Analytics GA4 is integrated in the root layout
  