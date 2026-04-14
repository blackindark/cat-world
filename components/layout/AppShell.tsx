const roadmap = ['供应链', '采购结算', '制造执行', '质量追溯', '主数据治理'];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">APPLE-LIKE ERP WORKBENCH</p>
          <h1>Northstar ERP</h1>
          <p className="muted">
            现在不再只是看板页面，而是一个带真实 D1 数据层的供应链业务工作台。风格切到更接近 mac / Apple 的浅色、玻璃、留白系统。
          </p>
        </div>

        <nav className="nav">
          <a href="#supply-chain" className="nav-link active">供应链系统</a>
          <a href="#operations" className="nav-link">业务操作台</a>
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
            <h2>供应链控制塔</h2>
          </div>
          <div className="status-pill">Apple-inspired ERP</div>
        </header>
        {children}
      </main>
    </div>
  );
}
