import { AppShell } from '@/components/layout/AppShell';
import { PageScene } from '@/components/layout/PageScene';
import { SectionCard } from '@/components/supply-chain/SectionCard';
import { IMPlayground } from '@/components/language/IMPlayground';

export default function IMPage() {
  return (
    <AppShell>
      <PageScene>
        <div className="page-stack">
          <section className="hero-card hub-hero im-hero">
            <div className="hero-copy">
              <p className="eyebrow">IM hub</p>
              <h1>学习之外，也该有个能一起练、一起玩、一起吐槽的地方。</h1>
              <p className="hero-text">
                新增 IM 功能页。这里支持私聊和群聊两种交流氛围：可以找搭子一对一练，也可以在小组里发起 streak 挑战、口语接龙和日语旅行对话。
              </p>
            </div>
          </section>

          <SectionCard title="交流中心" description="现在底部已经多了一个 IM tab，对应的就是这个独立页面。">
            <IMPlayground />
          </SectionCard>
        </div>
      </PageScene>
    </AppShell>
  );
}
