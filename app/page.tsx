import { KpiCard } from '@/components/supply-chain/KpiCard';
import { SectionCard } from '@/components/supply-chain/SectionCard';
import { AppShell } from '@/components/layout/AppShell';
import { EcommerceWorkbench } from '@/components/ecommerce/EcommerceWorkbench';
import {
  getAfterSalesTickets,
  getCampaigns,
  getCategories,
  getCustomers,
  getEcommerceOverview,
  getProducts,
  getSalesOrders,
} from '@/lib/ecommerce/service';

export const dynamic = 'force-dynamic';

function formatCurrency(valueCents: number) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    maximumFractionDigits: 0,
  }).format(valueCents / 100);
}

export default async function Page() {
  const [overview, categories, products, customers, orders, campaigns, afterSales] = await Promise.all([
    getEcommerceOverview(),
    getCategories(),
    getProducts(),
    getCustomers(),
    getSalesOrders(),
    getCampaigns(),
    getAfterSalesTickets(),
  ]);

  return (
    <AppShell>
      <div className="page-grid">
        <section className="hero panel hero-light">
          <div>
            <p className="eyebrow">Professional ecommerce architecture workbench</p>
            <h3>把前台商城、交易履约、中后台运营、数据架构和技术架构都拉进同一个可学习、可演示、可落库的电商平台工作台。</h3>
            <p className="muted">
              当前版本已经把业务重心切换为电商系统，并开始接入真实 D1 业务动作：新增商品、沉淀顾客档案、模拟前台下单。这个仓库现在更适合做产品架构和技术架构学习样本。
            </p>
          </div>
          <div className="hero-badges">
            <span>Storefront</span>
            <span>Admin</span>
            <span>Transaction</span>
            <span>Fulfillment</span>
            <span>CRM</span>
            <span>Data architecture</span>
          </div>
        </section>

        <section className="kpi-grid">
          <KpiCard label="已上架商品" value={String(overview.kpis.activeProducts)} hint="商品中心 / 类目 / 价格 / 库存" />
          <KpiCard label="付费顾客" value={String(overview.kpis.payingCustomers)} hint="会员中心 / 生命周期运营" />
          <KpiCard label="GMV" value={formatCurrency(overview.kpis.grossMerchandiseValueCents)} hint="交易中心核心经营指标" />
          <KpiCard label="待推进订单" value={String(overview.kpis.pendingOrders)} hint="支付、履约、售后协同" />
          <KpiCard label="进行中营销活动" value={String(overview.kpis.runningCampaigns)} hint="促销 / 券包 / 预售 / 会场" />
          <KpiCard label="开放售后工单" value={String(overview.kpis.afterSalesOpenTickets)} hint="退款 / 退货 / 换货 / 投诉" />
        </section>

        <div className="two-column-grid wide-left">
          <SectionCard title="电商业务点总览" description="前台 + 中后台 + 架构学习点，尽量按专业平台来拆。">
            <div className="roadmap-grid dense-grid">
              <article className="roadmap-item"><strong>前台商城</strong><p className="muted">首页、频道、搜索、推荐、商品详情、购物车、结算、支付、订单查询。</p></article>
              <article className="roadmap-item"><strong>商品中心</strong><p className="muted">类目、品牌、属性、SPU/SKU、上下架、价格、库存、组合售卖。</p></article>
              <article className="roadmap-item"><strong>交易中心</strong><p className="muted">下单、支付、拆单、风控、发票、对账、取消、退款、逆向单。</p></article>
              <article className="roadmap-item"><strong>营销中心</strong><p className="muted">优惠券、满减、秒杀、预售、会员价、直播会场、A/B 与投放归因。</p></article>
              <article className="roadmap-item"><strong>会员 CRM</strong><p className="muted">用户分层、生命周期、积分、权益、标签、人群包与召回。</p></article>
              <article className="roadmap-item"><strong>履约中心</strong><p className="muted">OMS、WMS、TMS、门店自提、逆向物流、时效与异常协同。</p></article>
              <article className="roadmap-item"><strong>客服售后</strong><p className="muted">退款、退货、换货、质检、赔付、投诉闭环。</p></article>
              <article className="roadmap-item"><strong>数据中台</strong><p className="muted">GMV、转化率、复购率、退款率、履约时效、广告 ROI、客群分析。</p></article>
            </div>
          </SectionCard>

          <SectionCard title="技术架构 / 产品架构学习轨道" description="这个仓库现在不仅是页面，而是一个可以讲架构的方法论工作台。">
            <div className="stack-list">
              {overview.architectureTracks.map((track) => (
                <article className="stack-item vertical" key={track.title}>
                  <div>
                    <strong>{track.title}</strong>
                    <ul className="bullet-list">
                      {track.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </SectionCard>
        </div>

        <SectionCard title="顾客旅程与平台能力映射" description="把产品视角和系统视角放在一张图里。">
          <div className="journey-grid">
            {overview.customerJourney.map((item) => (
              <article key={item.stage} className="journey-card">
                <p className="eyebrow">{item.stage}</p>
                <strong>{item.description}</strong>
                <p className="muted">关键系统：{item.keySystems.join(' / ')}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <section id="operations" className="panel spotlight-panel">
          <div className="section-header">
            <div>
              <h3>电商业务操作台</h3>
              <p className="muted">这里开始做真实后台动作：商品、顾客、订单都可以写入 D1，已经不只是展示层。</p>
            </div>
          </div>
          <EcommerceWorkbench categories={categories} products={products} customers={customers} />
        </section>

        <div className="two-column-grid">
          <SectionCard title="商品矩阵" description="商品中心是所有电商系统的起点。">
            <table className="data-table">
              <thead><tr><th>SKU</th><th>商品</th><th>渠道</th><th>状态</th><th>库存</th><th>销量</th><th>售价</th></tr></thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.skuCode}</td>
                    <td>{product.name}</td>
                    <td>{product.channel}</td>
                    <td><span className={`tag ${product.status}`}>{product.status}</span></td>
                    <td>{product.stockOnHand}</td>
                    <td>{product.salesVolume}</td>
                    <td>{formatCurrency(product.priceCents)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>

          <SectionCard title="顾客分层" description="会员等级、生命周期和累计消费构成 CRM 经营底盘。">
            <table className="data-table">
              <thead><tr><th>顾客</th><th>等级</th><th>生命周期</th><th>城市</th><th>累计消费</th></tr></thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td><span className={`tag ${customer.tier}`}>{customer.tier}</span></td>
                    <td>{customer.lifecycleStage}</td>
                    <td>{customer.city}</td>
                    <td>{formatCurrency(customer.totalSpentCents)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>
        </div>

        <div className="two-column-grid wide-left">
          <SectionCard title="订单中心" description="前台下单后，后台要推进支付、履约和售后。">
            <table className="data-table">
              <thead><tr><th>订单号</th><th>渠道</th><th>订单状态</th><th>支付状态</th><th>履约状态</th><th>金额</th></tr></thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.channel}</td>
                    <td><span className={`tag ${order.status}`}>{order.status}</span></td>
                    <td>{order.paymentStatus}</td>
                    <td>{order.fulfillmentStatus}</td>
                    <td>{formatCurrency(order.orderAmountCents)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>

          <div className="stack-panels">
            <SectionCard title="营销活动" description="活动不是页面皮肤，而是价格与人群的规则系统。">
              <div className="stack-list compact">
                {campaigns.map((campaign) => (
                  <article key={campaign.id} className="stack-item vertical compact-card">
                    <strong>{campaign.name}</strong>
                    <p className="muted">{campaign.type} · {campaign.owner}</p>
                    <div className="metric-pair left"><span>{campaign.status}</span><span>预算 {formatCurrency(campaign.budgetCents)}</span></div>
                  </article>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="售后工单" description="退款、换货、投诉是电商平台不可回避的长期战场。">
              <div className="stack-list compact">
                {afterSales.map((ticket) => (
                  <article key={ticket.id} className="stack-item vertical compact-card">
                    <strong>{ticket.orderId}</strong>
                    <p className="muted">{ticket.type} · {ticket.status}</p>
                    <p>{ticket.reason}</p>
                  </article>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
