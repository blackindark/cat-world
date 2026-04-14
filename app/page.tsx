import Link from 'next/link';
import { KpiCard } from '@/components/supply-chain/KpiCard';
import { SectionCard } from '@/components/supply-chain/SectionCard';
import { AppShell } from '@/components/layout/AppShell';
import { InteractiveShowcase } from '@/components/language/InteractiveShowcase';
import { MascotGuide } from '@/components/language/MascotGuide';
import { PlayfulLessonDemo } from '@/components/language/PlayfulLessonDemo';

const focusTracks = [
  {
    slug: 'english',
    name: 'English Sprint',
    level: 'A1 → B2',
    badge: 'Core track',
    description: '围绕高频口语、职场表达、听力跟读和语法纠错，做一条适合中国学习者的英语主线。',
    modules: ['Daily speaking', 'Listening shadowing', 'Grammar repair', 'Scenario drills'],
    progress: 72,
    accent: 'emerald',
  },
  {
    slug: 'japanese',
    name: 'Japanese Quest',
    level: 'N5 → N3',
    badge: 'Launch track',
    description: '从假名、基础句型、旅行会话到 JLPT 高频词汇，先把日语入门和持续练习做扎实。',
    modules: ['Kana warmup', 'Travel phrases', 'JLPT vocab', 'Sentence patterns'],
    progress: 48,
    accent: 'sky',
  },
];

const dailyMissions = [
  {
    title: '3-minute speaking burst',
    detail: '看图开口 + AI 跟读反馈，今天主题是 cafe ordering。',
    chip: 'English',
  },
  {
    title: 'Kana speed review',
    detail: '用滑动卡片复习 20 个平假名，错题自动回炉。',
    chip: 'Japanese',
  },
  {
    title: 'Streak saver lesson',
    detail: '晚上只剩 1 节微课就能保住连续学习 12 天。',
    chip: 'Habit',
  },
];

const lessonMoments = [
  {
    title: '听说读写一体化小关卡',
    text: '每节课控制在 3-7 分钟：先听懂，再开口，再做选择题，最后写一句自己的表达。',
  },
  {
    title: '错误驱动复习',
    text: '不是机械背题，而是把你的发音错误、词汇遗忘和语法漏洞单独做成复习流。',
  },
  {
    title: '通勤场景优先',
    text: '手机端单手就能完成，地铁、排队、碎片时间都能学，不需要桌面端才能打开。',
  },
];

const roadmap = [
  {
    phase: 'Phase 01',
    title: '英语 / 日语双主线',
    items: ['每日闯关首页', '词汇卡片', '跟读打分', '连续学习奖励'],
  },
  {
    phase: 'Phase 02',
    title: 'AI 陪练与纠错',
    items: ['口语对话教练', '作文即时批改', '错题重训', '个性化难度调节'],
  },
  {
    phase: 'Phase 03',
    title: '学习闭环与社交激励',
    items: ['好友排行榜', '学习队伍', '打卡分享卡片', '课程成长档案'],
  },
];

const features = [
  '课程路径像游戏地图一样推进',
  '英语和日语都先做高频真实场景',
  '移动端底部导航 + 大按钮 + 手势友好',
  '视觉上保留明亮、轻快、有奖励感的学习氛围',
];

const delightMoments = [
  '实时音高轨迹和节奏条，让跟读像打节奏游戏',
  '手势式卡片切换和即时回弹反馈，减少“填表式学习”感',
  '更有层次的光效、悬浮、波形动画，让首页本身就有可玩性',
  '把路径页、lesson 页和首页互动逻辑统一成连续体验',
];

