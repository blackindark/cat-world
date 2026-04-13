import { KpiCard } from '@/components/supply-chain/KpiCard';
import { SectionCard } from '@/components/supply-chain/SectionCard';
import { AppShell } from '@/components/layout/AppShell';
import {
  getInventory,
  getPurchaseOrders,
  getReceipts,
  getSuppliers,
  getSupplyChainOverview,
  getWarehouses,
} from '@/lib/supply-chain/service';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Page() {
  const overview = getSupplyChainOverview();
  const suppliers = getSuppliers();
  const warehouses = getWarehouses();
  const inventory = getInventory();
  const purchaseOrders = getPurchaseOrders();
  const receipts = getReceipts();

  return (
    <AppShell>
      <div className="page-grid">
        <section className="hero panel">
          <div>
            <p className="eyebrow">Next.js full-stack ERP</p>
            <h3>把采购、仓储、库存、收货和异常处理收束到一个可演示的 ERP 原型里。</h3>
            <p className="muted">
              现在已经收敛成单个 Next.js 全栈项目：页面、API、内存数据层都在同一个工程里，方便直接部署到 Cloudflare。
            </p>
          </div>
          <div className="hero-badges">
            <span>采购协同</span>
            <span>库存风险</span>
            <span>仓储利用率</span>
            <span>到货质检</span>
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

          <SectionCard title="异常中心" description="先把供应链最痛的地方暴露出来。">
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
          <SectionCard title="供应商矩阵" description="优先保证交付稳定性与战略供应安全。">
            <table className="data-table">
              <thead>
                <tr>
                  <th>供应商</th>
                  <th>类别</th>
                  <th>区域</th>
                  <th>交期</th>
                  <th>准时率</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.name}</td>
                    <td>{supplier.category}</td>
                    <td>{supplier.region}</td>
                    <td>{supplier.leadTimeDays} 天</td>
                    <td>{supplier.onTimeRate}%</td>
                    <td><span className={`tag ${supplier.status}`}>{supplier.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>

          <SectionCard title="库存风险清单" description="用最少字段，先打出库存控制感。">
            <div className="stack-list">
              {overview.inventoryRisks.map((item) => (
                <article key={item.id} className="stack-item">
                  <div>
                    <strong>{item.name}</strong>
                    <p className="muted">{item.sku} · {item.category}</p>
                  </div>
                  <div className="metric-pair">
                    <span>现存 {item.onHand}</span>
                    <span>安全库存 {item.safetyStock}</span>
                  </div>
                </article>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="two-column-grid wide-left">
          <SectionCard title="采购订单" description="供应链系统第一批关键交易单据。">
            <table className="data-table">
              <thead>
                <tr>
                  <th>PO</th>
                  <th>采购员</th>
                  <th>状态</th>
                  <th>ETA</th>
                  <th>金额</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.buyer}</td>
                    <td><span className={`tag ${order.status}`}>{order.status}</span></td>
                    <td>{order.eta}</td>
                    <td>{formatCurrency(order.amountCny)}</td>
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
                    <div>
                      <strong>{warehouse.name}</strong>
                      <p className="muted">{warehouse.city} · 容量 {warehouse.capacityUnits}</p>
                    </div>
                    <div className="metric-pair">
                      <span>{warehouse.utilizationRate}%</span>
                      <span className={`tag ${warehouse.riskLevel}`}>{warehouse.riskLevel}</span>
                    </div>
                  </article>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="到货与质检" description="把收货环节做成可视化闭环。">
              <div className="stack-list compact">
                {receipts.map((receipt) => (
                  <article key={receipt.id} className="stack-item">
                    <div>
                      <strong>{receipt.purchaseOrderId}</strong>
                      <p className="muted">收货时间：{new Date(receipt.receivedAt).toLocaleString('zh-CN')}</p>
                    </div>
                    <div className="metric-pair">
                      <span>{receipt.quantity} 件</span>
                      <span>合格率 {receipt.qualityPassRate}%</span>
                    </div>
                  </article>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        <SectionCard title="库存台账快照" description="同一个 Next.js 项目里，页面和 API 共用内存领域模型。">
          <table className="data-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>品名</th>
                <th>分类</th>
                <th>现存</th>
                <th>安全库存</th>
                <th>周转天数</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.sku}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.onHand}</td>
                  <td>{item.safetyStock}</td>
                  <td>{item.turnoverDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="ERP 后续扩展" description="供应链打底后，后面的模块就顺了。">
          <div className="roadmap-grid">
            <article className="roadmap-item">
              <strong>采购结算</strong>
              <p className="muted">把 PO、收货、发票、应付三单匹配串起来。</p>
            </article>
            <article className="roadmap-item">
              <strong>制造执行</strong>
              <p className="muted">工单、BOM、齐套校验、产线节拍与异常停机。</p>
            </article>
            <article className="roadmap-item">
              <strong>质量追溯</strong>
              <p className="muted">来料检验、批次、缺陷闭环与召回链路。</p>
            </article>
            <article className="roadmap-item">
              <strong>主数据治理</strong>
              <p className="muted">物料、供应商、仓位、组织、计量单位统一治理。</p>
            </article>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
