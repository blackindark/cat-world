'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, MessageCircleMore, Mic2, Search, Send, Sparkles, Users } from 'lucide-react';
import type { ImOverview } from '@/lib/im/types';

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
  roomNote?: string;
  participants?: string[];
  unread?: number;
  messages: Message[];
};

type PersistedState = {
  mode?: ChatMode;
  directThreads?: Thread[];
  groupThreads?: Thread[];
  selectedId?: string;
};

const STORAGE_KEY = 'lingo-sprint-im-state-v3';

const initialDirectThreads: Thread[] = [
  {
    id: 'dm-1',
    title: 'Mika · English buddy',
    subtitle: '刚刚催你去完成口语 streak',
    badge: '1v1',
    online: 'online',
    unread: 0,
    participants: ['You', 'Mika'],
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
    unread: 2,
    participants: ['You', 'Ren'],
    messages: [
      { id: 'd4', sender: 'Ren', text: '駅は どこですか 这句我今天终于顺口了。' },
      { id: 'd5', sender: 'You', text: '我还在跟语调打架。', mine: true },
      { id: 'd6', sender: 'Ren', text: '你可以先把语调做得夸张一点，反而更容易记住。' },
    ],
  },
];

const quickReplies = [
  '来，直接开口练一轮',
  '这句我想再自然一点',
  '谁来陪我冲 streak',
  '发一个更地道的版本给我',
];

const directAutoReplies: Record<string, string[]> = {
  'dm-1': [
    '那你先说一句，我来帮你把语气修顺。',
    '我觉得你今晚完全可以冲一轮 cafe roleplay。',
    '把你刚刚那句发我，我给你改成更自然的版本。',
  ],
  'dm-2': [
    '你可以先把语调拉高一点，再慢慢收回来。',
    '我陪你练一轮问路句，先别怕卡壳。',
    '把你想说的中文发我，我帮你转成自然日语。',
  ],
};

const groupAutoReplies: Record<string, { sender: string; text: string }[]> = {
  'THR-101': [
    { sender: 'Nora', text: '我看到新消息了，谁先来做 30 秒英语口语接龙？' },
    { sender: 'Bo', text: '这句有戏，顺手再补一个更口语化版本？' },
    { sender: 'Mika', text: '我来当你的临时口语搭子，直接接着说。' },
    { sender: 'Yann', text: '群里已经准备好围观你开口了，别跑。' },
  ],
  'THR-102': [
    { sender: 'Yuki', text: '这个表达已经挺自然了，可以再柔一点。' },
    { sender: 'Sena', text: '我给你补一个旅行里更常用的说法。' },
    { sender: 'Ren', text: '这句放在车站场景很实用，我刚好昨天用过。' },
    { sender: 'Aoi', text: '你先说，我来帮你挑最像日语母语者会说的版本。' },
  ],
};

function pickOne<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function buildSeededGroupThreads(overview: ImOverview): Thread[] {
  const knownMessages: Record<string, Message[]> = {
    'THR-101': [
      { id: 'g1', sender: 'Nora', text: '来个 30 秒自我介绍 challenge？' },
      { id: 'g2', sender: 'Bo', text: '输的人发今天最尴尬的中式英语。' },
      { id: 'g3', sender: 'Mika', text: '我先来：Hi, I am Mika and I survive on coffee and last-minute courage.' },
      { id: 'g4', sender: 'You', text: '我准备好了，但请先别嘲笑我。', mine: true },
      { id: 'g5', sender: 'Yann', text: '笑不会，起哄会。你先开口。' },
    ],
    'THR-102': [
      { id: 'g6', sender: 'Yuki', text: '今天主题：怎么问地铁换乘最自然。' },
      { id: 'g7', sender: 'Sena', text: '我先来一句，大家帮我挑毛病。' },
      { id: 'g8', sender: 'Ren', text: 'すみません、山手線はどこですか。 这句真的很常用。' },
      { id: 'g9', sender: 'Aoi', text: '别忘了先说 すみません，语气会柔很多。' },
    ],
  };

  const knownParticipants: Record<string, string[]> = {
    'THR-101': ['Nora', 'Bo', 'Mika', 'Yann', 'You'],
    'THR-102': ['Yuki', 'Sena', 'Ren', 'Aoi', 'You'],
  };

  return overview.groups.map((group) => ({
    id: group.id,
    title: group.title,
    subtitle: group.preview,
    badge: 'Group',
    online: group.onlineLabel,
    roomNote: group.roomNote,
    participants: knownParticipants[group.id] ?? ['You', ...overview.friends.slice(0, 2).map((friend) => friend.displayName)],
    unread: 0,
    messages: knownMessages[group.id] ?? [{ id: `${group.id}-seed`, sender: 'System', text: group.preview }],
  }));
}

