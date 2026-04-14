CREATE TABLE IF NOT EXISTS cart_items (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  channel TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  selected INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS payment_records (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  method TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  status TEXT NOT NULL,
  paid_at TEXT,
  FOREIGN KEY (order_id) REFERENCES sales_orders(id)
);

CREATE TABLE IF NOT EXISTS shipment_records (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  warehouse_code TEXT NOT NULL,
  carrier TEXT NOT NULL,
  tracking_no TEXT NOT NULL,
  status TEXT NOT NULL,
  shipped_at TEXT,
  delivered_at TEXT,
  FOREIGN KEY (order_id) REFERENCES sales_orders(id)
);

CREATE INDEX IF NOT EXISTS idx_cart_items_customer_id ON cart_items(customer_id);
CREATE INDEX IF NOT EXISTS idx_payment_records_order_id ON payment_records(order_id);
CREATE INDEX IF NOT EXISTS idx_shipment_records_order_id ON shipment_records(order_id);
