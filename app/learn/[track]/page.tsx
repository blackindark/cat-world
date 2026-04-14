import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { SectionCard } from '@/components/supply-chain/SectionCard';
import { getLanguageTrack } from '@/lib/language/data';

export default async function TrackPage({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  const currentTrack = getLanguageTrack(track);

  if (!currentTrack) {
    notFound();
  }

  return (
    <AppShell>
      <div className="page-stack">
        <section className={`hero-card track-hero ${currentTrack.accent}`}>
          <div className="hero-copy">
            <p className="eyebrow">{currentTrack.nativeName} path</p>
            <h1>{currentTrack.name}</h1>
            <p className="hero-text">{currentTrack.headline}</p>
            <div className="hero-actions">
              <Link href={`/lesson/${currentTrack.slug}/${currentTrack.lessons[0].slug}`} className="primary-cta">
                继续今天学习
              </Link>
              <Link href="/" className="secondary-cta">
                返回首页
              </Link>
            </div>
          </div>

          <div className="track-summary-card">
            <div className="summary-pill-row">
              <span className="soft-chip">{currentTrack.level}</span>
              <span className="soft-chip">{currentTrack.streakGoal}</span>
            </div>
            <p className="muted">{currentTrack.summary}</p>
            <div className="stats-grid compact-stats">
              <article className="mini-stat"><strong>{currentTrack.stats.units}</strong><span>units</span></article>
              <article className="mini-stat"><strong>{currentTrack.stats.masteredWords}</strong><span>词汇</span></article>
              <article className="mini-stat"><strong>{currentTrack.stats.speakingScore}</strong><span>口语评分</span></article>
              <article className="mini-stat"><strong>{currentTrack.stats.streakDays}</strong><span>streak</span></article>
            </div>
          </div>
        </section>

        <SectionCard title="建议学习节奏" description="把习惯做成可执行，而不是做成口号。">
          <div className="value-grid">
            {currentTrack.habits.map((habit) => (
              <article key={habit} className="value-card">
                <strong>{habit}</strong>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="课程地图" description="像多邻国一样往前推，但每节课更明确告诉你在练什么。">
          <div className="lesson-path-list">
            {currentTrack.lessons.map((lesson, index) => (
              <article key={lesson.slug} className={`lesson-node ${lesson.locked ? 'locked' : lesson.completed ? 'completed' : 'current'}`}>
                <div className="lesson-node-index">{index + 1}</div>
                <div className="lesson-node-body">
                  <div className="lesson-node-top">
                    <div>
                      <strong>{lesson.title}</strong>
                      <p className="muted">{lesson.focus}</p>
                    </div>
                    <span className="mission-chip">{lesson.xp} XP</span>
                  </div>
                  <div className="lesson-node-meta">
                    <span>{lesson.duration}</span>
                    <span>{lesson.completed ? '已完成' : lesson.locked ? '未解锁' : '进行中'}</span>
                  </div>
                  <div className="hero-actions lesson-actions-row">
                    <Link
                      href={lesson.locked ? '#' : `/lesson/${currentTrack.slug}/${lesson.slug}`}
                      className={lesson.locked ? 'secondary-cta disabled-link' : 'primary-cta'}
                      aria-disabled={lesson.locked}
                    >
                      {lesson.completed ? '再次练习' : lesson.locked ? '完成前置课程后解锁' : '开始本课'}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
