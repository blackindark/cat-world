import type { AfterSalesTicket, Customer, EcommerceOverview, Product, ProductCategory, PromotionCampaign, SalesOrder } from './types';

export const ecommerceSeed = {
  categories: [
    { id: 'CAT-001', name: '手机数码', parentId: null, channel: 'app', sortOrder: 1 },
    { id: 'CAT-002', name: '家居生活', parentId: null, channel: 'app', sortOrder: 2 },
    { id: 'CAT-003', name: '会员专享', parentId: null, channel: 'miniapp', sortOrder: 3 },
  ] as ProductCategory[],
  products: [
    { id: 'PRD-001', spuCode: 'SPU-IP15', skuCode: 'SKU-IP15-128-BLK', name: 'Aurora Phone 15 128G 黑色', categoryId: 'CAT-001', priceCents: 599900, marketPriceCents: 679900, status: 'published', stockOnHand: 128, salesVolume: 5340, channel: 'app', fulfillmentMode: 'warehouse' },
    { id: 'PRD-002', spuCode: 'SPU-PAD11', skuCode: 'SKU-PAD11-256-SIL', name: 'NorthPad 11 256G 银色', categoryId: 'CAT-001', priceCents: 389900, marketPriceCents: 439900, status: 'published', stockOnHand: 86, salesVolume: 2810, channel: 'app', fulfillmentMode: 'warehouse' },
    { id: 'PRD-003', spuCode: 'SPU-COFFEE', skuCode: 'SKU-COFFEE-GIFT', name: '精品咖啡礼盒', categoryId: 'CAT-002', priceCents: 12900, marketPriceCents: 19900, status: 'published', stockOnHand: 520, salesVolume: 9120, channel: 'miniapp', fulfillmentMode: 'merchant' },
  ] as Product[],
  customers: [
    { id: 'CUS-001', name: '林然', tier: 'gold', phone: '13800001111', city: '上海', lifecycleStage: 'active', registeredAt: '2025-11-04T10:00:00.000Z', totalSpentCents: 1589900 },
    { id: 'CUS-002', name: '赵晴', tier: 'silver', phone: '13900002222', city: '杭州', lifecycleStage: 'loyal', registeredAt: '2025-12-12T14:00:00.000Z', totalSpentCents: 599900 },
    { id: 'CUS-003', name: '顾辰', tier: 'platinum', phone: '13700003333', city: '深圳', lifecycleStage: 'vip', registeredAt: '2025-10-01T09:00:00.000Z', totalSpentCents: 2889900 },
  ] as Customer[],
  campaigns: [
    { id: 'CAM-001', name: '春季焕新大促', type: 'campaign', status: 'running', budgetCents: 3000000, startAt: '2026-04-01T00:00:00.000Z', endAt: '2026-04-20T23:59:59.000Z', owner: '增长运营' },
    { id: 'CAM-002', name: 'Plus会员复购券包', type: 'coupon', status: 'running', budgetCents: 800000, startAt: '2026-04-05T00:00:00.000Z', endAt: '2026-04-30T23:59:59.000Z', owner: 'CRM运营' },
  ] as PromotionCampaign[],
  orders: [
    { id: 'ORD-001', customerId: 'CUS-001', productId: 'PRD-001', channel: 'app', status: 'paid', paymentStatus: 'paid', fulfillmentStatus: 'shipped', quantity: 1, orderAmountCents: 599900, createdAt: '2026-04-10T08:30:00.000Z' },
    { id: 'ORD-002', customerId: 'CUS-002', productId: 'PRD-003', channel: 'miniapp', status: 'completed', paymentStatus: 'paid', fulfillmentStatus: 'delivered', quantity: 2, orderAmountCents: 25800, createdAt: '2026-04-11T15:20:00.000Z' },
  ] as SalesOrder[],
  afterSales: [
    { id: 'AFT-001', orderId: 'ORD-001', type: 'refund', status: 'reviewing', reason: '用户申请差价补偿', createdAt: '2026-04-12T18:00:00.000Z' },
  ] as AfterSalesTicket[],
  overview: {
    kpis: {
      activeProducts: 3,
      payingCustomers: 3,
      grossMerchandiseValueCents: 625700,
      pendingOrders: 1,
      runningCampaigns: 2,
      afterSalesOpenTickets: 1,
    },
    customerJourney: [
      { stage: '流量获取', description: '广告投放、内容种草、直播与私域触达将用户拉入站内。', keySystems: ['投放归因', '内容中台', '活动中心'] },
      { stage: '浏览转化', description: '搜索、推荐、商品详情、购物车和结算共同承担转化效率。', keySystems: ['搜索推荐', '商品中心', '交易结算'] },
      { stage: '履约交付', description: '支付、OMS、WMS、配送与客服共同保证订单兑现。', keySystems: ['支付中心', 'OMS', 'WMS/TMS'] },
      { stage: '复购增长', description: '会员、CRM、券包、召回和售后服务驱动长期 LTV。', keySystems: ['会员中心', 'CRM', '售后中心'] },
    ],
    architectureTracks: [
      { title: '前台架构', points: ['首页/会场/搜索/推荐/详情/购物车/结算', '多端一致性：App / 小程序 / H5 / 门店导购', '活动与价格能力解耦，支撑大促和预售'] },
      { title: '中后台架构', points: ['商品中心、库存中心、订单中心、会员中心、营销中心、客服售后', 'OMS/WMS/支付/风控/财务对账拆分', '权限模型覆盖商家、平台运营、财务、客服、仓配'] },
      { title: '数据架构', points: ['ODS-DWD-DWS-ADS 全链路指标沉淀', 'GMV、转化率、退货率、履约时效、广告 ROI', '埋点 + 实时日志 + 离线数仓联合分析'] },
    ],
  } as EcommerceOverview,
};