function mergeThreads(base: Thread[], incoming: Thread[]) {
  const map = new Map(base.map((thread) => [thread.id, thread]));
  for (const thread of incoming) {
    if (map.has(thread.id)) {
      map.set(thread.id, {
        ...map.get(thread.id)!,
        title: thread.title,
        subtitle: thread.subtitle,
        online: thread.online,
        roomNote: thread.roomNote,
        participants: thread.participants ?? map.get(thread.id)!.participants,
      });
    } else {
      map.set(thread.id, thread);
    }
  }
  return Array.from(map.values());
}

export function IMPlayground({ overview }: { overview: ImOverview }) {
  const seededGroupThreads = useMemo(() => buildSeededGroupThreads(overview), [overview]);
  const [mode, setMode] = useState<ChatMode>('direct');
  const [directThreads, setDirectThreads] = useState(initialDirectThreads);
  const [groupThreads, setGroupThreads] = useState(seededGroupThreads);
  const [selectedId, setSelectedId] = useState('dm-1');
  const [draft, setDraft] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [threadQuery, setThreadQuery] = useState('');
  const messageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setGroupThreads(seededGroupThreads);
        setHydrated(true);
        return;
      }
      const parsed = JSON.parse(raw) as PersistedState;
      if (parsed.mode) setMode(parsed.mode);
      if (parsed.directThreads?.length) setDirectThreads(parsed.directThreads);
      if (parsed.groupThreads?.length) {
        setGroupThreads(mergeThreads(parsed.groupThreads, seededGroupThreads));
      } else {
        setGroupThreads(seededGroupThreads);
      }
      if (parsed.selectedId) setSelectedId(parsed.selectedId);
    } catch {
      setGroupThreads(seededGroupThreads);
    } finally {
      setHydrated(true);
    }
  }, [seededGroupThreads]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ mode, directThreads, groupThreads, selectedId }),
    );
  }, [hydrated, mode, directThreads, groupThreads, selectedId]);

  const threads = mode === 'direct' ? directThreads : groupThreads;
  const filteredThreads = useMemo(() => {
    const query = threadQuery.trim().toLowerCase();
    if (!query) return threads;
    return threads.filter((thread) => `${thread.title} ${thread.subtitle} ${thread.roomNote ?? ''}`.toLowerCase().includes(query));
  }, [threadQuery, threads]);

  const selectedThread = useMemo(() => {
    return threads.find((thread) => thread.id === selectedId) ?? filteredThreads[0] ?? threads[0];
  }, [threads, selectedId, filteredThreads]);

  useEffect(() => {
    if (!messageListRef.current) return;
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [selectedThread]);

  function switchMode(nextMode: ChatMode) {
    setMode(nextMode);
    setSelectedId(nextMode === 'direct' ? initialDirectThreads[0].id : (groupThreads[0]?.id ?? seededGroupThreads[0]?.id ?? ''));
    setDraft('');
    setThreadQuery('');
  }

  function markRead(threadId: string, nextMode: ChatMode) {
    if (nextMode === 'direct') {
      setDirectThreads((current) => current.map((thread) => (thread.id === threadId ? { ...thread, unread: 0 } : thread)));
    } else {
      setGroupThreads((current) => current.map((thread) => (thread.id === threadId ? { ...thread, unread: 0 } : thread)));
    }
  }

  function queueReply(threadId: string, currentMode: ChatMode) {
    const delay = currentMode === 'group' ? 900 : 1200;
    window.setTimeout(() => {
      if (currentMode === 'direct') {
        const text = pickOne(directAutoReplies[threadId] ?? ['收到，我来陪你继续练。']);
        const sender = threadId === 'dm-2' ? 'Ren' : 'Mika';
        setDirectThreads((current) =>
          current.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  subtitle: '对方刚刚回复了你',
                  unread: thread.id === selectedId && mode === 'direct' ? 0 : (thread.unread ?? 0) + 1,
                  messages: [...thread.messages, { id: `${thread.id}-${Date.now()}`, sender, text }],
                }
              : thread,
          ),
        );
      } else {
        const payload = pickOne(groupAutoReplies[threadId] ?? [{ sender: 'Teammate', text: '群里正在等你下一句。' }]);
        setGroupThreads((current) =>
          current.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  subtitle: `${payload.sender} 刚刚在群里接话了`,
                  unread: thread.id === selectedId && mode === 'group' ? 0 : (thread.unread ?? 0) + 1,
                  messages: [...thread.messages, { id: `${thread.id}-${Date.now()}`, sender: payload.sender, text: payload.text }],
                }
              : thread,
          ),
        );
      }
    }, delay);
  }

  function sendMessage() {
    const text = draft.trim();
    if (!text || !selectedThread) return;

    const nextMessage: Message = {
      id: `${selectedThread.id}-${Date.now()}`,
      sender: 'You',
      text,
      mine: true,
    };

    if (mode === 'direct') {
      setDirectThreads((current) =>
        current.map((thread) =>
          thread.id === selectedThread.id
            ? {
                ...thread,
                subtitle: '你刚刚发出一条消息',
                unread: 0,
                messages: [...thread.messages, nextMessage],
              }
            : thread,
        ),
      );
    } else {
      setGroupThreads((current) =>
        current.map((thread) =>
          thread.id === selectedThread.id
            ? {
                ...thread,
                subtitle: '你刚刚在群里发言',
                unread: 0,
                messages: [...thread.messages, nextMessage],
              }
            : thread,
        ),
      );
    }

    queueReply(selectedThread.id, mode);
    setDraft('');
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage();
  }

  function resetConversations() {
    window.localStorage.removeItem(STORAGE_KEY);
    setMode('direct');
    setDirectThreads(initialDirectThreads);
    setGroupThreads(seededGroupThreads);
    setSelectedId(initialDirectThreads[0].id);
    setDraft('');
    setThreadQuery('');
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

        <label className="im-search-box">
          <Search size={16} />
          <input value={threadQuery} onChange={(event) => setThreadQuery(event.target.value)} placeholder={mode === 'direct' ? '搜索好友会话' : '搜索群聊和主题'} />
        </label>

        <div className="im-thread-list">
          {filteredThreads.map((thread) => (
            <button
              type="button"
              key={thread.id}
              className={thread.id === selectedThread?.id ? 'im-thread active' : 'im-thread'}
              onClick={() => {
                setSelectedId(thread.id);
                markRead(thread.id, mode);
              }}
            >
              <div className="im-thread-topline">
                <div className="im-thread-badges">
                  <span className="soft-chip">{thread.badge}</span>
                  {thread.roomNote ? (
                    <span className="soft-chip subtle-chip"><Hash size={12} /> 房间</span>
                  ) : null}
                </div>
                <div className="im-thread-meta">
                  <span className="im-presence">{thread.online}</span>
                  {(thread.unread ?? 0) > 0 ? <span className="im-unread-pill">{thread.unread}</span> : null}
                </div>
              </div>
              <strong>{thread.title}</strong>
              <p className="muted">{thread.subtitle}</p>
            </button>
          ))}
          {filteredThreads.length === 0 ? <p className="muted">没有匹配的会话，试试换个关键词。</p> : null}
        </div>
      </div>

      {selectedThread ? (
        <div className="im-chat-panel">
          <div className="im-chat-header">
            <div>
              <strong>{selectedThread.title}</strong>
              <p className="muted">{selectedThread.subtitle}</p>
              {selectedThread.roomNote ? <p className="im-room-note">#{selectedThread.roomNote}</p> : null}
            </div>
            <span className="soft-chip">Mood sync on</span>
          </div>

          {selectedThread.participants?.length ? (
            <div className="im-participants-row">
              {selectedThread.participants.map((name) => (
                <span key={name} className="im-chip participant-chip">
                  <Users size={12} /> {name}
                </span>
              ))}
            </div>
          ) : null}

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedThread.id}
              ref={messageListRef}
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
            <div className="im-toolbar-actions">
              <button type="button" className="secondary-cta review-action-button"><Mic2 size={16} /> 语音草稿</button>
              <button type="button" className="secondary-cta review-action-button" onClick={resetConversations}>重置会话</button>
            </div>
          </div>

          <form className="im-compose" onSubmit={handleSubmit}>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={mode === 'direct' ? '发一句更自然的表达给好友…' : '在群里发起一轮挑战…'}
              rows={3}
            />
            <button type="submit" className="primary-button fun-button im-send-button">
              <Send size={16} /> 发送
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
