# Syscraft wiki (Nuxt)

Nuxt 4 rebuild of [syscraft.dev](https://syscraft.dev) — Minecraft server-admin guides for the [Syscraft Discord](https://discord.gg/Dx6SSkx).

Production is still the Astro site in [syscraft-mc/syscraft.dev](https://github.com/syscraft-mc/syscraft.dev) until DNS cutover. This repo is the preview.

## Stack

- Nuxt 4 + Nuxt UI + Nuxt Content
- Search: Nuxt Content `UContentSearch` (⌘K) — no Algolia
- Deploy: Cloudflare Pages

## Setup

```bash
pnpm install
pnpm dev
```

## Content

Guides live in `content/` (`1.starter-server.md` → `/starter-server`, etc.). Homepage is `content/index.md`. Old `/en/...` URLs 301 to the same slug without `en`.

## Site URL

Canonicals, JSON-LD, and OG image URLs use one build-time value:

| Env | Default | Purpose |
| --- | --- | --- |
| `NUXT_PUBLIC_SITE_URL` | `https://syscraft.dev` | Also accepted as `NUXT_SITE_URL`. Cloudflare Pages falls back to `CF_PAGES_URL` when unset. Preview: `https://syscraft.tailz.dev`. |

Set it on the Pages project before building. Local: copy `.env.example` to `.env`.

## Deploy

```bash
pnpm deploy
```
