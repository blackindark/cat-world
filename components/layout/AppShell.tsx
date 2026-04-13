const roadmap = ['供应链', '采购结算', '制造执行', '质量追溯', '主数据治理'];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">ERP ARCHITECTURE</p>
          <h1>Northstar ERP</h1>
          <p className="muted">
            Next.js 全栈单项目 + 内存行数据库原型。页面、API、供应链领域模型统一收敛在一个仓库里，方便直接部署到 Cloudflare。
          </p>
        </div>

        <nav className="nav">
          <a href="#supply-chain" className="nav-link active">供应链系统</a>
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
            <p className="eyebrow">Single project / Cloudflare-ready</p>
            <h2>供应链控制塔</h2>
          </div>
          <div className="status-pill">Next.js full-stack</div>
        </header>
        {children}
      </main>
    </div>
  );
}
