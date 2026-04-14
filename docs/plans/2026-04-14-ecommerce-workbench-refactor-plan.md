# Ecommerce Platform Workbench Refactor Plan

> For Hermes: use this plan to keep evolving the current Next.js + Cloudflare D1 project from a supply-chain slice into a professional ecommerce learning platform.

Goal: transform the repo into a storefront + admin + architecture-learning ecommerce workbench that demonstrates real domain modeling, real write flows, and explainable product/technical architecture.

Architecture: keep a single Next.js full-stack deployment on Cloudflare Workers with D1 as the operational store. Separate business domains under `lib/ecommerce/*`, expose route handlers under `app/api/ecommerce/*`, and keep the homepage as a domain cockpit that teaches both product and technical architecture.

Tech Stack: Next.js App Router, Cloudflare Workers, Cloudflare D1, OpenNext for Cloudflare, TypeScript.

Core business points to cover:
- Frontend storefront: home, search, recommendation, PDP, cart, checkout, payment, order query, member center
- Backend admin: catalog, inventory, customer CRM, order center, marketing center, after-sales, content CMS, analytics
- Platform architecture: BFF, OMS/WMS/TMS, payment, risk, pricing & promotion engine, data warehouse, observability

Implementation order:
1. Catalog + customer + order core tables and workbench UI
2. Promotion + campaign + coupon + pricing rule surfaces
3. Fulfillment + shipment + reverse logistics
4. After-sales workflow and ticket operations
5. Storefront sample flows (browse, add-to-cart, checkout simulation)
6. Analytics and architecture handbook enrichment