export default function Page() {
  return (
    <AppShell>
      <div className="page-stack">
        <section className="hero-card hero-premium">
          <div className="hero-copy">
            <p className="eyebrow">Playful language learning</p>
            <h1>每天打开一下，就想顺手再学一关。</h1>
            <p className="hero-text">
              英语和日语先做成两条真正有节奏感的学习主线：更快进入状态、更强即时反馈、更顺滑的手机端交互，让学习体验不再像翻目录，而像在闯关。
            </p>
            <div className="hero-actions">
              <Link href="/learn/english" className="primary-cta">开始今天的课程</Link>
              <Link href="/lesson/japanese/restaurant-basics" className="secondary-cta">试玩一个日语关卡</Link>
            </div>
            <div className="hero-chip-row">
              <span className="soft-chip">Realtime feedback</span>
              <span className="soft-chip">Motion UI</span>
              <span className="soft-chip">Game-like flow</span>
            </div>
          </div>

          <div className="phone-stage" aria-label="app preview">
            <div className="phone-shell premium-phone-shell">
              <div className="orb orb-green" />
              <div className="orb orb-blue" />
              <div className="phone-top">
                <span>12 day streak</span>
                <span>⚡ 180 XP</span>
              </div>
              <div className="phone-progress premium-panel">
                <div className="phone-progress-bar"><span style={{ width: '72%' }} /></div>
                <strong>English unit 4 · ordering food</strong>
                <p>1 lesson left to keep your streak alive.</p>
              </div>
              <div className="lesson-bubble success floating-card">
                <span className="lesson-label">Speak</span>
                <strong>“Can I get an oat latte?”</strong>
                <p>发音评分 91，继续下一句。</p>
              </div>
              <div className="lesson-bubble info floating-card delay-card">
                <span className="lesson-label">日本語</span>
                <strong>きょうは どこへ いきますか。</strong>
                <p>句型练习 + 假名提示 + 跟读回放。</p>
              </div>
              <div className="wave-bars compact-wave" aria-hidden="true">
                {Array.from({ length: 6 }).map((_, index) => (
                  <span key={index} style={{ animationDelay: `${index * 120}ms` }} />
                ))}
              </div>
              <div className="phone-nav">
                <span className="active">Learn</span>
                <span>Review</span>
                <span>Coach</span>
                <span>Profile</span>
              </div>
            </div>
          </div>
        </section>

        <section className="kpi-grid language-kpis">
          <KpiCard label="连续学习" value="12 天" hint="低负担、强反馈、让用户更容易坚持" />
          <KpiCard label="今日 XP" value="180" hint="微课完成、复习加成、口语奖励" />
          <KpiCard label="英语主线" value="24 节" hint="从高频口语到场景会话逐级推进" />
          <KpiCard label="日语主线" value="16 节" hint="假名、基础句型、JLPT 高频词先打底" />
        </section>

        <InteractiveShowcase />
        <MascotGuide />
        <PlayfulLessonDemo />

        <SectionCard title="这次重点提升的是体验密度" description="不是只换皮，而是把首页本身做得更有响应感、更愿意点。">
          <div className="value-grid">
            {delightMoments.map((feature) => (
              <article key={feature} className="value-card emphasis-card">
                <strong>{feature}</strong>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="产品骨架" description="保留清晰学习结构，但表达方式更像游戏化产品。">
          <div className="value-grid">
            {features.map((feature) => (
              <article key={feature} className="value-card">
                <strong>{feature}</strong>
              </article>
            ))}
          </div>
        </SectionCard>

        <div id="tracks" className="track-grid">
          {focusTracks.map((track) => (
            <section className={`panel track-card ${track.accent}`} key={track.name}>
              <div className="track-header-row">
                <div>
                  <p className="eyebrow">{track.badge}</p>
                  <h3>{track.name}</h3>
                  <p className="muted">{track.level}</p>
                </div>
                <span className="track-progress-pill">{track.progress}%</span>
              </div>
              <p className="track-description">{track.description}</p>
              <div className="track-progress-bar">
                <span style={{ width: `${track.progress}%` }} />
              </div>
              <div className="chip-row">
                {track.modules.map((module) => (
                  <span key={module} className="soft-chip">{module}</span>
                ))}
              </div>
              <div className="hero-actions lesson-actions-row">
                <Link href={`/learn/${track.slug}`} className="primary-cta">
                  进入路径
                </Link>
              </div>
            </section>
          ))}
        </div>

        <div className="two-panel-grid">
          <SectionCard title="今日任务" description="学习体验要像任务流，而不是像传统目录树。">
            <div className="mission-list">
              {dailyMissions.map((mission) => (
                <article key={mission.title} className="mission-card">
                  <div>
                    <strong>{mission.title}</strong>
                    <p className="muted">{mission.detail}</p>
                  </div>
                  <span className="mission-chip">{mission.chip}</span>
                </article>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="关卡设计" description="先把最容易形成正反馈的学习循环做出来。">
            <div className="lesson-moment-list">
              {lessonMoments.map((item) => (
                <article key={item.title} className="lesson-moment-card">
                  <strong>{item.title}</strong>
                  <p className="muted">{item.text}</p>
                </article>
              ))}
            </div>
          </SectionCard>
        </div>

        <SectionCard title="手机端优先的交互骨架" description="这一版视觉和布局优先服务手机使用场景。">
          <div className="mobile-principles-grid">
            <article className="principle-card">
              <strong>底部导航</strong>
              <p className="muted">学习、复习、AI 教练、个人中心全部落在拇指热区，不依赖桌面侧边栏。</p>
            </article>
            <article className="principle-card">
              <strong>大尺寸操作区</strong>
              <p className="muted">题目按钮、录音按钮、下一步按钮全部扩大，避免手机端误触。</p>
            </article>
            <article className="principle-card">
              <strong>卡片式微课</strong>
              <p className="muted">每一屏只讲一件事，减少信息过载，鼓励连续完成多个小任务。</p>
            </article>
            <article className="principle-card">
              <strong>奖励反馈明显</strong>
              <p className="muted">连胜、经验值、正确率、掌握度都要即时可见，形成多邻国式成就感。</p>
            </article>
          </div>
        </SectionCard>

        <SectionCard title="英语与日语的课程切入点" description="先做最容易验证用户价值的内容，而不是一上来铺太多语言。">
          <div className="curriculum-grid">
            <article className="curriculum-card english">
              <p className="eyebrow">English</p>
              <h3>先打高频表达和开口信心</h3>
              <ul>
                <li>自我介绍、点餐、出行、工作沟通</li>
                <li>听一句说一句，弱化死记硬背</li>
                <li>重点做口语纠错和场景复述</li>
              </ul>
            </article>
            <article className="curriculum-card japanese">
              <p className="eyebrow">Japanese</p>
              <h3>先打假名、句型和旅行会话</h3>
              <ul>
                <li>平假名 / 片假名分层记忆</li>
                <li>です / ます 句型与常用问答</li>
                <li>旅行、餐厅、购物场景先上线</li>
              </ul>
            </article>
          </div>
        </SectionCard>

        <SectionCard title="接下来应该继续迭代什么" description="如果继续往下做，我建议优先按这个节奏推进。">
          <div id="roadmap" className="roadmap-grid language-roadmap">
            {roadmap.map((phase) => (
              <article key={phase.phase} className="roadmap-item language-roadmap-item">
                <p className="eyebrow">{phase.phase}</p>
                <strong>{phase.title}</strong>
                <ul className="bullet-list">
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
