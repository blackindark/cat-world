import { AppShell } from '@/components/layout/AppShell';
import { PageScene } from '@/components/layout/PageScene';
import { SectionCard } from '@/components/supply-chain/SectionCard';
import { CoachDeck } from '@/components/language/MotionDeck';
import { CoachConversation } from '@/components/language/CoachConversation';

const prompts = [
  {
    title: '咖啡馆口语对练',
    description: '像 NPC 一样和你来回两三轮，让你快速进入开口状态。',
    badge: 'English coach',
  },
  {
    title: '日语旅行问路模拟',
    description: '把车站问路做成更轻量的实时对话，先解决敢不敢说的问题。',
    badge: 'Japanese coach',
  },
  {
    title: '语气修正模式',
    description: '给你一句太硬的表达，AI 教你改得更自然、更像真人说话。',
    badge: 'Rewrite coach',
  },
];

export default function CoachPage() {
  return (
    <AppShell>
      <PageScene>
        <div className="page-stack">
          <section className="hero-card hub-hero coach-hero">
            <div className="hero-copy">
              <p className="eyebrow">Coach hub</p>
              <h1>Coach 不该只是按钮列表，而该像真有人在带你说。</h1>
              <p className="hero-text">我把它往对话式陪练推进了一步：场景切换、建议回复、即时反馈都开始像真正的 coach 界面。</p>
            </div>
          </section>

          <SectionCard title="对话式陪练" description="先做成更像真实教练对话的界面，而不是一排功能入口。">
            <CoachConversation />
          </SectionCard>

          <SectionCard title="陪练入口" description="保留不同陪练模式的入口，继续往深处拓展。">
            <CoachDeck prompts={prompts} />
          </SectionCard>
        </div>
      </PageScene>
    </AppShell>
  );
}
