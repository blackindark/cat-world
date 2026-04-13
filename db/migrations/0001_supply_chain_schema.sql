CREATE TABLE IF NOT EXISTS suppliers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  lead_time_days INTEGER NOT NULL,
  on_time_rate INTEGER NOT NULL,
  status TEXT NOT NULL,
  region TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS warehouses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  utilization_rate INTEGER NOT NULL,
  capacity_units INTEGER NOT NULL,
  risk_level TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS inventory_items (
  id TEXT PRIMARY KEY,
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  warehouse_id TEXT NOT NULL,
  on_hand INTEGER NOT NULL,
  safety_stock INTEGER NOT NULL,
  reorder_point INTEGER NOT NULL,
  turnover_days INTEGER NOT NULL,
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
);

CREATE TABLE IF NOT EXISTS purchase_orders (
  id TEXT PRIMARY KEY,
  supplier_id TEXT NOT NULL,
  warehouse_id TEXT NOT NULL,
  amount_cny INTEGER NOT NULL,
  status TEXT NOT NULL,
  eta TEXT NOT NULL,
  created_at TEXT NOT NULL,
  buyer TEXT NOT NULL,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
);

CREATE TABLE IF NOT EXISTS receipts (
  id TEXT PRIMARY KEY,
  purchase_order_id TEXT NOT NULL,
  warehouse_id TEXT NOT NULL,
  received_at TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  quality_pass_rate REAL NOT NULL,
  FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
);

CREATE TABLE IF NOT EXISTS supply_chain_alerts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  severity TEXT NOT NULL,
  owner TEXT NOT NULL,
  action TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_inventory_warehouse_id ON inventory_items(warehouse_id);
CREATE INDEX IF NOT EXISTS idx_inventory_safety_stock ON inventory_items(safety_stock);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_supplier_id ON purchase_orders(supplier_id);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_status ON purchase_orders(status);
CREATE INDEX IF NOT EXISTS idx_receipts_purchase_order_id ON receipts(purchase_order_id);
