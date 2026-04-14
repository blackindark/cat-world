# Cloudflare deployment for the single-project Next.js language learning app

This repository is now a single Next.js full-stack app for a mobile-first language learning product.

Current product focus:
- English learning path
- Japanese learning path
- Mobile-first landing page
- Course path pages under `app/learn/[track]`
- Lesson pages under `app/lesson/[track]/[lesson]`
- Cloudflare deployment via OpenNext for Cloudflare

## Local verification

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Default local URL on this machine:

```text
http://localhost:3100
```

## Standard production build

```bash
npm run build
```

## Build Cloudflare output

```bash
npm run cf:build
```

This generates the Worker bundle under:

```text
.open-next/worker.js
```

## Deploy to Cloudflare

First authenticate Wrangler:

```bash
npx wrangler login
```

Then deploy:

```bash
npm run cf:deploy
```

## Important files

- `wrangler.toml`
- `open-next.config.ts`
- `next.config.ts`
- `app/page.tsx`
- `app/learn/[track]/page.tsx`
- `app/lesson/[track]/[lesson]/page.tsx`
- `lib/language/data.ts`

## App routes after deployment

- `/`
- `/learn/english`
- `/learn/japanese`
- `/lesson/english/ordering-food`
- `/lesson/japanese/restaurant-basics`
- `/api/health`

## Notes

- This repo still contains some older API/domain files from previous ERP/ecommerce iterations, but the primary product surface is now the language-learning experience.
- The Cloudflare worker name can remain stable even if the public-facing product title changes.
- If you later add persistence, you can store users, streaks, XP, lesson completion, and review queues in D1.
