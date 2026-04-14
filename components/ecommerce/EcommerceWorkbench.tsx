'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { CreateCustomerInput, CreateProductInput, CreateSalesOrderInput, Customer, Product, ProductCategory } from '@/lib/ecommerce/types';

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

export function EcommerceWorkbench({
  categories,
  products,
  customers,
}: {
  categories: ProductCategory[];
  products: Product[];
  customers: Customer[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [productState, setProductState] = useState<FormState>(null);
  const [customerState, setCustomerState] = useState<FormState>(null);
  const [orderState, setOrderState] = useState<FormState>(null);

  function handleSubmit<T extends HTMLFormElement>(
    event: React.FormEvent<T>,
    url: string,
    setState: (state: FormState) => void,
    transform: (formData: FormData) => Record<string, unknown>,
  ) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    startTransition(async () => {
      try {
        await postJson(url, transform(formData));
        form.reset();
        setState({ type: 'success', message: 'D1 已更新，页面已刷新。' });
        router.refresh();
      } catch (error) {
        setState({ type: 'error', message: error instanceof Error ? error.message : '提交失败' });
      }
    });
  }

  return (
    <section className="operation-grid ecommerce-grid">
      <article className="operation-card">
        <div className="operation-head">
          <p className="eyebrow">Catalog backend</p>
          <h3>新增商品 SKU</h3>
          <p className="muted">专业电商平台首先是商品中心，SPU/SKU、类目、价格、库存和履约模式都要落库。</p>
        </div>
        <form
          className="erp-form"
          onSubmit={(event) =>
            handleSubmit(event, '/api/ecommerce/products', setProductState, (formData) => ({
              name: String(formData.get('name') ?? ''),
              categoryId: String(formData.get('categoryId') ?? ''),
              priceCents: Number(formData.get('priceCents')),
              marketPriceCents: Number(formData.get('marketPriceCents')),
              status: String(formData.get('status') ?? '') as CreateProductInput['status'],
              stockOnHand: Number(formData.get('stockOnHand')),
              channel: String(formData.get('channel') ?? ''),
              fulfillmentMode: String(formData.get('fulfillmentMode') ?? ''),
            } satisfies CreateProductInput))
          }
        >
          <label><span>商品名称</span><input name="name" placeholder="Aurora Watch 42mm" required /></label>
          <label><span>所属类目</span><select name="categoryId" defaultValue={categories[0]?.id}>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
          <div className="form-row two-up">
            <label><span>售价（分）</span><input name="priceCents" type="number" min="1" defaultValue="199900" required /></label>
            <label><span>划线价（分）</span><input name="marketPriceCents" type="number" min="1" defaultValue="229900" required /></label>
          </div>
          <div className="form-row two-up">
            <label><span>状态</span><select name="status" defaultValue="published"><option value="draft">draft</option><option value="published">published</option><option value="archived">archived</option></select></label>
            <label><span>库存</span><input name="stockOnHand" type="number" min="0" defaultValue="80" required /></label>
          </div>
          <div className="form-row two-up">
            <label><span>渠道</span><select name="channel" defaultValue="app"><option value="app">app</option><option value="miniapp">miniapp</option><option value="h5">h5</option></select></label>
            <label><span>履约模式</span><select name="fulfillmentMode" defaultValue="warehouse"><option value="warehouse">warehouse</option><option value="merchant">merchant</option><option value="store">store</option></select></label>
          </div>
          <button className="primary-button" type="submit" disabled={isPending}>写入商品中心</button>
          {productState ? <p className={`form-message ${productState.type}`}>{productState.message}</p> : null}
        </form>
      </article>

      <article className="operation-card">
        <div className="operation-head">
          <p className="eyebrow">CRM backend</p>
          <h3>新增顾客档案</h3>
          <p className="muted">会员体系不是附属功能，而是电商平台复购和生命周期经营的基础资产。</p>
        </div>
        <form
          className="erp-form"
          onSubmit={(event) =>
            handleSubmit(event, '/api/ecommerce/customers', setCustomerState, (formData) => ({
              name: String(formData.get('name') ?? ''),
              tier: String(formData.get('tier') ?? '') as CreateCustomerInput['tier'],
              phone: String(formData.get('phone') ?? ''),
              city: String(formData.get('city') ?? ''),
              lifecycleStage: String(formData.get('lifecycleStage') ?? '') as CreateCustomerInput['lifecycleStage'],
            } satisfies CreateCustomerInput))
          }
        >
          <label><span>顾客姓名</span><input name="name" placeholder="李青禾" required /></label>
          <div className="form-row two-up">
            <label><span>会员等级</span><select name="tier" defaultValue="member"><option value="member">member</option><option value="silver">silver</option><option value="gold">gold</option><option value="platinum">platinum</option></select></label>
            <label><span>生命周期</span><select name="lifecycleStage" defaultValue="new"><option value="new">new</option><option value="active">active</option><option value="loyal">loyal</option><option value="vip">vip</option><option value="sleeping">sleeping</option></select></label>
          </div>
          <div className="form-row two-up">
            <label><span>手机号</span><input name="phone" placeholder="13900005555" required /></label>
            <label><span>城市</span><input name="city" placeholder="北京" required /></label>
          </div>
          <button className="primary-button dark" type="submit" disabled={isPending}>写入会员中心</button>
          {customerState ? <p className={`form-message ${customerState.type}`}>{customerState.message}</p> : null}
        </form>
      </article>

      <article className="operation-card wide-card">
        <div className="operation-head">
          <p className="eyebrow">Order backend</p>
          <h3>模拟前台下单</h3>
          <p className="muted">这里把前台购买动作真正推进到订单中心：下单后会写 sales order、扣减库存、累计会员消费额。</p>
        </div>
        <form
          className="erp-form"
          onSubmit={(event) =>
            handleSubmit(event, '/api/ecommerce/orders', setOrderState, (formData) => ({
              customerId: String(formData.get('customerId') ?? ''),
              productId: String(formData.get('productId') ?? ''),
              channel: String(formData.get('channel') ?? ''),
              quantity: Number(formData.get('quantity')),
              paymentStatus: String(formData.get('paymentStatus') ?? '') as CreateSalesOrderInput['paymentStatus'],
              status: String(formData.get('status') ?? '') as CreateSalesOrderInput['status'],
              fulfillmentStatus: String(formData.get('fulfillmentStatus') ?? '') as CreateSalesOrderInput['fulfillmentStatus'],
            } satisfies CreateSalesOrderInput))
          }
        >
          <div className="form-row three-up">
            <label><span>顾客</span><select name="customerId" defaultValue={customers[0]?.id}>{customers.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.tier}</option>)}</select></label>
            <label><span>商品</span><select name="productId" defaultValue={products[0]?.id}>{products.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <label><span>下单渠道</span><select name="channel" defaultValue="app"><option value="app">app</option><option value="miniapp">miniapp</option><option value="h5">h5</option><option value="store">store</option></select></label>
          </div>
          <div className="form-row three-up">
            <label><span>数量</span><input name="quantity" type="number" min="1" defaultValue="1" required /></label>
            <label><span>支付状态</span><select name="paymentStatus" defaultValue="paid"><option value="unpaid">unpaid</option><option value="paid">paid</option><option value="refunded">refunded</option></select></label>
            <label><span>订单状态</span><select name="status" defaultValue="paid"><option value="pending_payment">pending_payment</option><option value="paid">paid</option><option value="completed">completed</option><option value="cancelled">cancelled</option><option value="refunding">refunding</option></select></label>
          </div>
          <label><span>履约状态</span><select name="fulfillmentStatus" defaultValue="packed"><option value="pending">pending</option><option value="packed">packed</option><option value="shipped">shipped</option><option value="delivered">delivered</option><option value="returned">returned</option></select></label>
          <button className="primary-button" type="submit" disabled={isPending}>写入订单中心并扣减库存</button>
          {orderState ? <p className={`form-message ${orderState.type}`}>{orderState.message}</p> : null}
        </form>
      </article>
    </section>
  );
}
