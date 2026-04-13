# Cloudflare D1 notes for Northstar ERP

Current D1 database:
- database_name: `northstar-erp-d1`
- binding: `DB`
- database_id: `1509ec0f-9457-4b1e-9069-bb4c49419a1b`

## Schema and seed files

- `db/migrations/0001_supply_chain_schema.sql`
- `db/seeds/0001_supply_chain_seed.sql`

## Apply schema

```bash
npx wrangler d1 execute northstar-erp-d1 --remote --file=db/migrations/0001_supply_chain_schema.sql
```

## Seed demo data

```bash
npx wrangler d1 execute northstar-erp-d1 --remote --file=db/seeds/0001_supply_chain_seed.sql
```

## Free tier snapshot

According to Cloudflare D1 pricing docs accessed in this session:
- Free plan includes 5 million rows read / day
- Free plan includes 100,000 rows written / day
- Free plan includes 5 GB total storage
- Free limits reset daily at 00:00 UTC
- D1 itself has no egress charge

Always re-check Cloudflare docs later in case pricing changes.
