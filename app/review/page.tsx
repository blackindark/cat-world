import { AppShell } from '@/components/layout/AppShell';
import { SectionCard } from '@/components/supply-chain/SectionCard';
import { ReviewDeck } from '@/components/language/MotionDeck';

const reviewItems = [
  { term: 'Can I get an oat latte?', gloss: '更自然的点单表达，适合口语热身。', badge: 'English' },
  { term: 'おすすめは何ですか', gloss: '旅行中超高频的餐厅问句。', badge: 'Japanese' },
  { term: 'Small talk opener', gloss: '把开口尴尬感压低的高频工作寒暄模板。', badge: 'English' },
  { term: 'きょうは どこへ いきますか', gloss: '日语问路和出行场景常用句。', badge: 'Japanese' },
];

export default function ReviewPage() {
  return (
    <AppShell>
      <div className="page-stack">
        <section className="hero-card hub-hero review-hero">
          <div className="hero-copy">
            <p className="eyebrow">Review hub</p>
            <h1>Review 要像刷奖励，不该像补作业。</h1>
            <p className="hero-text">这里先做成独立复习页。后面可以继续接入真正的间隔重复、难度回流和错题优先级。</p>
          </div>
        </section>

        <SectionCard title="今日复习堆栈" description="先把最容易忘、最值得复习的内容推到你面前。">
          <ReviewDeck items={reviewItems} />
        </SectionCard>
      </div>
    </AppShell>
  );
}
