'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { InventoryItem, PurchaseOrder, Supplier, Warehouse } from '@/lib/supply-chain/types';

type FormState = { type: 'success' | 'error'; message: string } | null;

async function postJson(url: string, body: Record<string, unknown>) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error ?? '提交失败');
  return payload;
}

export function SupplyChainWorkbench({ suppliers, warehouses, inventory, purchaseOrders }: { suppliers: Supplier[]; warehouses: Warehouse[]; inventory: InventoryItem[]; purchaseOrders: PurchaseOrder[]; }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [supplierState, setSupplierState] = useState<FormState>(null);
  const [orderState, setOrderState] = useState<FormState>(null);
  const [receiptState, setReceiptState] = useState<FormState>(null);

  function handleSubmit<T extends HTMLFormElement>(event: React.FormEvent<T>, url: string, setState: (value: FormState) => void, transform: (formData: FormData) => Record<string, unknown>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    startTransition(async () => {
      try {
        await postJson(url, transform(formData));
        form.reset();
        setState({ type: 'success', message: '业务动作已执行，D1 数据已更新。' });
        router.refresh();
      } catch (error) {
        setState({ type: 'error', message: error instanceof Error ? error.message : '提交失败' });
      }
    });
  }

  return (
    <section className="operation-grid">
      <article className="operation-card">
        <div className="operation-head">
          <p className="eyebrow">Supplier onboarding</p>
          <h3>新增供应商</h3>
          <p className="muted">把供应商主数据真正写进 D1，而不是只停留在展示层。</p>
        </div>
        <form className="erp-form" onSubmit={(event) => handleSubmit(event, '/api/supply-chain/suppliers', setSupplierState, (formData) => ({ name: formData.get('name'), category: formData.get('category'), region: formData.get('region'), leadTimeDays: Number(formData.get('leadTimeDays')), onTimeRate: Number(formData.get('onTimeRate')), status: formData.get('status') }))}>
          <label><span>供应商名称</span><input name="name" placeholder="例如：成都核心电子" required /></label>
          <label><span>类别</span><input name="category" placeholder="结构件 / 原材料 / 物流承运" required /></label>
          <div className="form-row two-up">
            <label><span>区域</span><input name="region" placeholder="成都" required /></label>
            <label><span>状态</span><select name="status" defaultValue="active"><option value="strategic">strategic</option><option value="active">active</option><option value="watchlist">watchlist</option></select></label>
          </div>
          <div className="form-row two-up">
            <label><span>交期（天）</span><input name="leadTimeDays" type="number" min="1" defaultValue="7" required /></label>
            <label><span>准时率（%）</span><input name="onTimeRate" type="number" min="0" max="100" defaultValue="95" required /></label>
          </div>
          <button className="primary-button" disabled={isPending} type="submit">写入供应商主数据</button>
          {supplierState ? <p className={`form-message ${supplierState.type}`}>{supplierState.message}</p> : null}
        </form>
      </article>

      <article className="operation-card">
        <div className="operation-head">
          <p className="eyebrow">Procurement execution</p>
          <h3>新建采购单</h3>
          <p className="muted">从工作台直接创建采购订单，开始形成真实业务闭环。</p>
        </div>
        <form className="erp-form" onSubmit={(event) => handleSubmit(event, '/api/supply-chain/purchase-orders', setOrderState, (formData) => ({ supplierId: formData.get('supplierId'), warehouseId: formData.get('warehouseId'), buyer: formData.get('buyer'), eta: formData.get('eta'), status: formData.get('status'), amountCny: Number(formData.get('amountCny')) }))}>
          <label><span>供应商</span><select name="supplierId" defaultValue={suppliers[0]?.id}>{suppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.name}</option>)}</select></label>
          <div className="form-row two-up">
            <label><span>收货仓库</span><select name="warehouseId" defaultValue={warehouses[0]?.id}>{warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}</select></label>
            <label><span>采购状态</span><select name="status" defaultValue="approved"><option value="draft">draft</option><option value="approved">approved</option><option value="in_transit">in_transit</option><option value="delayed">delayed</option></select></label>
          </div>
          <div className="form-row two-up">
            <label><span>采购员</span><input name="buyer" placeholder="张琳" required /></label>
            <label><span>ETA</span><input name="eta" type="date" required /></label>
          </div>
          <label><span>金额（CNY）</span><input name="amountCny" type="number" min="1" defaultValue="120000" required /></label>
          <button className="primary-button" disabled={isPending} type="submit">生成采购订单</button>
          {orderState ? <p className={`form-message ${orderState.type}`}>{orderState.message}</p> : null}
        </form>
      </article>

      <article className="operation-card">
        <div className="operation-head">
          <p className="eyebrow">Receipt confirmation</p>
          <h3>执行到货入库</h3>
          <p className="muted">确认收货后会写入 receipt、更新库存，并在质检偏低时自动产生预警。</p>
        </div>
        <form className="erp-form" onSubmit={(event) => handleSubmit(event, '/api/supply-chain/receipts', setReceiptState, (formData) => ({ purchaseOrderId: formData.get('purchaseOrderId'), inventoryItemId: formData.get('inventoryItemId'), warehouseId: formData.get('warehouseId'), quantity: Number(formData.get('quantity')), qualityPassRate: Number(formData.get('qualityPassRate')), markOrderReceived: true }))}>
          <label><span>采购单</span><select name="purchaseOrderId" defaultValue={purchaseOrders[0]?.id}>{purchaseOrders.map((order) => <option key={order.id} value={order.id}>{order.id} · {order.buyer}</option>)}</select></label>
          <label><span>入库物料</span><select name="inventoryItemId" defaultValue={inventory[0]?.id}>{inventory.map((item) => <option key={item.id} value={item.id}>{item.sku} · {item.name}</option>)}</select></label>
          <label><span>收货仓库</span><select name="warehouseId" defaultValue={warehouses[0]?.id}>{warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}</select></label>
          <div className="form-row two-up">
            <label><span>收货数量</span><input name="quantity" type="number" min="1" defaultValue="100" required /></label>
            <label><span>质检合格率</span><input name="qualityPassRate" type="number" min="0" max="100" step="0.1" defaultValue="99.2" required /></label>
          </div>
          <button className="primary-button dark" disabled={isPending} type="submit">确认收货并更新库存</button>
          {receiptState ? <p className={`form-message ${receiptState.type}`}>{receiptState.message}</p> : null}
        </form>
      </article>
    </section>
  );
}
