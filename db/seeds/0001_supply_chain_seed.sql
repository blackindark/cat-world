INSERT OR REPLACE INTO suppliers (id, name, category, lead_time_days, on_time_rate, status, region) VALUES
('SUP-001', '华东电子材料集团', '核心原材料', 7, 96, 'strategic', '上海'),
('SUP-002', '苏州精密结构件', '结构件', 12, 91, 'active', '苏州'),
('SUP-003', '深圳智联包材', '包装辅料', 5, 88, 'watchlist', '深圳'),
('SUP-004', '宁波国际物流协同中心', '物流承运', 3, 94, 'strategic', '宁波');

INSERT OR REPLACE INTO warehouses (id, name, city, utilization_rate, capacity_units, risk_level) VALUES
('WH-SH', '上海成品仓', '上海', 74, 18000, 'low'),
('WH-SZ', '苏州中转仓', '苏州', 89, 12000, 'medium'),
('WH-HF', '合肥备件仓', '合肥', 93, 8000, 'high');

INSERT OR REPLACE INTO inventory_items (id, sku, name, category, warehouse_id, on_hand, safety_stock, reorder_point, turnover_days) VALUES
('INV-001', 'RM-CHIP-AX7', '控制芯片 AX7', '原材料', 'WH-SH', 3200, 2800, 3000, 18),
('INV-002', 'FG-SENSOR-PRO', '传感器成品 Pro', '成品', 'WH-SZ', 960, 1200, 1400, 9),
('INV-003', 'PK-BOX-02', '抗震包装箱 02', '辅料', 'WH-HF', 410, 600, 650, 27),
('INV-004', 'SP-MOTOR-11', '伺服电机备件 11', '备件', 'WH-HF', 120, 150, 180, 34);

INSERT OR REPLACE INTO purchase_orders (id, supplier_id, warehouse_id, amount_cny, status, eta, created_at, buyer) VALUES
('PO-2026-0411', 'SUP-001', 'WH-SH', 486000, 'approved', '2026-04-16', '2026-04-11', '陈敏'),
('PO-2026-0412', 'SUP-002', 'WH-SZ', 268000, 'in_transit', '2026-04-15', '2026-04-12', '王磊'),
('PO-2026-0413', 'SUP-003', 'WH-HF', 78000, 'delayed', '2026-04-18', '2026-04-13', '刘倩'),
('PO-2026-0408', 'SUP-004', 'WH-SZ', 152000, 'received', '2026-04-12', '2026-04-08', '陈敏');

INSERT OR REPLACE INTO receipts (id, purchase_order_id, warehouse_id, received_at, quantity, quality_pass_rate) VALUES
('RCV-001', 'PO-2026-0408', 'WH-SZ', '2026-04-12T09:10:00.000Z', 860, 99.1),
('RCV-002', 'PO-2026-0411', 'WH-SH', '2026-04-13T03:30:00.000Z', 420, 97.4);

INSERT OR REPLACE INTO supply_chain_alerts (id, title, severity, owner, action) VALUES
('ALT-001', '苏州中转仓接近容量上限', 'warning', '仓储主管', '48小时内调整跨仓调拨计划'),
('ALT-002', '包装辅料供应商交期波动扩大', 'critical', '采购经理', '触发备选供应商询价与补单'),
('ALT-003', '成品 Pro 库存跌破安全库存', 'critical', '计划专员', '加急补货并锁定重点客户分配');
