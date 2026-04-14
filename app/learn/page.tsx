import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { PageScene } from '@/components/layout/PageScene';
import { SectionCard } from '@/components/supply-chain/SectionCard';
import { LearnDeck } from '@/components/language/MotionDeck';

const learnCards = [
  {
    title: 'English Sprint',
    body: '口语、shadowing、场景改写三条线一起推进，适合每天快速闯关。',
    href: '/learn/english',
    cta: '进入英语路径',
    icon: 'mic' as const,
  },
  {
    title: 'Japanese Quest',
    body: '假名、旅行会话、语调描线更偏好玩路线，日语体验更轻更上头。',
    href: '/learn/japanese',
    cta: '进入日语路径',
    icon: 'sparkles' as const,
  },
  {
    title: '今日推荐关卡',
    body: '直接跳进最适合保持 streak 的那一关，别给自己太多犹豫时间。',
    href: '/lesson/english/ordering-food',
    cta: '开始推荐关卡',
    icon: 'flame' as const,
  },
  {
    title: '搞怪实验室',
    body: '想先玩一会儿？去看看吉祥物、试玩关卡和动态反馈模块。',
    href: '/',
    cta: '回到首页试玩',
    icon: 'layers' as const,
  },
];

export default function LearnHubPage() {
  return (
    <AppShell>
      <PageScene>
        <div className="page-stack">
          <section className="hero-card hero-premium hub-hero">
            <div className="hero-copy">
              <p className="eyebrow">Learn hub</p>
              <h1>Learn 不再是一整页里的一个角落，而是独立入口。</h1>
              <p className="hero-text">现在点击底部 Learn，会直接进入学习中心：选语言、进路径、挑关卡，都在这个页面里完成。</p>
              <div className="hero-actions">
                <Link href="/learn/english" className="primary-cta">继续英语</Link>
                <Link href="/learn/japanese" className="secondary-cta">切到日语</Link>
              </div>
            </div>
          </section>

          <SectionCard title="学习中心" description="这一页就是 Learn tab 对应的独立页面。">
            <LearnDeck cards={learnCards} />
          </SectionCard>
        </div>
      </PageScene>
    </AppShell>
  );
}
