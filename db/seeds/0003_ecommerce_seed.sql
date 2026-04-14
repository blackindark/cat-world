INSERT OR REPLACE INTO product_categories (id, name, parent_id, channel, sort_order) VALUES
('CAT-001', '手机数码', NULL, 'app', 1),
('CAT-002', '家居生活', NULL, 'app', 2),
('CAT-003', '会员专享', NULL, 'miniapp', 3);

INSERT OR REPLACE INTO products (id, spu_code, sku_code, name, category_id, price_cents, market_price_cents, status, stock_on_hand, sales_volume, channel, fulfillment_mode) VALUES
('PRD-001', 'SPU-IP15', 'SKU-IP15-128-BLK', 'Aurora Phone 15 128G 黑色', 'CAT-001', 599900, 679900, 'published', 128, 5340, 'app', 'warehouse'),
('PRD-002', 'SPU-PAD11', 'SKU-PAD11-256-SIL', 'NorthPad 11 256G 银色', 'CAT-001', 389900, 439900, 'published', 86, 2810, 'app', 'warehouse'),
('PRD-003', 'SPU-COFFEE', 'SKU-COFFEE-GIFT', '精品咖啡礼盒', 'CAT-002', 12900, 19900, 'published', 520, 9120, 'miniapp', 'merchant'),
('PRD-004', 'SPU-VIPBOX', 'SKU-VIPBOX-2026Q2', '会员季度礼盒 2026Q2', 'CAT-003', 9900, 15900, 'draft', 200, 430, 'app', 'warehouse');

INSERT OR REPLACE INTO customers (id, name, tier, phone, city, lifecycle_stage, registered_at, total_spent_cents) VALUES
('CUS-001', '林然', 'gold', '13800001111', '上海', 'active', '2025-11-04T10:00:00.000Z', 1589900),
('CUS-002', '赵晴', 'silver', '13900002222', '杭州', 'loyal', '2025-12-12T14:00:00.000Z', 599900),
('CUS-003', '顾辰', 'platinum', '13700003333', '深圳', 'vip', '2025-10-01T09:00:00.000Z', 2889900),
('CUS-004', '周沐', 'member', '13600004444', '成都', 'new', '2026-04-01T12:00:00.000Z', 12900);

INSERT OR REPLACE INTO promotion_campaigns (id, name, type, status, budget_cents, start_at, end_at, owner) VALUES
('CAM-001', '春季焕新大促', 'campaign', 'running', 3000000, '2026-04-01T00:00:00.000Z', '2026-04-20T23:59:59.000Z', '增长运营'),
('CAM-002', 'Plus会员复购券包', 'coupon', 'running', 800000, '2026-04-05T00:00:00.000Z', '2026-04-30T23:59:59.000Z', 'CRM运营'),
('CAM-003', '新品预售首发', 'presale', 'planned', 1200000, '2026-04-18T00:00:00.000Z', '2026-05-10T23:59:59.000Z', '类目运营');

INSERT OR REPLACE INTO sales_orders (id, customer_id, product_id, channel, status, payment_status, fulfillment_status, quantity, order_amount_cents, created_at) VALUES
('ORD-001', 'CUS-001', 'PRD-001', 'app', 'paid', 'paid', 'shipped', 1, 599900, '2026-04-10T08:30:00.000Z'),
('ORD-002', 'CUS-002', 'PRD-003', 'miniapp', 'completed', 'paid', 'delivered', 2, 25800, '2026-04-11T15:20:00.000Z'),
('ORD-003', 'CUS-003', 'PRD-002', 'app', 'paid', 'paid', 'packed', 1, 389900, '2026-04-12T09:45:00.000Z'),
('ORD-004', 'CUS-004', 'PRD-003', 'miniapp', 'pending_payment', 'unpaid', 'pending', 1, 12900, '2026-04-13T19:00:00.000Z');

INSERT OR REPLACE INTO after_sales_tickets (id, order_id, type, status, reason, created_at) VALUES
('AFT-001', 'ORD-001', 'refund', 'reviewing', '用户申请差价补偿', '2026-04-12T18:00:00.000Z'),
('AFT-002', 'ORD-003', 'exchange', 'created', '颜色不符，申请换货', '2026-04-13T11:30:00.000Z');
