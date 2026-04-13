import { supplyChainSeed } from './data';
import { getD1Database, queryAll } from './d1';
import type {
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
  const rows = await queryAll<WarehouseRow>(db, 'SELECT * FROM warehouses ORDER BY id');
  return rows.map(mapWarehouseRow);
}

export async function getInventory(): Promise<InventoryItem[]> {
  const db = await getD1Database();
  if (!db) return supplyChainSeed.inventory;
  const rows = await queryAll<InventoryRow>(db, 'SELECT * FROM inventory_items ORDER BY id');
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
  const rows = await queryAll<AlertRow>(db, 'SELECT * FROM supply_chain_alerts ORDER BY id');
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
    warehouses.reduce((sum, warehouse) => sum + warehouse.utilizationRate, 0) / warehouses.length,
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
      { stage: '采购申请', count: 12, description: '业务侧需求已拆解到物料级别' },
      { stage: '审批中', count: 4, description: '金额超阈值订单待财务与供应链总监审批' },
      { stage: '在途', count: purchaseOrders.filter((item) => item.status === 'in_transit').length, description: '已下单并进入物流履约环节' },
      { stage: '异常', count: purchaseOrders.filter((item) => item.status === 'delayed').length, description: '交期波动或库存预警触发人工干预' },
    ],
    alerts,
    topSuppliers: [...suppliers].sort((a, b) => b.onTimeRate - a.onTimeRate).slice(0, 3),
    inventoryRisks,
  };
}

function mapSupplierRow(row: SupplierRow): Supplier {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    leadTimeDays: row.lead_time_days,
    onTimeRate: row.on_time_rate,
    status: row.status,
    region: row.region,
  };
}

function mapWarehouseRow(row: WarehouseRow): Warehouse {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    utilizationRate: row.utilization_rate,
    capacityUnits: row.capacity_units,
    riskLevel: row.risk_level,
  };
}

function mapInventoryRow(row: InventoryRow): InventoryItem {
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    category: row.category,
    warehouseId: row.warehouse_id,
    onHand: row.on_hand,
    safetyStock: row.safety_stock,
    reorderPoint: row.reorder_point,
    turnoverDays: row.turnover_days,
  };
}

function mapPurchaseOrderRow(row: PurchaseOrderRow): PurchaseOrder {
  return {
    id: row.id,
    supplierId: row.supplier_id,
    warehouseId: row.warehouse_id,
    amountCny: row.amount_cny,
    status: row.status,
    eta: row.eta,
    createdAt: row.created_at,
    buyer: row.buyer,
  };
}

function mapReceiptRow(row: ReceiptRow): Receipt {
  return {
    id: row.id,
    purchaseOrderId: row.purchase_order_id,
    warehouseId: row.warehouse_id,
    receivedAt: row.received_at,
    quantity: row.quantity,
    qualityPassRate: row.quality_pass_rate,
  };
}

function mapAlertRow(row: AlertRow): SupplyChainAlert {
  return row;
}

function getInventoryGap(item: InventoryItem) {
  return item.onHand - item.safetyStock;
}
