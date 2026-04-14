import { executeRun, getD1Database, queryAll, requireD1Database } from '@/lib/supply-chain/d1';
import { ecommerceSeed } from './data';
import type {
  AddCartItemInput,
  AfterSalesTicket,
  CampaignStatus,
  CartItem,
  CreateAfterSalesInput,
  CreateCustomerInput,
  CreateProductInput,
  CreateSalesOrderInput,
  Customer,
  EcommerceOverview,
  PaymentMethod,
  PaymentRecord,
  PaymentRecordStatus,
  Product,
  ProductCategory,
  PromotionCampaign,
  SalesOrder,
  ShipmentRecord,
  ShipmentStatus,
  UpdateOrderLifecycleInput,
  CheckoutCartInput,
} from './types';

type CategoryRow = { id: string; name: string; parent_id?: string | null; channel: string; sort_order: number };
type ProductRow = { id: string; spu_code: string; sku_code: string; name: string; category_id: string; price_cents: number; market_price_cents: number; status: Product['status']; stock_on_hand: number; sales_volume: number; channel: string; fulfillment_mode: string };
type CustomerRow = { id: string; name: string; tier: Customer['tier']; phone: string; city: string; lifecycle_stage: Customer['lifecycleStage']; registered_at: string; total_spent_cents: number };
type CampaignRow = { id: string; name: string; type: PromotionCampaign['type']; status: CampaignStatus; budget_cents: number; start_at: string; end_at: string; owner: string };
type OrderRow = { id: string; customer_id: string; product_id: string; channel: string; status: SalesOrder['status']; payment_status: SalesOrder['paymentStatus']; fulfillment_status: SalesOrder['fulfillmentStatus']; quantity: number; order_amount_cents: number; created_at: string };
type AfterSalesRow = { id: string; order_id: string; type: AfterSalesTicket['type']; status: AfterSalesTicket['status']; reason: string; created_at: string };
type CartRow = { id: string; customer_id: string; product_id: string; channel: string; quantity: number; selected: number; created_at: string };
type PaymentRow = { id: string; order_id: string; method: PaymentMethod; amount_cents: number; status: PaymentRecordStatus; paid_at?: string | null };
type ShipmentRow = { id: string; order_id: string; warehouse_code: string; carrier: string; tracking_no: string; status: ShipmentStatus; shipped_at?: string | null; delivered_at?: string | null };

export async function getCategories(): Promise<ProductCategory[]> {
  const db = await getD1Database();
  if (!db) return ecommerceSeed.categories;
  return (await queryAll<CategoryRow>(db, 'SELECT * FROM product_categories ORDER BY sort_order, id')).map((row) => ({ id: row.id, name: row.name, parentId: row.parent_id ?? null, channel: row.channel, sortOrder: row.sort_order }));
}

export async function getProducts(): Promise<Product[]> {
  const db = await getD1Database();
  if (!db) return ecommerceSeed.products;
  return (await queryAll<ProductRow>(db, 'SELECT * FROM products ORDER BY sales_volume DESC, id')).map(mapProductRow);
}

export async function getCustomers(): Promise<Customer[]> {
  const db = await getD1Database();
  if (!db) return ecommerceSeed.customers;
  return (await queryAll<CustomerRow>(db, 'SELECT * FROM customers ORDER BY total_spent_cents DESC, id')).map(mapCustomerRow);
}

export async function getCampaigns(): Promise<PromotionCampaign[]> {
  const db = await getD1Database();
  if (!db) return ecommerceSeed.campaigns;
  return (await queryAll<CampaignRow>(db, 'SELECT * FROM promotion_campaigns ORDER BY start_at DESC, id')).map((row) => ({ id: row.id, name: row.name, type: row.type, status: row.status, budgetCents: row.budget_cents, startAt: row.start_at, endAt: row.end_at, owner: row.owner }));
}

export async function getSalesOrders(): Promise<SalesOrder[]> {
  const db = await getD1Database();
  if (!db) return ecommerceSeed.orders;
  return (await queryAll<OrderRow>(db, 'SELECT * FROM sales_orders ORDER BY created_at DESC, id')).map(mapOrderRow);
}

export async function getAfterSalesTickets(): Promise<AfterSalesTicket[]> {
  const db = await getD1Database();
  if (!db) return ecommerceSeed.afterSales;
  return (await queryAll<AfterSalesRow>(db, 'SELECT * FROM after_sales_tickets ORDER BY created_at DESC, id')).map((row) => ({ id: row.id, orderId: row.order_id, type: row.type, status: row.status, reason: row.reason, createdAt: row.created_at }));
}

export async function getCartItems(): Promise<CartItem[]> {
  const db = await getD1Database();
  if (!db) return ecommerceSeed.cartItems;
  return (await queryAll<CartRow>(db, 'SELECT * FROM cart_items ORDER BY created_at DESC, id')).map((row) => ({ id: row.id, customerId: row.customer_id, productId: row.product_id, channel: row.channel, quantity: row.quantity, selected: row.selected === 1, createdAt: row.created_at }));
}

