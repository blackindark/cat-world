import { supplyChainSeed } from './data';
import { executeRun, getD1Database, queryAll, queryFirst, requireD1Database } from './d1';
import type {
  CreatePurchaseOrderInput,
  CreateReceiptInput,
  CreateSupplierInput,
  InventoryItem,
  PurchaseOrder,
  Receipt,
  Supplier,
  SupplyChainAlert,
  SupplyChainOverview,
  Warehouse,
} from './types';

type SupplierRow = {
  id: string;
  name: string;
  category: string;
  lead_time_days: number;
  on_time_rate: number;
  status: Supplier['status'];
  region: string;
};

type WarehouseRow = {
  id: string;
  name: string;
  city: string;
  utilization_rate: number;
  capacity_units: number;
  risk_level: Warehouse['riskLevel'];
};

type InventoryRow = {
  id: string;
  sku: string;
  name: string;
  category: string;
  warehouse_id: string;
  on_hand: number;
  safety_stock: number;
  reorder_point: number;
  turnover_days: number;
};

type PurchaseOrderRow = {
  id: string;
  supplier_id: string;
  warehouse_id: string;
  amount_cny: number;
  status: PurchaseOrder['status'];
  eta: string;
  created_at: string;
  buyer: string;
};

type ReceiptRow = {
  id: string;
  purchase_order_id: string;
  inventory_item_id?: string | null;
  warehouse_id: string;
  received_at: string;
  quantity: number;
  quality_pass_rate: number;
};

type AlertRow = {
  id: string;
  title: string;
  severity: SupplyChainAlert['severity'];
  owner: string;
  action: string;
};

export async function getSuppliers(): Promise<Supplier[]> {
  const db = await getD1Database();
  if (!db) return supplyChainSeed.suppliers;
  const rows = await queryAll<SupplierRow>(db, 'SELECT * FROM suppliers ORDER BY id');
  return rows.map(mapSupplierRow);
}

export async function getWarehouses(): Promise<Warehouse[]> {
  const db = await getD1Database();
  if (!db) return supplyChainSeed.warehouses;
  const rows = await queryAll<WarehouseRow>(db, 'SELECT * FROM warehouses ORDER BY name');
  return rows.map(mapWarehouseRow);
}

export async function getInventory(): Promise<InventoryItem[]> {
  const db = await getD1Database();
  if (!db) return supplyChainSeed.inventory;
  const rows = await queryAll<InventoryRow>(db, 'SELECT * FROM inventory_items ORDER BY sku');
  return rows.map(mapInventoryRow);
}

export async function getPurchaseOrders(): Promise<PurchaseOrder[]> {
  const db = await getD1Database();
  if (!db) return supplyChainSeed.purchaseOrders;
  const rows = await queryAll<PurchaseOrderRow>(db, 'SELECT * FROM purchase_orders ORDER BY created_at DESC');
  return rows.map(mapPurchaseOrderRow);
}

export async function getReceipts(): Promise<Receipt[]> {
  const db = await getD1Database();
  if (!db) return supplyChainSeed.receipts;
  const rows = await queryAll<ReceiptRow>(db, 'SELECT * FROM receipts ORDER BY received_at DESC');
  return rows.map(mapReceiptRow);
}

export async function getAlerts(): Promise<SupplyChainAlert[]> {
  const db = await getD1Database();
  if (!db) return supplyChainSeed.alerts;
  const rows = await queryAll<AlertRow>(db, 'SELECT * FROM supply_chain_alerts ORDER BY id DESC');
  return rows.map(mapAlertRow);
}

export async function getSupplyChainOverview(): Promise<SupplyChainOverview> {
  const [suppliers, warehouses, inventory, purchaseOrders, receipts, alerts] = await Promise.all([
    getSuppliers(),
    getWarehouses(),
    getInventory(),
    getPurchaseOrders(),
    getReceipts(),
    getAlerts(),
  ]);

  const openPurchaseOrders = purchaseOrders.filter((order) => order.status !== 'received');
  const inboundToday = receipts.reduce((total, receipt) => total + receipt.quantity, 0);
  const warehouseUtilization = Math.round(
    warehouses.reduce((sum, warehouse) => sum + warehouse.utilizationRate, 0) / Math.max(warehouses.length, 1),
  );
  const inventoryRisks = inventory
    .filter((item) => item.onHand <= item.safetyStock)
    .sort((a, b) => getInventoryGap(a) - getInventoryGap(b));

  return {
    kpis: {
      activeSuppliers: suppliers.length,
      openPurchaseOrders: openPurchaseOrders.length,
      inventoryUnits: inventory.reduce((sum, item) => sum + item.onHand, 0),
      warehouseUtilization,
      inboundToday,
      alertCount: alerts.length,
    },
    procurementFlow: [
      { stage: '采购申请', count: purchaseOrders.filter((item) => item.status === 'draft').length + 8, description: '业务需求已拆解并进入采购工作台' },
      { stage: '审批中', count: purchaseOrders.filter((item) => item.status === 'approved').length + 1, description: '待采购经理与财务确认预算和供方策略' },
      { stage: '在途', count: purchaseOrders.filter((item) => item.status === 'in_transit').length, description: '已下单并进入物流履约环节' },
      { stage: '异常', count: purchaseOrders.filter((item) => item.status === 'delayed').length, description: '交期波动或库存预警触发人工干预' },
    ],
    alerts,
    topSuppliers: [...suppliers].sort((a, b) => b.onTimeRate - a.onTimeRate).slice(0, 3),
    inventoryRisks,
  };
}

