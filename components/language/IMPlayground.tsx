'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircleMore, Mic2, Send, Sparkles, Users } from 'lucide-react';

type ChatMode = 'direct' | 'group';

type Message = {
  id: string;
  sender: string;
  text: string;
  mine?: boolean;
};

type Thread = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  online: string;
  messages: Message[];
};

const initialDirectThreads: Thread[] = [
  {
    id: 'dm-1',
    title: 'Mika · English buddy',
    subtitle: '刚刚催你去完成口语 streak',
    badge: '1v1',
    online: 'online',
    messages: [
      { id: 'd1', sender: 'Mika', text: '今晚要不要一起练点餐英语？' },
      { id: 'd2', sender: 'You', text: '可以，我想顺便练一下更自然的语气。', mine: true },
      { id: 'd3', sender: 'Mika', text: '那我先发你一句更像真人会说的版本。' },
    ],
  },
  {
    id: 'dm-2',
    title: 'Ren · 日本語 teammate',
    subtitle: '分享了一个旅行问路句型',
    badge: '1v1',
    online: 'typing…',
    messages: [
      { id: 'd4', sender: 'Ren', text: '駅は どこですか 这句我今天终于顺口了。' },
      { id: 'd5', sender: 'You', text: '我还在跟语调打架。', mine: true },
    ],
  },
];

const initialGroupThreads: Thread[] = [
  {
    id: 'grp-1',
    title: 'English Night Owls',
    subtitle: '7 人在线 · 深夜口语群',
    badge: 'Group',
    online: '7 online',
    messages: [
      { id: 'g1', sender: 'Nora', text: '来个 30 秒自我介绍 challenge？' },
      { id: 'g2', sender: 'Bo', text: '输的人发今天最尴尬的中式英语。' },
      { id: 'g3', sender: 'You', text: '我准备好了，但请先别嘲笑我。', mine: true },
    ],
  },
  {
    id: 'grp-2',
    title: '東京迷路互助会',
    subtitle: '12 人在线 · 日语旅行群',
    badge: 'Group',
    online: '12 online',
    messages: [
      { id: 'g4', sender: 'Yuki', text: '今天主题：怎么问地铁换乘最自然。' },
      { id: 'g5', sender: 'Sena', text: '我先来一句，大家帮我挑毛病。' },
    ],
  },
];

const quickReplies = [
  '来，直接开口练一轮',
  '这句我想再自然一点',
  '谁来陪我冲 streak',
  '发一个更地道的版本给我',
];

export function IMPlayground() {
  const [mode, setMode] = useState<ChatMode>('direct');
  const [directThreads, setDirectThreads] = useState(initialDirectThreads);
  const [groupThreads, setGroupThreads] = useState(initialGroupThreads);
  const [selectedId, setSelectedId] = useState('dm-1');
  const [draft, setDraft] = useState('');

  const threads = mode === 'direct' ? directThreads : groupThreads;

  const selectedThread = useMemo(() => {
    return threads.find((thread) => thread.id === selectedId) ?? threads[0];
  }, [threads, selectedId]);

  function switchMode(nextMode: ChatMode) {
    setMode(nextMode);
    setSelectedId(nextMode === 'direct' ? initialDirectThreads[0].id : initialGroupThreads[0].id);
    setDraft('');
  }

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;

    const nextMessage = {
      id: `${selectedId}-${Date.now()}`,
      sender: 'You',
      text,
      mine: true,
    };

    if (mode === 'direct') {
      setDirectThreads((current) =>
        current.map((thread) =>
          thread.id === selectedId
            ? {
                ...thread,
                subtitle: '刚刚收到一条新消息',
                messages: [...thread.messages, nextMessage],
              }
            : thread,
        ),
      );
    } else {
      setGroupThreads((current) =>
        current.map((thread) =>
          thread.id === selectedId
            ? {
                ...thread,
                subtitle: '刚刚收到一条新消息',
                messages: [...thread.messages, nextMessage],
              }
            : thread,
        ),
      );
    }

    setDraft('');
  }

  return (
    <div className="im-shell">
      <div className="im-sidebar">
        <div className="im-mode-switch" role="tablist" aria-label="chat mode switch">
          <button type="button" className={mode === 'direct' ? 'im-mode active' : 'im-mode'} onClick={() => switchMode('direct')}>
            <MessageCircleMore size={16} /> 私聊
          </button>
          <button type="button" className={mode === 'group' ? 'im-mode active' : 'im-mode'} onClick={() => switchMode('group')}>
            <Users size={16} /> 群聊
          </button>
        </div>

        <div className="im-thread-list">
          {threads.map((thread) => (
            <button
              type="button"
              key={thread.id}
              className={thread.id === selectedThread.id ? 'im-thread active' : 'im-thread'}
              onClick={() => setSelectedId(thread.id)}
            >
              <div className="im-thread-topline">
                <span className="soft-chip">{thread.badge}</span>
                <span className="im-presence">{thread.online}</span>
              </div>
              <strong>{thread.title}</strong>
              <p className="muted">{thread.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="im-chat-panel">
        <div className="im-chat-header">
          <div>
            <strong>{selectedThread.title}</strong>
            <p className="muted">{selectedThread.subtitle}</p>
          </div>
          <span className="soft-chip">Mood sync on</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedThread.id}
            className="im-message-list"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {selectedThread.messages.map((message) => (
              <motion.article
                key={message.id}
                className={message.mine ? 'im-message mine' : 'im-message'}
                initial={{ opacity: 0, x: message.mine ? 12 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22 }}
              >
                <p className="im-message-sender">{message.sender}</p>
                <strong>{message.text}</strong>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="im-quick-replies">
          {quickReplies.map((reply) => (
            <button type="button" key={reply} className="im-chip" onClick={() => setDraft(reply)}>
              <Sparkles size={14} /> {reply}
            </button>
          ))}
        </div>

        <div className="im-compose-toolbar">
          <span className="soft-chip">练习房可直接拉好友</span>
          <button type="button" className="secondary-cta review-action-button"><Mic2 size={16} /> 语音草稿</button>
        </div>

        <div className="im-compose">
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={mode === 'direct' ? '发一句更自然的表达给好友…' : '在群里发起一轮挑战…'}
            rows={3}
          />
          <button type="button" className="primary-button fun-button im-send-button" onClick={sendMessage}>
            <Send size={16} /> 发送
          </button>
        </div>
      </div>
    </div>
  );
}
