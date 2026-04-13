# ERP Supply Chain Refactor Implementation Plan

> For Hermes: use this plan to refactor the current single Vite demo into a workspace-based ERP repo with NestJS API, React frontend, in-memory data layer, and supply-chain-first business scope.

Goal: turn the current Cloudflare-deployed frontend demo into an ERP foundation built with NestJS + React, using an in-memory database/service layer first, and implement the first domain slice as a supply chain system.

Architecture: use an npm workspace monorepo with `apps/api` for NestJS and `apps/web` for React + Vite. Keep persistence intentionally in-memory for this phase, but structure the backend like a real ERP domain service so later migration to PostgreSQL/Redis/event bus is straightforward. Add `DESIGN.md` from `awesome-design-md` to anchor the UI system.

Tech Stack: npm workspaces, NestJS 11, React 19, Vite 7, TypeScript 5, React Router, TanStack Query, class-validator, class-transformer, awesome-design-md.

---

## Phase 1: Repo restructuring

### Task 1: Convert root project into workspace shell
Objective: replace the current single-app package manifest with a monorepo root manifest.
Files:
- Modify: `package.json`
- Create: `.npmrc`

Steps:
1. Replace root `package.json` with private workspace config and top-level scripts for `dev:web`, `dev:api`, `build`, `lint`.
2. Add `.npmrc` with `workspaces=true` for predictable npm workspace behavior.
3. Keep legacy root UI files untouched until the new apps build successfully.
4. Run `npm install` at repo root.
Verification:
- `npm install` completes.
- `npm run build --workspaces --if-present` can resolve workspace scripts after scaffolding.

### Task 2: Scaffold `apps/api`
Objective: create a NestJS backend shaped like an ERP domain service.
Files:
- Create: `apps/api/package.json`
- Create: `apps/api/tsconfig.json`
- Create: `apps/api/tsconfig.build.json`
- Create: `apps/api/nest-cli.json`
- Create: `apps/api/src/main.ts`
- Create: `apps/api/src/app.module.ts`
- Create: `apps/api/src/health/health.controller.ts`

Steps:
1. Add Nest runtime and build dependencies.
2. Configure TypeScript and Nest CLI.
3. Add bootstrap with CORS and `/api` global prefix.
4. Add health endpoint.
Verification:
- `npm run build -w apps/api`
- `npm run start:dev -w apps/api` starts without module errors.

### Task 3: Scaffold `apps/web`
Objective: create a new React ERP frontend.
Files:
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/tsconfig.node.json`
- Create: `apps/web/vite.config.ts`
- Create: `apps/web/index.html`
- Create: `apps/web/src/main.tsx`
- Create: `apps/web/src/App.tsx`
- Create: `apps/web/src/styles.css`

Steps:
1. Add React, React Router, and TanStack Query dependencies.
2. Configure Vite dev proxy to `http://localhost:3000` for `/api`.
3. Create app shell with ERP framing.
Verification:
- `npm run build -w apps/web`
- `npm run dev -w apps/web` starts successfully.

## Phase 2: Supply chain backend

### Task 4: Add in-memory supply chain data model
Objective: define the domain entities and seed data for the first ERP module.
Files:
- Create: `apps/api/src/supply-chain/types/*.ts`
- Create: `apps/api/src/supply-chain/data/supply-chain.seed.ts`
- Create: `apps/api/src/supply-chain/repository/supply-chain.repository.ts`

Steps:
1. Create typed entities for suppliers, warehouses, SKUs, purchase orders, receipts, alerts.
2. Seed demo data for a realistic supply chain control tower.
3. Expose repository methods returning filtered/aggregated data.
Verification:
- `npm run build -w apps/api`

### Task 5: Add supply chain service and controller
Objective: expose ERP-ready endpoints for frontend consumption.
Files:
- Create: `apps/api/src/supply-chain/supply-chain.module.ts`
- Create: `apps/api/src/supply-chain/supply-chain.service.ts`
- Create: `apps/api/src/supply-chain/supply-chain.controller.ts`

Endpoints:
- `GET /api/supply-chain/overview`
- `GET /api/supply-chain/suppliers`
- `GET /api/supply-chain/purchase-orders`
- `GET /api/supply-chain/warehouses`
- `GET /api/supply-chain/inventory`
- `GET /api/supply-chain/receipts`

Verification:
- Run the API and curl each endpoint.

## Phase 3: Supply chain frontend

### Task 6: Build frontend domain services and hooks
Objective: fetch backend data with a maintainable frontend architecture.
Files:
- Create: `apps/web/src/lib/api.ts`
- Create: `apps/web/src/features/supply-chain/api.ts`
- Create: `apps/web/src/features/supply-chain/hooks.ts`
- Create: `apps/web/src/features/supply-chain/types.ts`

Verification:
- TypeScript build passes.

### Task 7: Build supply chain dashboard pages
Objective: implement the first ERP screens.
Files:
- Create: `apps/web/src/pages/SupplyChainPage.tsx`
- Create: `apps/web/src/components/layout/*.tsx`
- Create: `apps/web/src/components/supply-chain/*.tsx`
- Modify: `apps/web/src/App.tsx`
- Modify: `apps/web/src/styles.css`

Screen content:
- ERP header/navigation
- KPI cards
- procurement pipeline timeline
- supplier matrix
- warehouse/inventory panels
- purchase order table
- exception alerts
- roadmap cards for later modules (finance, manufacturing, quality, MDM)

Verification:
- `npm run build -w apps/web`
- inspect the generated app in browser.

## Phase 4: Design system + docs

### Task 8: Install `awesome-design-md` and add `DESIGN.md`
Objective: anchor the UI refactor with a reusable design spec.
Files:
- Modify: root `package.json` or workspace scripts as needed
- Create: `DESIGN.md`

Steps:
1. Install `awesome-design-md`.
2. Choose an enterprise-appropriate design baseline.
3. Copy/adapt the generated `DESIGN.md` into project root.
4. Align the frontend styles to the chosen system.
Verification:
- `DESIGN.md` exists and the new UI visibly follows it.

### Task 9: Rewrite project docs
Objective: explain the new ERP direction and local dev/deploy model.
Files:
- Modify: `README.md`
- Keep this plan under `docs/plans/`

Include:
- repo structure
- run commands
- supply chain scope
- current in-memory persistence limitation
- how this maps to current Cloudflare deployment and next backend hosting step

## Final verification

Run:
- `npm run build`
- `npm run lint --workspaces --if-present`
- `npm run test --workspaces --if-present` if tests are added in this iteration

Success criteria:
- repo is now workspace-based
- NestJS API and React frontend both build
- supply chain ERP dashboard is wired to live in-memory API data
- `DESIGN.md` is present from awesome-design-md
- README explains the refactor clearly
