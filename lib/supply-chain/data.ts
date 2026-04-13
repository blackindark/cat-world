import type {
  InventoryItem,
  PurchaseOrder,
  Receipt,
  Supplier,
  SupplyChainAlert,
  SupplyChainSnapshot,
  Warehouse,
} from './types';

const suppliers: Supplier[] = [
  { id: 'SUP-001', name: '华东电子材料集团', category: '核心原材料', leadTimeDays: 7, onTimeRate: 96, status: 'strategic', region: '上海' },
  { id: 'SUP-002', name: '苏州精密结构件', category: '结构件', leadTimeDays: 12, onTimeRate: 91, status: 'active', region: '苏州' },
  { id: 'SUP-003', name: '深圳智联包材', category: '包装辅料', leadTimeDays: 5, onTimeRate: 88, status: 'watchlist', region: '深圳' },
  { id: 'SUP-004', name: '宁波国际物流协同中心', category: '物流承运', leadTimeDays: 3, onTimeRate: 94, status: 'strategic', region: '宁波' },
];

const warehouses: Warehouse[] = [
  { id: 'WH-SH', name: '上海成品仓', city: '上海', utilizationRate: 74, capacityUnits: 18000, riskLevel: 'low' },
  { id: 'WH-SZ', name: '苏州中转仓', city: '苏州', utilizationRate: 89, capacityUnits: 12000, riskLevel: 'medium' },
  { id: 'WH-HF', name: '合肥备件仓', city: '合肥', utilizationRate: 93, capacityUnits: 8000, riskLevel: 'high' },
];

const inventory: InventoryItem[] = [
  { id: 'INV-001', sku: 'RM-CHIP-AX7', name: '控制芯片 AX7', category: '原材料', warehouseId: 'WH-SH', onHand: 3200, safetyStock: 2800, reorderPoint: 3000, turnoverDays: 18 },
  { id: 'INV-002', sku: 'FG-SENSOR-PRO', name: '传感器成品 Pro', category: '成品', warehouseId: 'WH-SZ', onHand: 960, safetyStock: 1200, reorderPoint: 1400, turnoverDays: 9 },
  { id: 'INV-003', sku: 'PK-BOX-02', name: '抗震包装箱 02', category: '辅料', warehouseId: 'WH-HF', onHand: 410, safetyStock: 600, reorderPoint: 650, turnoverDays: 27 },
  { id: 'INV-004', sku: 'SP-MOTOR-11', name: '伺服电机备件 11', category: '备件', warehouseId: 'WH-HF', onHand: 120, safetyStock: 150, reorderPoint: 180, turnoverDays: 34 },
];

const purchaseOrders: PurchaseOrder[] = [
  { id: 'PO-2026-0411', supplierId: 'SUP-001', warehouseId: 'WH-SH', amountCny: 486000, status: 'approved', eta: '2026-04-16', createdAt: '2026-04-11', buyer: '陈敏' },
  { id: 'PO-2026-0412', supplierId: 'SUP-002', warehouseId: 'WH-SZ', amountCny: 268000, status: 'in_transit', eta: '2026-04-15', createdAt: '2026-04-12', buyer: '王磊' },
  { id: 'PO-2026-0413', supplierId: 'SUP-003', warehouseId: 'WH-HF', amountCny: 78000, status: 'delayed', eta: '2026-04-18', createdAt: '2026-04-13', buyer: '刘倩' },
  { id: 'PO-2026-0408', supplierId: 'SUP-004', warehouseId: 'WH-SZ', amountCny: 152000, status: 'received', eta: '2026-04-12', createdAt: '2026-04-08', buyer: '陈敏' },
];

const receipts: Receipt[] = [
  { id: 'RCV-001', purchaseOrderId: 'PO-2026-0408', warehouseId: 'WH-SZ', receivedAt: '2026-04-12T09:10:00.000Z', quantity: 860, qualityPassRate: 99.1 },
  { id: 'RCV-002', purchaseOrderId: 'PO-2026-0411', warehouseId: 'WH-SH', receivedAt: '2026-04-13T03:30:00.000Z', quantity: 420, qualityPassRate: 97.4 },
];

const alerts: SupplyChainAlert[] = [
  { id: 'ALT-001', title: '苏州中转仓接近容量上限', severity: 'warning', owner: '仓储主管', action: '48小时内调整跨仓调拨计划' },
  { id: 'ALT-002', title: '包装辅料供应商交期波动扩大', severity: 'critical', owner: '采购经理', action: '触发备选供应商询价与补单' },
  { id: 'ALT-003', title: '成品 Pro 库存跌破安全库存', severity: 'critical', owner: '计划专员', action: '加急补货并锁定重点客户分配' },
];

export const supplyChainSeed: SupplyChainSnapshot = {
  suppliers,
  warehouses,
  inventory,
  purchaseOrders,
  receipts,
  alerts,
};
