'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type {
  AddCartItemInput,
  CreateAfterSalesInput,
  CreateCustomerInput,
  CreateProductInput,
  CheckoutCartInput,
  CreateSalesOrderInput,
  Customer,
  Product,
  ProductCategory,
  SalesOrder,
} from '@/lib/ecommerce/types';

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
  orders,
}: {
  categories: ProductCategory[];
  products: Product[];
  customers: Customer[];
  orders: SalesOrder[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [productState, setProductState] = useState<FormState>(null);
  const [customerState, setCustomerState] = useState<FormState>(null);
  const [orderState, setOrderState] = useState<FormState>(null);
  const [cartState, setCartState] = useState<FormState>(null);
  const [checkoutState, setCheckoutState] = useState<FormState>(null);
  const [lifecycleState, setLifecycleState] = useState<FormState>(null);
  const [afterSalesState, setAfterSalesState] = useState<FormState>(null);

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
          <p className="muted">商品中心是电商后台的起点：SPU/SKU、类目、价格、库存和履约模式都要入库。</p>
        </div>
        <form className="erp-form" onSubmit={(event) => handleSubmit(event, '/api/ecommerce/products', setProductState, (formData) => ({
          name: String(formData.get('name') ?? ''),
          categoryId: String(formData.get('categoryId') ?? ''),
          priceCents: Number(formData.get('priceCents')),
          marketPriceCents: Number(formData.get('marketPriceCents')),
          status: String(formData.get('status') ?? '') as CreateProductInput['status'],
          stockOnHand: Number(formData.get('stockOnHand')),
          channel: String(formData.get('channel') ?? ''),
          fulfillmentMode: String(formData.get('fulfillmentMode') ?? ''),
        } satisfies CreateProductInput))}>
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
          <p className="muted">会员体系是复购、召回、LTV 经营的基础资产。</p>
        </div>
        <form className="erp-form" onSubmit={(event) => handleSubmit(event, '/api/ecommerce/customers', setCustomerState, (formData) => ({
          name: String(formData.get('name') ?? ''),
          tier: String(formData.get('tier') ?? '') as CreateCustomerInput['tier'],
          phone: String(formData.get('phone') ?? ''),
          city: String(formData.get('city') ?? ''),
          lifecycleStage: String(formData.get('lifecycleStage') ?? '') as CreateCustomerInput['lifecycleStage'],
        } satisfies CreateCustomerInput))}>
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
          <p className="eyebrow">Storefront simulation</p>
          <h3>加入购物车</h3>
          <p className="muted">把前台商品浏览动作推进到购物车，形成真实交易前链路。</p>
        </div>
        <form className="erp-form" onSubmit={(event) => handleSubmit(event, '/api/ecommerce/cart', setCartState, (formData) => ({
          customerId: String(formData.get('customerId') ?? ''),
          productId: String(formData.get('productId') ?? ''),
          channel: String(formData.get('channel') ?? ''),
          quantity: Number(formData.get('quantity')),
        } satisfies AddCartItemInput))}>
          <div className="form-row three-up">
            <label><span>顾客</span><select name="customerId" defaultValue={customers[0]?.id}>{customers.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.tier}</option>)}</select></label>
            <label><span>商品</span><select name="productId" defaultValue={products[0]?.id}>{products.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <label><span>渠道</span><select name="channel" defaultValue="app"><option value="app">app</option><option value="miniapp">miniapp</option><option value="h5">h5</option><option value="store">store</option></select></label>
          </div>
          <label><span>数量</span><input name="quantity" type="number" min="1" defaultValue="1" required /></label>
          <button className="primary-button" type="submit" disabled={isPending}>加入购物车</button>
          {cartState ? <p className={`form-message ${cartState.type}`}>{cartState.message}</p> : null}
        </form>
      </article>

      <article className="operation-card wide-card">
        <div className="operation-head">
          <p className="eyebrow">Checkout</p>
          <h3>购物车结算</h3>
          <p className="muted">结算会从购物车生成订单与支付记录，并清理已结算购物车项。</p>
        </div>
        <form className="erp-form" onSubmit={(event) => handleSubmit(event, '/api/ecommerce/checkout', setCheckoutState, (formData) => ({
          customerId: String(formData.get('customerId') ?? ''),
          paymentMethod: String(formData.get('paymentMethod') ?? '') as CheckoutCartInput['paymentMethod'],
          channel: String(formData.get('channel') ?? ''),
        } satisfies CheckoutCartInput))}>
          <div className="form-row three-up">
            <label><span>顾客</span><select name="customerId" defaultValue={customers[0]?.id}>{customers.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.tier}</option>)}</select></label>
            <label><span>支付方式</span><select name="paymentMethod" defaultValue="alipay"><option value="alipay">alipay</option><option value="wechatpay">wechatpay</option><option value="card">card</option><option value="cod">cod</option></select></label>
            <label><span>结算渠道</span><select name="channel" defaultValue="app"><option value="app">app</option><option value="miniapp">miniapp</option><option value="h5">h5</option></select></label>
          </div>
          <button className="primary-button dark" type="submit" disabled={isPending}>购物车结算并生成支付记录</button>
          {checkoutState ? <p className={`form-message ${checkoutState.type}`}>{checkoutState.message}</p> : null}
        </form>
      </article>

      <article className="operation-card wide-card">
        <div className="operation-head">
          <p className="eyebrow">Order lifecycle</p>
          <h3>订单状态流转</h3>
          <p className="muted">模拟支付、履约、发货、签收等订单生命周期推进。</p>
        </div>
        <form className="erp-form" onSubmit={(event) => handleSubmit(event, '/api/ecommerce/orders/lifecycle', setLifecycleState, (formData) => ({
          orderId: String(formData.get('orderId') ?? ''),
          status: String(formData.get('status') ?? ''),
          paymentStatus: String(formData.get('paymentStatus') ?? ''),
          fulfillmentStatus: String(formData.get('fulfillmentStatus') ?? ''),
        }))}>
          <div className="form-row three-up">
            <label><span>订单</span><select name="orderId" defaultValue={orders[0]?.id}>{orders.map((item) => <option key={item.id} value={item.id}>{item.id} · {item.status}</option>)}</select></label>
            <label><span>订单状态</span><select name="status" defaultValue="paid"><option value="pending_payment">pending_payment</option><option value="paid">paid</option><option value="completed">completed</option><option value="cancelled">cancelled</option><option value="refunding">refunding</option></select></label>
            <label><span>支付状态</span><select name="paymentStatus" defaultValue="paid"><option value="unpaid">unpaid</option><option value="paid">paid</option><option value="refunded">refunded</option></select></label>
          </div>
          <label><span>履约状态</span><select name="fulfillmentStatus" defaultValue="shipped"><option value="pending">pending</option><option value="packed">packed</option><option value="shipped">shipped</option><option value="delivered">delivered</option><option value="returned">returned</option></select></label>
          <button className="primary-button" type="submit" disabled={isPending}>推进订单生命周期</button>
          {lifecycleState ? <p className={`form-message ${lifecycleState.type}`}>{lifecycleState.message}</p> : null}
        </form>
      </article>

      <article className="operation-card wide-card">
        <div className="operation-head">
          <p className="eyebrow">After-sales</p>
          <h3>发起售后工单</h3>
          <p className="muted">退款、退货、换货、投诉是电商平台不可回避的长期战场。</p>
        </div>
        <form className="erp-form" onSubmit={(event) => handleSubmit(event, '/api/ecommerce/after-sales', setAfterSalesState, (formData) => ({
          orderId: String(formData.get('orderId') ?? ''),
          type: String(formData.get('type') ?? '') as CreateAfterSalesInput['type'],
          reason: String(formData.get('reason') ?? ''),
        } satisfies CreateAfterSalesInput))}>
          <div className="form-row two-up">
            <label><span>订单</span><select name="orderId" defaultValue={orders[0]?.id}>{orders.map((item) => <option key={item.id} value={item.id}>{item.id}</option>)}</select></label>
            <label><span>售后类型</span><select name="type" defaultValue="refund"><option value="refund">refund</option><option value="return">return</option><option value="exchange">exchange</option><option value="complaint">complaint</option></select></label>
          </div>
          <label><span>售后原因</span><input name="reason" placeholder="例如：物流延迟，要求退款" required /></label>
          <button className="primary-button dark" type="submit" disabled={isPending}>创建售后工单</button>
          {afterSalesState ? <p className={`form-message ${afterSalesState.type}`}>{afterSalesState.message}</p> : null}
        </form>
      </article>
    </section>
  );
}
