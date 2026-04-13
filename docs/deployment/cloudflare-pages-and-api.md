# Cloudflare Pages + Separate API Deployment

This repo is now split into:

- `apps/web`: React + Vite frontend
- `apps/api`: NestJS API

Recommended deployment model:

- Deploy `apps/web` to Cloudflare Pages
- Deploy `apps/api` to a Node host such as Railway, Render, Fly.io, or a VPS

Trying to run the current NestJS app directly inside Cloudflare Pages is the wrong fit.

## 1. Deploy the frontend to Cloudflare Pages

In Cloudflare Pages, connect the GitHub repo and use these settings:

- Framework preset: `None` or `Vite`
- Build command: `npm install && npm run build -w apps/web`
- Build output directory: `apps/web/dist`
- Root directory: leave as repository root

### Frontend environment variable

Set this in Cloudflare Pages:

- `VITE_API_BASE_URL=https://your-api-domain.com`

Examples:

- `https://northstar-api.onrender.com`
- `https://erp-api.example.com`

Do not include a trailing slash.

## 2. Deploy the API to a Node host

The API is a standard NestJS app.

### Required runtime settings

Environment variables:

- `PORT=3300` (or let the platform inject its own port)
- `NODE_ENV=production`
- `CORS_ORIGINS=https://your-pages-domain.pages.dev,https://your-custom-domain.com`

### Build / start commands

Install:

```bash
npm install
```

Build:

```bash
npm run build -w apps/api
```

Start:

```bash
npm run start -w apps/api
```

## 3. Production flow

Browser request path in production:

1. User opens Cloudflare Pages frontend
2. Frontend reads `VITE_API_BASE_URL`
3. Frontend calls `${VITE_API_BASE_URL}/api/...`
4. NestJS API returns JSON

## 4. Local development flow

Local development still works with the Vite proxy:

- frontend: `http://localhost:5173`
- api: `http://localhost:3300`

Commands:

```bash
npm install
npm run dev:api
npm run dev:web
```

If `VITE_API_BASE_URL` is empty, the frontend uses relative `/api/...` requests and the Vite proxy forwards them to port `3300`.

## 5. Suggested first deployment sequence

1. Push repo to GitHub
2. Deploy `apps/api` to Render or Railway
3. Copy the public API URL
4. Create Cloudflare Pages project for `apps/web`
5. Set `VITE_API_BASE_URL` in Pages
6. Deploy frontend
7. Add the final Pages/custom domain to `CORS_ORIGINS` in the API host
8. Redeploy API if needed

## 6. Quick sanity checks after deployment

Frontend:

- open the Pages URL
- verify dashboard loads instead of showing API error state

API:

- `GET https://your-api-domain.com/api/health`
- `GET https://your-api-domain.com/api/supply-chain/overview`

## 7. Important note

Cloudflare Pages can deploy the frontend directly from GitHub after push.

But the current NestJS API cannot be treated as a Cloudflare Pages static asset. It needs its own runtime host unless we later refactor it specifically for Workers.