export async function getPaymentRecords(): Promise<PaymentRecord[]> {
  const db = await getD1Database();
  if (!db) return ecommerceSeed.payments;
  return (await queryAll<PaymentRow>(db, 'SELECT * FROM payment_records ORDER BY COALESCE(paid_at, id) DESC, id')).map((row) => ({ id: row.id, orderId: row.order_id, method: row.method, amountCents: row.amount_cents, status: row.status, paidAt: row.paid_at ?? null }));
}

export async function getShipmentRecords(): Promise<ShipmentRecord[]> {
  const db = await getD1Database();
  if (!db) return ecommerceSeed.shipments;
  return (await queryAll<ShipmentRow>(db, 'SELECT * FROM shipment_records ORDER BY COALESCE(shipped_at, id) DESC, id')).map((row) => ({ id: row.id, orderId: row.order_id, warehouseCode: row.warehouse_code, carrier: row.carrier, trackingNo: row.tracking_no, status: row.status, shippedAt: row.shipped_at ?? null, deliveredAt: row.delivered_at ?? null }));
}

export async function getEcommerceOverview(): Promise<EcommerceOverview> {
  const [products, customers, campaigns, orders, afterSales] = await Promise.all([
    getProducts(), getCustomers(), getCampaigns(), getSalesOrders(), getAfterSalesTickets(),
  ]);
  return {
    kpis: {
      activeProducts: products.filter((item) => item.status === 'published').length,
      payingCustomers: customers.filter((item) => item.totalSpentCents > 0).length,
      grossMerchandiseValueCents: orders.filter((item) => item.paymentStatus === 'paid').reduce((sum, item) => sum + item.orderAmountCents, 0),
      pendingOrders: orders.filter((item) => item.paymentStatus === 'unpaid' || item.fulfillmentStatus === 'pending').length,
      runningCampaigns: campaigns.filter((item) => item.status === 'running').length,
      afterSalesOpenTickets: afterSales.filter((item) => item.status !== 'closed').length,
    },
    customerJourney: ecommerceSeed.overview.customerJourney,
    architectureTracks: ecommerceSeed.overview.architectureTracks,
  };
}

export async function createProduct(input: CreateProductInput): Promise<Product> {
  const db = await requireD1Database();
  const id = createBusinessId('PRD');
  const spu = createBusinessId('SPU');
  const sku = createBusinessId('SKU');
  await executeRun(db, 'INSERT INTO products (id, spu_code, sku_code, name, category_id, price_cents, market_price_cents, status, stock_on_hand, sales_volume, channel, fulfillment_mode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)', id, spu, sku, input.name.trim(), input.categoryId, input.priceCents, input.marketPriceCents, input.status, input.stockOnHand, input.channel, input.fulfillmentMode);
  return { id, spuCode: spu, skuCode: sku, name: input.name.trim(), categoryId: input.categoryId, priceCents: input.priceCents, marketPriceCents: input.marketPriceCents, status: input.status, stockOnHand: input.stockOnHand, salesVolume: 0, channel: input.channel, fulfillmentMode: input.fulfillmentMode };
}

export async function createCustomer(input: CreateCustomerInput): Promise<Customer> {
  const db = await requireD1Database();
  const id = createBusinessId('CUS');
  const registeredAt = new Date().toISOString();
  await executeRun(db, 'INSERT INTO customers (id, name, tier, phone, city, lifecycle_stage, registered_at, total_spent_cents) VALUES (?, ?, ?, ?, ?, ?, ?, 0)', id, input.name.trim(), input.tier, input.phone.trim(), input.city.trim(), input.lifecycleStage, registeredAt);
  return { id, name: input.name.trim(), tier: input.tier, phone: input.phone.trim(), city: input.city.trim(), lifecycleStage: input.lifecycleStage, registeredAt, totalSpentCents: 0 };
}

export async function createSalesOrder(input: CreateSalesOrderInput): Promise<SalesOrder> {
  const db = await requireD1Database();
  const products = await getProducts();
  const product = products.find((item) => item.id === input.productId);
  if (!product) throw new Error('商品不存在');
  if (product.stockOnHand < input.quantity) throw new Error('库存不足');
  const id = createBusinessId('ORD');
  const createdAt = new Date().toISOString();
  const orderAmountCents = product.priceCents * input.quantity;
  await executeRun(db, 'INSERT INTO sales_orders (id, customer_id, product_id, channel, status, payment_status, fulfillment_status, quantity, order_amount_cents, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', id, input.customerId, input.productId, input.channel, input.status, input.paymentStatus, input.fulfillmentStatus, input.quantity, orderAmountCents, createdAt);
  await executeRun(db, 'UPDATE products SET stock_on_hand = stock_on_hand - ?, sales_volume = sales_volume + ? WHERE id = ?', input.quantity, input.quantity, input.productId);
  if (input.paymentStatus === 'paid') {
    await executeRun(db, 'UPDATE customers SET total_spent_cents = total_spent_cents + ? WHERE id = ?', orderAmountCents, input.customerId);
  }
  return { id, customerId: input.customerId, productId: input.productId, channel: input.channel, status: input.status, paymentStatus: input.paymentStatus, fulfillmentStatus: input.fulfillmentStatus, quantity: input.quantity, orderAmountCents, createdAt };
}

