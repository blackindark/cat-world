'use client';

import { useMemo, useState } from 'react';

type Mood = 'hype' | 'chaos' | 'wink';

const mascotLines: Record<Mood, string[]> = {
  hype: [
    '我是 MochiBoom，负责把“学习”从任务变成上头小游戏。',
    '你只要先开口，我就负责夸你、催你、顺便把气氛搞热。',
    '今天先拿下 1 关，剩下的胜利感会自己长出来。',
  ],
  chaos: [
    '警报：你的 streak 正在发光，我建议立刻趁热再闯一关。',
    '词汇会忘，但情绪价值不会。我已经准备好把你夸到起飞。',
    '如果你犹豫，我就默认你想继续升级。',
  ],
  wink: [
    '放心，卡壳也算剧情，我会把失误变成彩蛋。',
    '你发音抖一下没关系，先勇敢开口就是 MVP 行为。',
    '认真学习很好，带点搞怪才更容易坚持。',
  ],
};

const moodLabels: Record<Mood, string> = {
  hype: '打鸡血',
  chaos: '搞事情',
  wink: '眨眼鼓励',
};

export function MascotGuide() {
  const [mood, setMood] = useState<Mood>('hype');
  const [lineIndex, setLineIndex] = useState(0);

  const line = useMemo(() => mascotLines[mood][lineIndex % mascotLines[mood].length], [mood, lineIndex]);

  function switchMood(nextMood: Mood) {
    setMood(nextMood);
    setLineIndex(0);
  }

  return (
    <section className="mascot-stage panel">
      <div className="section-header">
        <div>
          <h3>吉祥物出场</h3>
          <p className="muted">让网站不是只有功能，还要有一个会逗你、会鼓劲、会刷存在感的代言人。</p>
        </div>
      </div>

      <div className="mascot-grid">
        <div className="mascot-figure-wrap">
          <div className={`mascot-figure ${mood}`} aria-label="MochiBoom mascot">
            <div className="mascot-ear left" />
            <div className="mascot-ear right" />
            <div className="mascot-body">
              <div className="mascot-face">
                <span className="mascot-eye left" />
                <span className="mascot-eye right" />
                <span className="mascot-mouth" />
                <span className="mascot-blush left" />
                <span className="mascot-blush right" />
              </div>
              <div className="mascot-belly">⚡</div>
            </div>
            <div className="mascot-hand left" />
            <div className="mascot-hand right" />
            <div className="mascot-foot left" />
            <div className="mascot-foot right" />
            <div className="mascot-shadow" />
          </div>
          <div className="mascot-badges">
            <span className="soft-chip">代言人: MochiBoom</span>
            <span className="soft-chip">属性: 嘴甜 + 搞怪 + 会催进度</span>
          </div>
        </div>

        <div className="mascot-console">
          <div className="mascot-mood-row">
            {(['hype', 'chaos', 'wink'] as Mood[]).map((item) => (
              <button
                key={item}
                type="button"
                className={mood === item ? 'mascot-mood active' : 'mascot-mood'}
                onClick={() => switchMood(item)}
              >
                {moodLabels[item]}
              </button>
            ))}
          </div>

          <article className="mascot-bubble-card">
            <p className="eyebrow">MochiBoom says</p>
            <strong>{line}</strong>
          </article>

          <div className="hero-actions lesson-actions-row">
            <button type="button" className="primary-button fun-button" onClick={() => setLineIndex((value) => value + 1)}>
              再来一句
            </button>
            <button type="button" className="secondary-cta fun-outline-button" onClick={() => setMood('chaos')}>
              切换成搞事情模式
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
