'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGroup, motion } from 'framer-motion';
import { Bot, MessageCircleMore, MessageSquareDot, Sparkles, UserRound } from 'lucide-react';

const primaryNav = [
  { label: '首页', href: '/' },
  { label: 'Learn', href: '/learn' },
  { label: 'Review', href: '/review' },
  { label: 'Coach', href: '/coach' },
  { label: 'IM', href: '/im' },
  { label: 'Me', href: '/me' },
];

const bottomNav = [
  { label: 'Learn', href: '/learn', icon: Sparkles },
  { label: 'Review', href: '/review', icon: MessageSquareDot },
  { label: 'Coach', href: '/coach', icon: Bot },
  { label: 'IM', href: '/im', icon: MessageCircleMore },
  { label: 'Me', href: '/me', icon: UserRound },
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
        <LayoutGroup>
          <nav className="desktop-nav" aria-label="primary navigation">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link href={item.href} key={item.label} className={active ? 'nav-pill active' : 'nav-pill'}>
                  {active && <motion.span layoutId="top-nav-pill" className="nav-active-bg" />}
                  <span className="nav-pill-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </LayoutGroup>
        <Link href="/learn" className="header-cta">开始学习</Link>
      </header>

      <main className="app-content">{children}</main>

      <LayoutGroup>
        <nav className="mobile-bottom-nav" aria-label="mobile navigation">
          {bottomNav.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link href={item.href} key={item.label} className={active ? 'bottom-nav-item active' : 'bottom-nav-item'}>
                {active && <motion.span layoutId="bottom-nav-pill" className="bottom-nav-active-bg" />}
                <span className="bottom-nav-content">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </LayoutGroup>
    </div>
  );
}
