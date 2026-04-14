export type SupplierStatus = 'strategic' | 'active' | 'watchlist';
export type PurchaseOrderStatus = 'draft' | 'approved' | 'in_transit' | 'delayed' | 'received';
export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface Supplier {
  id: string;
  name: string;
  category: string;
  leadTimeDays: number;
  onTimeRate: number;
  status: SupplierStatus;
  region: string;
}

export interface Warehouse {
  id: string;
  name: string;
  city: string;
  utilizationRate: number;
  capacityUnits: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  warehouseId: string;
  onHand: number;
  safetyStock: number;
  reorderPoint: number;
  turnoverDays: number;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  warehouseId: string;
  amountCny: number;
  status: PurchaseOrderStatus;
  eta: string;
  createdAt: string;
  buyer: string;
}

export interface Receipt {
  id: string;
  purchaseOrderId: string;
  inventoryItemId?: string;
  warehouseId: string;
  receivedAt: string;
  quantity: number;
  qualityPassRate: number;
}

export interface SupplyChainAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  owner: string;
  action: string;
}

export interface SupplyChainSnapshot {
  suppliers: Supplier[];
  warehouses: Warehouse[];
  inventory: InventoryItem[];
  purchaseOrders: PurchaseOrder[];
  receipts: Receipt[];
  alerts: SupplyChainAlert[];
}

export interface SupplyChainOverview {
  kpis: {
    activeSuppliers: number;
    openPurchaseOrders: number;
    inventoryUnits: number;
    warehouseUtilization: number;
    inboundToday: number;
    alertCount: number;
  };
  procurementFlow: Array<{
    stage: string;
    count: number;
    description: string;
  }>;
  alerts: SupplyChainAlert[];
  topSuppliers: Supplier[];
  inventoryRisks: InventoryItem[];
}

export interface CreateSupplierInput {
  name: string;
  category: string;
  leadTimeDays: number;
  onTimeRate: number;
  status: SupplierStatus;
  region: string;
}

export interface CreatePurchaseOrderInput {
  supplierId: string;
  warehouseId: string;
  amountCny: number;
  status: PurchaseOrderStatus;
  eta: string;
  buyer: string;
}

export interface CreateReceiptInput {
  purchaseOrderId: string;
  inventoryItemId: string;
  warehouseId: string;
  quantity: number;
  qualityPassRate: number;
  receivedAt?: string;
  markOrderReceived?: boolean;
}