export async function createSupplier(input: CreateSupplierInput): Promise<Supplier> {
  validateRequired(input.name, '供应商名称');
  validateRequired(input.category, '供应商类别');
  validateRequired(input.region, '区域');
  const db = await requireD1Database();
  const id = createBusinessId('SUP');
  await executeRun(db, 'INSERT INTO suppliers (id, name, category, lead_time_days, on_time_rate, status, region) VALUES (?, ?, ?, ?, ?, ?, ?)', id, input.name.trim(), input.category.trim(), input.leadTimeDays, input.onTimeRate, input.status, input.region.trim());
  return { id, name: input.name.trim(), category: input.category.trim(), leadTimeDays: input.leadTimeDays, onTimeRate: input.onTimeRate, status: input.status, region: input.region.trim() };
}

export async function createPurchaseOrder(input: CreatePurchaseOrderInput): Promise<PurchaseOrder> {
  validateRequired(input.supplierId, '供应商');
  validateRequired(input.warehouseId, '仓库');
  validateRequired(input.buyer, '采购员');
  validateRequired(input.eta, 'ETA');
  const db = await requireD1Database();
  const id = createBusinessId('PO');
  const createdAt = new Date().toISOString().slice(0, 10);
  await executeRun(db, 'INSERT INTO purchase_orders (id, supplier_id, warehouse_id, amount_cny, status, eta, created_at, buyer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', id, input.supplierId, input.warehouseId, input.amountCny, input.status, input.eta, createdAt, input.buyer.trim());
  return { id, supplierId: input.supplierId, warehouseId: input.warehouseId, amountCny: input.amountCny, status: input.status, eta: input.eta, createdAt, buyer: input.buyer.trim() };
}

export async function createReceipt(input: CreateReceiptInput): Promise<Receipt> {
  validateRequired(input.purchaseOrderId, '采购单');
  validateRequired(input.inventoryItemId, '库存物料');
  validateRequired(input.warehouseId, '仓库');
  const db = await requireD1Database();
  const purchaseOrder = await queryFirst<PurchaseOrderRow>(db, 'SELECT * FROM purchase_orders WHERE id = ?', input.purchaseOrderId);
  if (!purchaseOrder) throw new Error('采购单不存在');
  const inventoryItem = await queryFirst<InventoryRow>(db, 'SELECT * FROM inventory_items WHERE id = ?', input.inventoryItemId);
  if (!inventoryItem) throw new Error('库存物料不存在');

  const id = createBusinessId('RCV');
  const receivedAt = input.receivedAt?.trim() || new Date().toISOString();
  await executeRun(db, 'INSERT INTO receipts (id, purchase_order_id, inventory_item_id, warehouse_id, received_at, quantity, quality_pass_rate) VALUES (?, ?, ?, ?, ?, ?, ?)', id, input.purchaseOrderId, input.inventoryItemId, input.warehouseId, receivedAt, input.quantity, input.qualityPassRate);
  await executeRun(db, 'UPDATE inventory_items SET on_hand = on_hand + ? WHERE id = ?', input.quantity, input.inventoryItemId);
  if (input.markOrderReceived !== false) {
    await executeRun(db, 'UPDATE purchase_orders SET status = ? WHERE id = ?', 'received', input.purchaseOrderId);
  }
  if (input.qualityPassRate < 98) {
    await executeRun(db, 'INSERT INTO supply_chain_alerts (id, title, severity, owner, action) VALUES (?, ?, ?, ?, ?)', createBusinessId('ALT'), `到货质检异常：${purchaseOrder.id}`, input.qualityPassRate < 95 ? 'critical' : 'warning', '质检主管', `检验合格率仅 ${input.qualityPassRate}%，请复核批次 ${inventoryItem.sku} 并决定是否冻结库存。`);
  }

  return { id, purchaseOrderId: input.purchaseOrderId, inventoryItemId: input.inventoryItemId, warehouseId: input.warehouseId, receivedAt, quantity: input.quantity, qualityPassRate: input.qualityPassRate };
}

function mapSupplierRow(row: SupplierRow): Supplier {
  return { id: row.id, name: row.name, category: row.category, leadTimeDays: row.lead_time_days, onTimeRate: row.on_time_rate, status: row.status, region: row.region };
}
function mapWarehouseRow(row: WarehouseRow): Warehouse {
  return { id: row.id, name: row.name, city: row.city, utilizationRate: row.utilization_rate, capacityUnits: row.capacity_units, riskLevel: row.risk_level };
}
function mapInventoryRow(row: InventoryRow): InventoryItem {
  return { id: row.id, sku: row.sku, name: row.name, category: row.category, warehouseId: row.warehouse_id, onHand: row.on_hand, safetyStock: row.safety_stock, reorderPoint: row.reorder_point, turnoverDays: row.turnover_days };
}
function mapPurchaseOrderRow(row: PurchaseOrderRow): PurchaseOrder {
  return { id: row.id, supplierId: row.supplier_id, warehouseId: row.warehouse_id, amountCny: row.amount_cny, status: row.status, eta: row.eta, createdAt: row.created_at, buyer: row.buyer };
}
function mapReceiptRow(row: ReceiptRow): Receipt {
  return { id: row.id, purchaseOrderId: row.purchase_order_id, inventoryItemId: row.inventory_item_id ?? undefined, warehouseId: row.warehouse_id, receivedAt: row.received_at, quantity: row.quantity, qualityPassRate: row.quality_pass_rate };
}
function mapAlertRow(row: AlertRow): SupplyChainAlert { return row; }
function getInventoryGap(item: InventoryItem) { return item.onHand - item.safetyStock; }
function validateRequired(value: string, label: string) { if (!value || !value.trim()) throw new Error(`${label}不能为空`); }
function createBusinessId(prefix: string) {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 12);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${random}`;
}
