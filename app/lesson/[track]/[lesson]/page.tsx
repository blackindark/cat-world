import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { SectionCard } from '@/components/supply-chain/SectionCard';
import { getLanguageTrack, getLesson } from '@/lib/language/data';

const missionTypeLabel = {
  speak: '口语',
  listen: '听力',
  match: '配对',
  write: '写作',
} as const;

export default async function LessonPage({ params }: { params: Promise<{ track: string; lesson: string }> }) {
  const { track, lesson } = await params;
  const currentTrack = getLanguageTrack(track);
  const currentLesson = getLesson(track, lesson);

  if (!currentTrack || !currentLesson) {
    notFound();
  }

  return (
    <AppShell>
      <div className="page-stack">
        <section className={`hero-card lesson-hero ${currentTrack.accent}`}>
          <div className="hero-copy">
            <p className="eyebrow">{currentTrack.nativeName} lesson</p>
            <h1>{currentLesson.title}</h1>
            <p className="hero-text">本节重点：{currentLesson.focus}。推荐时长 {currentLesson.duration}，完成后获得 {currentLesson.xp} XP。</p>
          </div>
          <div className="lesson-summary-card">
            <div className="lesson-summary-progress">
              <div className="phone-progress-bar"><span style={{ width: '33%' }} /></div>
              <strong>2 / {currentLesson.missions.length + 1} steps</strong>
              <p>先热身，再做 2 个任务，最后做一句场景输出。</p>
            </div>
            <div className="hero-actions lesson-actions-row">
              <Link href={`/learn/${currentTrack.slug}`} className="secondary-cta">返回路径</Link>
              <a href="#missions" className="primary-cta">进入任务</a>
            </div>
          </div>
        </section>

        <SectionCard title="任务流" description="一节课里不要塞太多概念，而是让用户持续完成小反馈。">
          <div id="missions" className="mission-flow-list">
            {currentLesson.missions.map((mission, index) => (
              <article key={mission.id} className="mission-flow-card">
                <div className="mission-flow-step">Step {index + 1}</div>
                <div className="mission-flow-body">
                  <div className="lesson-node-top">
                    <div>
                      <strong>{mission.title}</strong>
                      <p className="muted">{missionTypeLabel[mission.type]}训练</p>
                    </div>
                    <span className="soft-chip">{missionTypeLabel[mission.type]}</span>
                  </div>
                  <p>{mission.prompt}</p>
                  <p className="muted">{mission.helper}</p>
                  <button className="primary-button">{mission.cta}</button>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <div className="two-panel-grid">
          <SectionCard title="本课结束后你会得到什么" description="保持一课一目标，用户更容易坚持。">
            <div className="lesson-moment-list">
              <article className="lesson-moment-card">
                <strong>马上能用的表达</strong>
                <p className="muted">学完不是只记住单词，而是能立刻在真实场景说出来。</p>
              </article>
              <article className="lesson-moment-card">
                <strong>发音 / 语感反馈</strong>
                <p className="muted">哪怕只做简单原型，也要让用户感觉自己被“纠正过”。</p>
              </article>
            </div>
          </SectionCard>

          <SectionCard title="下一步" description="闯关体验必须永远给用户一个清晰的下一步。">
            <div className="lesson-moment-list">
              <Link href={`/learn/${currentTrack.slug}`} className="mission-card next-link-card">
                <div>
                  <strong>返回课程路径</strong>
                  <p className="muted">继续推进 {currentTrack.name} 后续课程。</p>
                </div>
                <span className="mission-chip">Path</span>
              </Link>
              <Link href="/" className="mission-card next-link-card">
                <div>
                  <strong>切换语言轨道</strong>
                  <p className="muted">回首页查看英语与日语双主线。</p>
                </div>
                <span className="mission-chip">Home</span>
              </Link>
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
