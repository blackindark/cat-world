import { AppShell } from '@/components/layout/AppShell';
import { SectionCard } from '@/components/supply-chain/SectionCard';
import { CoachDeck } from '@/components/language/MotionDeck';

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
      <div className="page-stack">
        <section className="hero-card hub-hero coach-hero">
          <div className="hero-copy">
            <p className="eyebrow">Coach hub</p>
            <h1>Coach 现在也有自己的页面，不再挤在长页面里。</h1>
            <p className="hero-text">这一页专门承接陪练、纠错和场景模拟。后面继续接语音、打分和更强的 AI 教练逻辑。</p>
          </div>
        </section>

        <SectionCard title="陪练入口" description="先把最能让用户感到被陪伴的入口放到一起。">
          <CoachDeck prompts={prompts} />
        </SectionCard>
      </div>
    </AppShell>
  );
}
