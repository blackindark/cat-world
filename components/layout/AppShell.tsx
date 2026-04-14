const roadmap = ['前台商城', '商品中心', '交易中心', '营销中心', '会员 CRM', '履约售后'];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">APPLE-LIKE ERP WORKBENCH</p>
          <h1>Northstar ERP</h1>
          <p className="muted">
            现在已经重构为电商架构学习工作台：前台商城、中后台、营销、订单、履约、售后与数据架构都放在同一个 Next.js + D1 项目里。
          </p>
        </div>

        <nav className="nav">
          <a href="#supply-chain" className="nav-link active">电商平台工作台</a>
          <a href="#operations" className="nav-link">后台操作台</a>
        </nav>

        <div className="roadmap-card">
          <p className="card-title">模块路线图</p>
          <ul>
            {roadmap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="content" id="supply-chain">
        <header className="topbar">
          <div>
            <p className="eyebrow">Single project / Cloudflare-ready / D1-backed</p>
            <h2>电商平台架构工作台</h2>
          </div>
          <div className="status-pill">Apple-inspired ERP</div>
        </header>
        {children}
      </main>
    </div>
  );
}
