'use client';

import { useMemo, useState } from 'react';

type DemoTrack = 'english' | 'japanese';

type DemoMission = {
  id: string;
  label: string;
  title: string;
  prompt: string;
  feedback: string;
  energy: number;
  glow: string;
};

const missions: Record<DemoTrack, DemoMission[]> = {
  english: [
    {
      id: 'eng-speak',
      label: 'Speak Burst',
      title: '3 秒开口挑战',
      prompt: '看到咖啡馆图片后，直接说出 “Can I get an oat latte?”，不给你长时间准备。',
      feedback: '系统会把连读、停顿、重音直接叠在句子上，像游戏判定一样给即时反馈。',
      energy: 88,
      glow: 'rgba(88, 204, 2, 0.22)',
    },
    {
      id: 'eng-shadow',
      label: 'Shadowing',
      title: '跟读节奏条',
      prompt: '音频播完后，节奏条会显示你的句子重音有没有贴合母语者节拍。',
      feedback: '不是只告诉你对错，而是让你看到自己哪一段“说得像”。',
      energy: 74,
      glow: 'rgba(28, 176, 246, 0.20)',
    },
    {
      id: 'eng-remix',
      label: 'Remix',
      title: '场景改写模式',
      prompt: '把 “I want coffee.” 拖成更自然、更礼貌的表达。',
      feedback: '像搭积木一样重组语言，减少“知道但不会说”的断层。',
      energy: 63,
      glow: 'rgba(255, 213, 79, 0.22)',
    },
  ],
  japanese: [
    {
      id: 'jp-kana',
      label: 'Kana Dash',
      title: '假名冲刺卡',
      prompt: '平假名和片假名会像弹幕一样出现，用滑动手势快速判断发音。',
      feedback: '错题会自动降速并回放，直到你能下意识认出字形。',
      energy: 79,
      glow: 'rgba(28, 176, 246, 0.20)',
    },
    {
      id: 'jp-roleplay',
      label: 'Roleplay',
      title: '旅行对话模拟',
      prompt: '你站在地铁站里问路，系统会根据回答实时切换 NPC 台词。',
      feedback: '会话不是固定脚本，回答短一点、犹豫一点，反馈也会不同。',
      energy: 83,
      glow: 'rgba(88, 204, 2, 0.22)',
    },
    {
      id: 'jp-pitch',
      label: 'Pitch Trace',
      title: '语调描线',
      prompt: '跟读句子时，音高轨迹像赛车线一样在卡片上滚动。',
      feedback: '让初学者更容易理解“听起来像日语”到底差在哪。',
      energy: 68,
      glow: 'rgba(255, 213, 79, 0.22)',
    },
  ],
};

const trackMeta = {
  english: {
    title: 'English live lab',
    subtitle: '口语、shadowing、改写，一次只挑战一个高反馈动作。',
  },
  japanese: {
    title: 'Japanese live lab',
    subtitle: '假名、语调、旅行对话，用更像游戏的方式把日语学进去。',
  },
};

export function InteractiveShowcase() {
  const [track, setTrack] = useState<DemoTrack>('english');
  const [activeMissionId, setActiveMissionId] = useState(missions.english[0].id);

  const currentMissions = missions[track];
  const activeMission = useMemo(
    () => currentMissions.find((item) => item.id === activeMissionId) ?? currentMissions[0],
    [activeMissionId, currentMissions],
  );

  function switchTrack(nextTrack: DemoTrack) {
    setTrack(nextTrack);
    setActiveMissionId(missions[nextTrack][0].id);
  }

  return (
    <section className="interactive-lab panel">
      <div className="section-header">
        <div>
          <h3>试玩实验室</h3>
          <p className="muted">把首页从静态介绍页，升级成一个会“动”、会“响应”、会让人想点的学习界面。</p>
        </div>
      </div>

      <div className="interactive-lab-grid">
        <div className="lab-console">
          <div className="lab-switch" role="tablist" aria-label="language lab switch">
            <button
              type="button"
              className={track === 'english' ? 'lab-switch-item active' : 'lab-switch-item'}
              onClick={() => switchTrack('english')}
            >
              English
            </button>
            <button
              type="button"
              className={track === 'japanese' ? 'lab-switch-item active' : 'lab-switch-item'}
              onClick={() => switchTrack('japanese')}
            >
              日本語
            </button>
          </div>

          <div className="lab-hero-copy">
            <p className="eyebrow">Interactive mode</p>
            <strong>{trackMeta[track].title}</strong>
            <p className="muted">{trackMeta[track].subtitle}</p>
          </div>

          <div className="mission-selector">
            {currentMissions.map((mission) => (
              <button
                type="button"
                key={mission.id}
                className={mission.id === activeMission.id ? 'mission-toggle active' : 'mission-toggle'}
                onClick={() => setActiveMissionId(mission.id)}
              >
                <span>{mission.label}</span>
                <strong>{mission.title}</strong>
              </button>
            ))}
          </div>
        </div>

        <div className="lab-stage" style={{ ['--mission-glow' as string]: activeMission.glow }}>
          <div className="energy-ring" style={{ ['--energy' as string]: `${activeMission.energy}%` }}>
            <div>
              <span>Momentum</span>
              <strong>{activeMission.energy}%</strong>
            </div>
          </div>

          <article className="live-card primary">
            <p className="eyebrow">{activeMission.label}</p>
            <strong>{activeMission.title}</strong>
            <p>{activeMission.prompt}</p>
          </article>

          <article className="live-card secondary">
            <p className="eyebrow">Realtime feedback</p>
            <strong>像游戏判定一样及时回弹</strong>
            <p>{activeMission.feedback}</p>
            <div className="wave-bars" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, index) => (
                <span key={index} style={{ animationDelay: `${index * 90}ms` }} />
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
