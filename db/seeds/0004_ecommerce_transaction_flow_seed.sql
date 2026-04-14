INSERT OR REPLACE INTO cart_items (id, customer_id, product_id, channel, quantity, selected, created_at) VALUES
('CRT-001', 'CUS-001', 'PRD-002', 'app', 1, 1, '2026-04-13T08:00:00.000Z'),
('CRT-002', 'CUS-002', 'PRD-003', 'miniapp', 2, 1, '2026-04-13T10:30:00.000Z');

INSERT OR REPLACE INTO payment_records (id, order_id, method, amount_cents, status, paid_at) VALUES
('PAY-001', 'ORD-001', 'alipay', 599900, 'paid', '2026-04-10T08:35:00.000Z'),
('PAY-002', 'ORD-002', 'wechatpay', 25800, 'paid', '2026-04-11T15:22:00.000Z');

INSERT OR REPLACE INTO shipment_records (id, order_id, warehouse_code, carrier, tracking_no, status, shipped_at, delivered_at) VALUES
('SHP-001', 'ORD-001', 'SH-CDC-01', '顺丰', 'SF123456789CN', 'shipped', '2026-04-10T14:00:00.000Z', NULL),
('SHP-002', 'ORD-002', 'HZ-FWD-03', '京东物流', 'JD9988776655', 'delivered', '2026-04-11T18:00:00.000Z', '2026-04-12T12:20:00.000Z');
