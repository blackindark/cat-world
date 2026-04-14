'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';

type Card = {
  id: string;
  front: string;
  back: string;
  hint: string;
};

const cards: Card[] = [
  {
    id: 'r1',
    front: 'Can I get an oat latte?',
    back: '更自然礼貌的点单表达。',
    hint: '想象自己在咖啡馆，不要像下命令。',
  },
  {
    id: 'r2',
    front: 'おすすめは何ですか',
    back: '“有什么推荐吗？”',
    hint: '餐厅旅行高频句，记住它很值。',
  },
  {
    id: 'r3',
    front: 'How was your weekend?',
    back: '轻松自然的周末寒暄起手式。',
    hint: '典型 small talk opener。',
  },
];

export function ReviewPlayground() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [again, setAgain] = useState(0);

  const card = cards[index];
  const progress = useMemo(() => `${index + 1}/${cards.length}`, [index]);

  function next(result: 'known' | 'again') {
    if (result === 'known') setKnown((value) => value + 1);
    if (result === 'again') setAgain((value) => value + 1);

    if (index === cards.length - 1) {
      setIndex(0);
      setFlipped(false);
      return;
    }

    setIndex((value) => value + 1);
    setFlipped(false);
  }

  return (
    <div className="review-playground">
      <div className="challenge-topbar">
        <span className="soft-chip">Review loop</span>
        <span className="soft-chip">{progress}</span>
      </div>

      <motion.button
        type="button"
        className={flipped ? 'review-flashcard flipped' : 'review-flashcard'}
        onClick={() => setFlipped((value) => !value)}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={flipped ? `${card.id}-back` : `${card.id}-front`}
            className="review-card-face"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.25 }}
          >
            <span className="eyebrow">{flipped ? 'Meaning' : 'Phrase'}</span>
            <strong>{flipped ? card.back : card.front}</strong>
            <p className="muted">{card.hint}</p>
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <div className="review-metrics-row">
        <span className="soft-chip">记住 {known}</span>
        <span className="soft-chip">再来 {again}</span>
      </div>

      <div className="review-actions-row">
        <button type="button" className="secondary-cta review-action-button" onClick={() => setFlipped((value) => !value)}>
          <RotateCcw size={16} /> 翻面
        </button>
        <button type="button" className="secondary-cta review-action-button" onClick={() => next('again')}>
          再来一次
        </button>
        <button type="button" className="primary-button fun-button review-action-button" onClick={() => next('known')}>
          <Sparkles size={16} /> 记住了
        </button>
      </div>
    </div>
  );
}
