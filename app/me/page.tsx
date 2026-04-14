import { AppShell } from '@/components/layout/AppShell';
import { SectionCard } from '@/components/supply-chain/SectionCard';
import { MeDeck } from '@/components/language/MotionDeck';

const stats = [
  { label: '当前 streak', value: '12 天', icon: 'flame' as const },
  { label: '累计 XP', value: '3,480', icon: 'trophy' as const },
  { label: '本周掌握词汇', value: '86', icon: 'brain' as const },
  { label: 'MochiBoom 好感度', value: 'MAX', icon: 'star' as const },
];

export default function MePage() {
  return (
    <AppShell>
      <div className="page-stack">
        <section className="hero-card hub-hero me-hero">
          <div className="hero-copy">
            <p className="eyebrow">Me hub</p>
            <h1>Me 是你的学习档案，不再只是首页底下的一块信息。</h1>
            <p className="hero-text">把 streak、XP、掌握度、吉祥物关系值和未来的个性化推荐，都放到这个独立页面。</p>
          </div>
        </section>

        <SectionCard title="你的进度面板" description="这是 Me tab 对应的新页面，后面可以继续接 D1 和真实用户数据。">
          <MeDeck stats={stats} />
        </SectionCard>
      </div>
    </AppShell>
  );
}
