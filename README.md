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

Guides live in `content/en/`. Keep existing URLs (`/en/starter-server`, etc.). Homepage is `content/index.md`.

## Deploy

```bash
pnpm deploy
```
