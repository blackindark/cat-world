'use client';

import { useMemo, useState } from 'react';

type Challenge = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  success: string;
  fail: string;
};

const englishChallenges: Challenge[] = [
  {
    id: 'c1',
    prompt: '在咖啡馆里，更自然的表达是哪句？',
    options: ['Give me coffee.', 'Can I get an oat latte?', 'Coffee. Now.'],
    answer: 'Can I get an oat latte?',
    success: '对，这句自然又礼貌，MochiBoom 当场给你鼓掌。',
    fail: '这句气势很足，但容易像在对咖啡宣战。再试一次。',
  },
  {
    id: 'c2',
    prompt: '同事问你周末如何，哪个回应更顺？',
    options: ['It was pretty relaxing actually.', 'Weekend yes.', 'I am weekend.'],
    answer: 'It was pretty relaxing actually.',
    success: '不错，语感很顺，像真正会接话的人。',
    fail: 'MochiBoom 正在扶额，但依然愿意再给你一次机会。',
  },
];

export function PlayfulLessonDemo() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [combo, setCombo] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [mood, setMood] = useState<'idle' | 'win' | 'lose'>('idle');

  const challenge = englishChallenges[index];
  const isComplete = index >= englishChallenges.length;

  const feedback = useMemo(() => {
    if (selected === null) return 'MochiBoom 在旁边蹦跶，等你拍板。';
    return selected === challenge.answer ? challenge.success : challenge.fail;
  }, [selected, challenge]);

  function choose(option: string) {
    if (selected) return;
    setSelected(option);
    if (option === challenge.answer) {
      setCombo((value) => value + 1);
      setMood('win');
    } else {
      setCombo(0);
      setHearts((value) => Math.max(0, value - 1));
      setMood('lose');
    }
  }

  function nextStep() {
    if (!selected) return;
    setSelected(null);
    setMood('idle');
    setIndex((value) => value + 1);
  }

  if (isComplete) {
    return (
      <section className="playful-lesson panel">
        <div className="section-header">
          <div>
            <h3>搞怪互动关卡</h3>
            <p className="muted">把 lesson 从“展示任务”推进到“真能玩一下”。</p>
          </div>
        </div>

        <div className="lesson-party-card">
          <div className="party-badge">COMBO {combo}</div>
          <h4>你把这个试玩关卡打通了。</h4>
          <p className="muted">MochiBoom 已经准备把彩带炮打到天花板上。下一步可以把这个体验正式接进 lesson 页面。</p>
          <button type="button" className="primary-button fun-button" onClick={() => { setIndex(0); setSelected(null); setCombo(0); setHearts(5); setMood('idle'); }}>
            再玩一遍
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="playful-lesson panel">
      <div className="section-header">
        <div>
          <h3>搞怪互动关卡</h3>
          <p className="muted">先把一个英语小关卡做成真反馈、真得失、真上头的试玩版。</p>
        </div>
      </div>

      <div className="playful-lesson-grid">
        <article className={`challenge-console ${mood}`}>
          <div className="challenge-topbar">
            <span className="soft-chip">Combo {combo}</span>
            <span className="soft-chip">❤️ {hearts}</span>
          </div>
          <div className="challenge-progress-track">
            <span style={{ width: `${((index + (selected ? 1 : 0)) / englishChallenges.length) * 100}%` }} />
          </div>
          <h4>{challenge.prompt}</h4>
          <div className="challenge-options">
            {challenge.options.map((option) => {
              const state = selected === null ? '' : option === challenge.answer ? 'correct' : option === selected ? 'wrong' : '';
              return (
                <button key={option} type="button" className={`challenge-option ${state}`.trim()} onClick={() => choose(option)}>
                  {option}
                </button>
              );
            })}
          </div>
          <div className="challenge-feedback">
            <strong>{selected ? (selected === challenge.answer ? 'Perfect hit!' : 'Oops, drama moment!') : 'Ready?'}</strong>
            <p className="muted">{feedback}</p>
          </div>
          <button type="button" className="primary-button fun-button" disabled={!selected} onClick={nextStep}>
            {index === englishChallenges.length - 1 ? '完成试玩' : '下一题'}
          </button>
        </article>

        <article className={`mascot-reaction-card ${mood}`}>
          <div className="reaction-face" aria-hidden="true">{mood === 'win' ? '😎' : mood === 'lose' ? '🙃' : '🫧'}</div>
          <strong>{mood === 'win' ? 'MochiBoom 爆夸模式' : mood === 'lose' ? 'MochiBoom 继续陪你作战' : 'MochiBoom 热身中'}</strong>
          <p className="muted">
            {mood === 'win'
              ? '答对时立刻给情绪奖励，用户会更想继续冲 combo。'
              : mood === 'lose'
                ? '答错也别冷冰冰，应该是“有戏剧性但不打击人”。'
                : '先把用户哄进状态，再让他忍不住点下去。'}
          </p>
          <div className="wave-bars" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, idx) => (
              <span key={idx} style={{ animationDelay: `${idx * 100}ms` }} />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