export async function addCartItem(input: AddCartItemInput): Promise<CartItem> {
  const db = await requireD1Database();
  const id = createBusinessId('CRT');
  const createdAt = new Date().toISOString();
  await executeRun(db, 'INSERT INTO cart_items (id, customer_id, product_id, channel, quantity, selected, created_at) VALUES (?, ?, ?, ?, ?, 1, ?)', id, input.customerId, input.productId, input.channel, input.quantity, createdAt);
  return { id, customerId: input.customerId, productId: input.productId, channel: input.channel, quantity: input.quantity, selected: true, createdAt };
}

export async function checkoutCart(input: CheckoutCartInput): Promise<{ order: SalesOrder; payment: PaymentRecord }> {
  const db = await requireD1Database();
  const cartItems = (await getCartItems()).filter((item) => item.customerId === input.customerId && item.selected);
  const item = cartItems[0];
  if (!item) throw new Error('购物车为空，无法结算');
  const order = await createSalesOrder({
    customerId: input.customerId,
    productId: item.productId,
    channel: input.channel,
    quantity: item.quantity,
    paymentStatus: 'paid',
    status: 'paid',
    fulfillmentStatus: 'packed',
  });
  const paymentId = createBusinessId('PAY');
  const paidAt = new Date().toISOString();
  await executeRun(db, 'INSERT INTO payment_records (id, order_id, method, amount_cents, status, paid_at) VALUES (?, ?, ?, ?, ?, ?)', paymentId, order.id, input.paymentMethod, order.orderAmountCents, 'paid', paidAt);
  await executeRun(db, 'DELETE FROM cart_items WHERE id = ?', item.id);
  return {
    order,
    payment: { id: paymentId, orderId: order.id, method: input.paymentMethod, amountCents: order.orderAmountCents, status: 'paid', paidAt },
  };
}

export async function updateOrderLifecycle(input: UpdateOrderLifecycleInput): Promise<SalesOrder> {
  const db = await requireD1Database();
  await executeRun(db, 'UPDATE sales_orders SET status = ?, payment_status = ?, fulfillment_status = ? WHERE id = ?', input.status, input.paymentStatus, input.fulfillmentStatus, input.orderId);
  if (input.fulfillmentStatus === 'shipped') {
    const existing = (await getShipmentRecords()).find((item) => item.orderId === input.orderId);
    if (!existing) {
      await executeRun(db, 'INSERT INTO shipment_records (id, order_id, warehouse_code, carrier, tracking_no, status, shipped_at, delivered_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', createBusinessId('SHP'), input.orderId, 'ECOM-WH-01', '顺丰', createTrackingNo(), 'shipped', new Date().toISOString(), null);
    }
  }
  const order = (await getSalesOrders()).find((item) => item.id === input.orderId);
  if (!order) throw new Error('订单不存在');
  return order;
}

export async function createAfterSalesTicket(input: CreateAfterSalesInput): Promise<AfterSalesTicket> {
  const db = await requireD1Database();
  const id = createBusinessId('AFT');
  const createdAt = new Date().toISOString();
  await executeRun(db, 'INSERT INTO after_sales_tickets (id, order_id, type, status, reason, created_at) VALUES (?, ?, ?, ?, ?, ?)', id, input.orderId, input.type, 'created', input.reason.trim(), createdAt);
  await executeRun(db, 'UPDATE sales_orders SET status = ? WHERE id = ?', 'refunding', input.orderId);
  return { id, orderId: input.orderId, type: input.type, status: 'created', reason: input.reason.trim(), createdAt };
}

function mapProductRow(row: ProductRow): Product {
  return { id: row.id, spuCode: row.spu_code, skuCode: row.sku_code, name: row.name, categoryId: row.category_id, priceCents: row.price_cents, marketPriceCents: row.market_price_cents, status: row.status, stockOnHand: row.stock_on_hand, salesVolume: row.sales_volume, channel: row.channel, fulfillmentMode: row.fulfillment_mode };
}

function mapCustomerRow(row: CustomerRow): Customer {
  return { id: row.id, name: row.name, tier: row.tier, phone: row.phone, city: row.city, lifecycleStage: row.lifecycle_stage, registeredAt: row.registered_at, totalSpentCents: row.total_spent_cents };
}

function mapOrderRow(row: OrderRow): SalesOrder {
  return { id: row.id, customerId: row.customer_id, productId: row.product_id, channel: row.channel, status: row.status, paymentStatus: row.payment_status, fulfillmentStatus: row.fulfillment_status, quantity: row.quantity, orderAmountCents: row.order_amount_cents, createdAt: row.created_at };
}

function createBusinessId(prefix: string) {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 12);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${random}`;
}

function createTrackingNo() {
  return `SF${Date.now()}`;
}
