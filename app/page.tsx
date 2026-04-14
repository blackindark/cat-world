import { KpiCard } from '@/components/supply-chain/KpiCard';
import { SectionCard } from '@/components/supply-chain/SectionCard';
import { SupplyChainWorkbench } from '@/components/supply-chain/SupplyChainWorkbench';
import { AppShell } from '@/components/layout/AppShell';
import {
  getInventory,
  getPurchaseOrders,
  getReceipts,
  getSuppliers,
  getSupplyChainOverview,
  getWarehouses,
} from '@/lib/supply-chain/service';

export const dynamic = 'force-dynamic';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function Page() {
  const [overview, suppliers, warehouses, inventory, purchaseOrders, receipts] = await Promise.all([
    getSupplyChainOverview(),
    getSuppliers(),
    getWarehouses(),
    getInventory(),
    getPurchaseOrders(),
    getReceipts(),
  ]);

  return (
    <AppShell>
      <div className="page-grid">
        <section className="hero panel hero-light">
          <div>
            <p className="eyebrow">Supply chain ERP</p>
            <h3>从好看的页面，推进到真正能录入供应商、下采购单、确认收货入库的业务工作台。</h3>
            <p className="muted">
              当前系统已经切换到更接近 mac / Apple 的轻量设计语言，同时把三类业务动作接进了 D1：供应商主数据、采购单创建、到货入库。
            </p>
          </div>
          <div className="hero-badges">
            <span>Supplier master</span>
            <span>Purchase orders</span>
            <span>Goods receipt</span>
            <span>D1 persistence</span>
          </div>
        </section>

        <section className="kpi-grid">
          <KpiCard label="活跃供应商" value={String(overview.kpis.activeSuppliers)} hint="核心与备选供应来源" />
          <KpiCard label="未完结采购单" value={String(overview.kpis.openPurchaseOrders)} hint="审批、在途、异常全覆盖" />
          <KpiCard label="现存库存总量" value={String(overview.kpis.inventoryUnits)} hint="跨仓汇总" />
          <KpiCard label="仓储平均利用率" value={`${overview.kpis.warehouseUtilization}%`} hint="监控扩容与调拨压力" />
          <KpiCard label="今日入库件数" value={String(overview.kpis.inboundToday)} hint="连接收货与质检" />
          <KpiCard label="异常告警" value={String(overview.kpis.alertCount)} hint="按严重等级升级处理" />
        </section>

        <section id="operations" className="panel spotlight-panel">
          <div className="section-header">
            <div>
              <h3>业务操作台</h3>
              <p className="muted">下面这三块已经不只是前端展示，而是实际写 D1 的业务动作。</p>
            </div>
          </div>
          <SupplyChainWorkbench suppliers={suppliers} warehouses={warehouses} inventory={inventory} purchaseOrders={purchaseOrders} />
        </section>

        <div className="two-column-grid">
          <SectionCard title="采购流程看板" description="从申请到在途再到异常闭环。">
            <div className="flow-grid">
              {overview.procurementFlow.map((item) => (
                <div key={item.stage} className="flow-item">
                  <p className="flow-stage">{item.stage}</p>
                  <strong>{item.count}</strong>
                  <p className="muted">{item.description}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="异常中心" description="收货质检偏低时也会自动形成预警。">
            <div className="alert-list">
              {overview.alerts.map((alert) => (
                <article key={alert.id} className={`alert-item ${alert.severity}`}>
                  <div>
                    <p className="alert-title">{alert.title}</p>
                    <p className="muted">负责人：{alert.owner}</p>
                  </div>
                  <p>{alert.action}</p>
                </article>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="two-column-grid">
          <SectionCard title="供应商矩阵" description="新增供应商后这里会立刻刷新。">
            <table className="data-table">
              <thead><tr><th>供应商</th><th>类别</th><th>区域</th><th>交期</th><th>准时率</th><th>状态</th></tr></thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.name}</td><td>{supplier.category}</td><td>{supplier.region}</td><td>{supplier.leadTimeDays} 天</td><td>{supplier.onTimeRate}%</td><td><span className={`tag ${supplier.status}`}>{supplier.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>

          <SectionCard title="库存风险清单" description="到货入库后这里的数据也会同步变化。">
            <div className="stack-list">
              {overview.inventoryRisks.map((item) => (
                <article key={item.id} className="stack-item">
                  <div><strong>{item.name}</strong><p className="muted">{item.sku} · {item.category}</p></div>
                  <div className="metric-pair"><span>现存 {item.onHand}</span><span>安全库存 {item.safetyStock}</span></div>
                </article>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="two-column-grid wide-left">
          <SectionCard title="采购订单" description="新建采购单后按创建时间倒序展示。">
            <table className="data-table">
              <thead><tr><th>PO</th><th>采购员</th><th>状态</th><th>ETA</th><th>金额</th></tr></thead>
              <tbody>
                {purchaseOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td><td>{order.buyer}</td><td><span className={`tag ${order.status}`}>{order.status}</span></td><td>{order.eta}</td><td>{formatCurrency(order.amountCny)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>

          <div className="stack-panels">
            <SectionCard title="仓储网络" description="仓位利用率与风险等级。">
              <div className="stack-list compact">
                {warehouses.map((warehouse) => (
                  <article key={warehouse.id} className="stack-item">
                    <div><strong>{warehouse.name}</strong><p className="muted">{warehouse.city} · 容量 {warehouse.capacityUnits}</p></div>
                    <div className="metric-pair"><span>{warehouse.utilizationRate}%</span><span className={`tag ${warehouse.riskLevel}`}>{warehouse.riskLevel}</span></div>
                  </article>
                ))}
              </div>
            </SectionCard>
            <SectionCard title="到货与质检" description="确认收货后会直接推进库存与告警。">
              <div className="stack-list compact">
                {receipts.map((receipt) => (
                  <article key={receipt.id} className="stack-item">
                    <div><strong>{receipt.purchaseOrderId}</strong><p className="muted">收货时间：{new Date(receipt.receivedAt).toLocaleString('zh-CN')}</p></div>
                    <div className="metric-pair"><span>{receipt.quantity} 件</span><span>合格率 {receipt.qualityPassRate}%</span></div>
                  </article>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        <SectionCard title="库存台账快照" description="现在页面真正读取 D1，并随着收货入库实时更新。">
          <table className="data-table">
            <thead><tr><th>SKU</th><th>品名</th><th>分类</th><th>现存</th><th>安全库存</th><th>周转天数</th></tr></thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}><td>{item.sku}</td><td>{item.name}</td><td>{item.category}</td><td>{item.onHand}</td><td>{item.safetyStock}</td><td>{item.turnoverDays}</td></tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
      </div>
    </AppShell>
  );
}
