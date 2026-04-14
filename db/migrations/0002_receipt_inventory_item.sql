ALTER TABLE receipts ADD COLUMN inventory_item_id TEXT REFERENCES inventory_items(id);
