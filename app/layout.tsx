import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lingo Sprint | 英语与日语学习网站',
  description: '一个移动端优先、类似多邻国节奏的英语和日语学习网站原型。',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
