export type ProductStatus = 'draft' | 'published' | 'archived';
export type CustomerTier = 'member' | 'silver' | 'gold' | 'platinum';
export type CustomerLifecycle = 'new' | 'active' | 'loyal' | 'vip' | 'sleeping';
export type OrderStatus = 'pending_payment' | 'paid' | 'completed' | 'cancelled' | 'refunding';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';
export type FulfillmentStatus = 'pending' | 'packed' | 'shipped' | 'delivered' | 'returned';
export type CampaignType = 'campaign' | 'coupon' | 'presale' | 'livestream';
export type CampaignStatus = 'planned' | 'running' | 'ended';
export type AfterSalesType = 'refund' | 'return' | 'exchange' | 'complaint';
export type AfterSalesStatus = 'created' | 'reviewing' | 'approved' | 'rejected' | 'closed';

export interface ProductCategory {
  id: string;
  name: string;
  parentId?: string | null;
  channel: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  spuCode: string;
  skuCode: string;
  name: string;
  categoryId: string;
  priceCents: number;
  marketPriceCents: number;
  status: ProductStatus;
  stockOnHand: number;
  salesVolume: number;
  channel: string;
  fulfillmentMode: string;
}

export interface Customer {
  id: string;
  name: string;
  tier: CustomerTier;
  phone: string;
  city: string;
  lifecycleStage: CustomerLifecycle;
  registeredAt: string;
  totalSpentCents: number;
}

export interface PromotionCampaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  budgetCents: number;
  startAt: string;
  endAt: string;
  owner: string;
}

export interface SalesOrder {
  id: string;
  customerId: string;
  productId: string;
  channel: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  quantity: number;
  orderAmountCents: number;
  createdAt: string;
}

export interface AfterSalesTicket {
  id: string;
  orderId: string;
  type: AfterSalesType;
  status: AfterSalesStatus;
  reason: string;
  createdAt: string;
}

export interface EcommerceOverview {
  kpis: {
    activeProducts: number;
    payingCustomers: number;
    grossMerchandiseValueCents: number;
    pendingOrders: number;
    runningCampaigns: number;
    afterSalesOpenTickets: number;
  };
  customerJourney: Array<{ stage: string; description: string; keySystems: string[] }>;
  architectureTracks: Array<{ title: string; points: string[] }>;
}

export interface CreateProductInput {
  name: string;
  categoryId: string;
  priceCents: number;
  marketPriceCents: number;
  status: ProductStatus;
  stockOnHand: number;
  channel: string;
  fulfillmentMode: string;
}

export interface CreateCustomerInput {
  name: string;
  tier: CustomerTier;
  phone: string;
  city: string;
  lifecycleStage: CustomerLifecycle;
}

export interface CreateSalesOrderInput {
  customerId: string;
  productId: string;
  channel: string;
  quantity: number;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  fulfillmentStatus: FulfillmentStatus;
}
