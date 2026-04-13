import { supplyChainSeed } from './data';
import type { InventoryItem, SupplyChainOverview } from './types';

export function getSuppliers() {
  return supplyChainSeed.suppliers;
}

export function getWarehouses() {
  return supplyChainSeed.warehouses;
}

export function getInventory() {
  return supplyChainSeed.inventory;
}

export function getPurchaseOrders() {
  return supplyChainSeed.purchaseOrders;
}

export function getReceipts() {
  return supplyChainSeed.receipts;
}

export function getSupplyChainOverview(): SupplyChainOverview {
  const suppliers = getSuppliers();
  const warehouses = getWarehouses();
  const inventory = getInventory();
  const purchaseOrders = getPurchaseOrders();
  const receipts = getReceipts();
  const alerts = supplyChainSeed.alerts;

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

function getInventoryGap(item: InventoryItem) {
  return item.onHand - item.safetyStock;
}
