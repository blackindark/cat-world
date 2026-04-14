import Link from 'next/link';

const primaryNav = [
  { label: '首页', href: '/' },
  { label: '英语路径', href: '/learn/english' },
  { label: '日语路径', href: '/learn/japanese' },
  { label: 'AI 教练', href: '/lesson/english/small-talk-at-work' },
];

const bottomNav = [
  { label: 'Learn', href: '/learn/english' },
  { label: 'Review', href: '/learn/japanese' },
  { label: 'Coach', href: '/lesson/english/small-talk-at-work' },
  { label: 'Me', href: '/' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand-block">
          <p className="eyebrow">Northstar Languages</p>
          <strong className="brand-title">Lingo Sprint</strong>
        </div>
        <nav className="desktop-nav" aria-label="primary navigation">
          {primaryNav.map((item, index) => (
            <Link href={item.href} key={item.label} className={index === 0 ? 'nav-pill active' : 'nav-pill'}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/learn/english" className="header-cta">开始学习</Link>
      </header>

      <main className="app-content">{children}</main>

      <nav className="mobile-bottom-nav" aria-label="mobile navigation">
        {bottomNav.map((item, index) => (
          <Link href={item.href} key={item.label} className={index === 0 ? 'bottom-nav-item active' : 'bottom-nav-item'}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
