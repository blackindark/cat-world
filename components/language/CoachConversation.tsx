'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Mic2, SendHorizonal, Sparkles } from 'lucide-react';

type CoachScenario = {
  id: string;
  title: string;
  coachLine: string;
  suggestions: string[];
  feedback: string;
};

const scenarios: CoachScenario[] = [
  {
    id: 'cafe',
    title: '咖啡馆点单对练',
    coachLine: '你现在站在咖啡馆柜台前。试着更自然地开口点一杯燕麦拿铁。',
    suggestions: ['Can I get an oat latte?', 'I want one oat latte please.', 'Could I also have a bagel?'],
    feedback: '这种句子适合先追求“自然顺口”，再慢慢修礼貌层次。',
  },
  {
    id: 'station',
    title: '日语问路对练',
    coachLine: '你在东京站迷路了，先问一下山手线怎么走。',
    suggestions: ['山手線は どこですか。', 'すみません、東京タワーは どちらですか。', 'ここで きっぷを かいますか。'],
    feedback: '先能问出来，比一次就说得很完美更重要。',
  },
  {
    id: 'rewrite',
    title: '语气修正对练',
    coachLine: '把 “I need this now.” 改得更像真人工作沟通。',
    suggestions: ['Could you send this over when you have a moment?', 'I need this now.', 'Would it be possible to share this today?'],
    feedback: 'Coach 的价值不只是纠错，而是帮你把语气拉回真实场景。',
  },
];

export function CoachConversation() {
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const [selectedReply, setSelectedReply] = useState<string | null>(null);

  const scenario = useMemo(() => scenarios.find((item) => item.id === scenarioId) ?? scenarios[0], [scenarioId]);

  return (
    <div className="coach-conversation-shell">
      <div className="coach-scenario-list">
        {scenarios.map((item) => (
          <button
            type="button"
            key={item.id}
            className={item.id === scenario.id ? 'coach-scenario-button active' : 'coach-scenario-button'}
            onClick={() => {
              setScenarioId(item.id);
              setSelectedReply(null);
            }}
          >
            <span className="soft-chip">Scenario</span>
            <strong>{item.title}</strong>
          </button>
        ))}
      </div>

      <div className="coach-chat-shell">
        <motion.article className="coach-message coach-bot" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="coach-avatar"><Bot size={16} /></div>
          <div>
            <strong>MochiBoom Coach</strong>
            <p>{scenario.coachLine}</p>
          </div>
        </motion.article>

        <AnimatePresence>
          {selectedReply && (
            <motion.article className="coach-message coach-user" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}>
              <div>
                <strong>You</strong>
                <p>{selectedReply}</p>
              </div>
            </motion.article>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedReply && (
            <motion.article className="coach-message coach-bot feedback" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
              <div className="coach-avatar sparkle"><Sparkles size={16} /></div>
              <div>
                <strong>即时反馈</strong>
                <p>{scenario.feedback}</p>
              </div>
            </motion.article>
          )}
        </AnimatePresence>

        <div className="coach-reply-grid">
          {scenario.suggestions.map((reply) => (
            <button key={reply} type="button" className={selectedReply === reply ? 'coach-reply active' : 'coach-reply'} onClick={() => setSelectedReply(reply)}>
              {reply}
            </button>
          ))}
        </div>

        <div className="coach-toolbar">
          <button type="button" className="secondary-cta review-action-button"><Mic2 size={16} /> 语音试说</button>
          <button type="button" className="primary-button fun-button review-action-button"><SendHorizonal size={16} /> 提交给 Coach</button>
        </div>
      </div>
    </div>
  );
}
