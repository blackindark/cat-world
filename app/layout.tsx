import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Northstar ERP',
  description: 'Next.js full-stack ERP supply chain workbench deployed as a single Cloudflare project.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
