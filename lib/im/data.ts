import type { ImOverview } from './types';

export const imSeed: ImOverview = {
  currentUser: {
    id: 'USR-001',
    displayName: 'You',
    avatarEmoji: '🦊',
    statusText: '今天继续冲 streak',
    streakDays: 12,
  },
  friends: [
    { id: 'USR-002', displayName: 'Mika', avatarEmoji: '☕', statusText: '在练 cafe roleplay', streakDays: 18 },
    { id: 'USR-003', displayName: 'Ren', avatarEmoji: '🗼', statusText: '今晚只练日语问路', streakDays: 9 },
    { id: 'USR-004', displayName: 'Nora', avatarEmoji: '🎤', statusText: '准备口语接龙', streakDays: 21 },
    { id: 'USR-005', displayName: 'Yuki', avatarEmoji: '🚇', statusText: '东京车站模式中', streakDays: 14 },
  ],
  groups: [
    {
      id: 'THR-101',
      title: 'English Night Owls',
      roomNote: '今夜主题：30 秒口语接龙',
      onlineLabel: '7 online',
      memberCount: 5,
      preview: 'Yann: 群里已经准备好围观你开口了，别跑。',
    },
    {
      id: 'THR-102',
      title: '東京迷路互助会',
      roomNote: '今夜主题：怎么优雅问路',
      onlineLabel: '12 online',
      memberCount: 5,
      preview: 'Aoi: 你先说，我来帮你挑最像母语者会说的版本。',
    },
  ],
};
