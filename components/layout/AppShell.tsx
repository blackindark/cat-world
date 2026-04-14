'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const primaryNav = [
  { label: '首页', href: '/' },
  { label: 'Learn', href: '/learn' },
  { label: 'Review', href: '/review' },
  { label: 'Coach', href: '/coach' },
  { label: 'Me', href: '/me' },
];

const bottomNav = [
  { label: 'Learn', href: '/learn' },
  { label: 'Review', href: '/review' },
  { label: 'Coach', href: '/coach' },
  { label: 'Me', href: '/me' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand-block">
          <p className="eyebrow">Northstar Languages</p>
          <strong className="brand-title">Lingo Sprint</strong>
        </div>
        <nav className="desktop-nav" aria-label="primary navigation">
          {primaryNav.map((item) => (
            <Link href={item.href} key={item.label} className={isActive(pathname, item.href) ? 'nav-pill active' : 'nav-pill'}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/learn" className="header-cta">开始学习</Link>
      </header>

      <main className="app-content">{children}</main>

      <nav className="mobile-bottom-nav" aria-label="mobile navigation">
        {bottomNav.map((item) => (
          <Link href={item.href} key={item.label} className={isActive(pathname, item.href) ? 'bottom-nav-item active' : 'bottom-nav-item'}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
