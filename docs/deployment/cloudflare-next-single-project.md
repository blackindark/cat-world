# Cloudflare deployment for the single-project Next.js ERP

This repository has been refactored into one Next.js full-stack app.

Stack:
- Next.js App Router
- Route Handlers under `app/api/*`
- Shared in-memory ERP domain layer under `lib/supply-chain/*`
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
- `app/api/*`

## API endpoints after deployment

- `/api/health`
- `/api/supply-chain/overview`
- `/api/supply-chain/suppliers`
- `/api/supply-chain/warehouses`
- `/api/supply-chain/inventory`
- `/api/supply-chain/purchase-orders`
- `/api/supply-chain/receipts`

## Notes

- This is now one deployable Next.js project, not a separate frontend and NestJS backend.
- Current data is still in-memory. Later you can replace it with Cloudflare D1, KV, R2, or external databases.
