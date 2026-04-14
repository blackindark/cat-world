export type Mission = {
  id: string;
  title: string;
  type: 'speak' | 'listen' | 'match' | 'write';
  prompt: string;
  helper: string;
  cta: string;
};

export type Lesson = {
  slug: string;
  title: string;
  xp: number;
  duration: string;
  focus: string;
  completed: boolean;
  locked?: boolean;
  missions: Mission[];
};

export type LanguageTrack = {
  slug: 'english' | 'japanese';
  name: string;
  nativeName: string;
  level: string;
  streakGoal: string;
  accent: 'emerald' | 'sky';
  headline: string;
  summary: string;
  stats: {
    units: number;
    masteredWords: number;
    speakingScore: string;
    streakDays: number;
  };
  habits: string[];
  lessons: Lesson[];
};

export const languageTracks: LanguageTrack[] = [
  {
    slug: 'english',
    name: 'English Sprint',
    nativeName: '英语',
    level: 'A1 → B2',
    streakGoal: '每日 12 分钟',
    accent: 'emerald',
    headline: '从高频英语场景出发，优先把“听得懂、敢开口、能复述”练出来。',
    summary: '适合先补口语和日常交流能力。课程围绕吃饭、出行、办公、会议、邮件、社交寒暄这些真实场景推进。',
    stats: {
      units: 8,
      masteredWords: 320,
      speakingScore: '91/100',
      streakDays: 12,
    },
    habits: ['晨间 3 分钟口语热身', '午间 1 次听力 shadowing', '晚间 streak 保底复习'],
    lessons: [
      {
        slug: 'ordering-food',
        title: 'Ordering Food',
        xp: 30,
        duration: '5 min',
        focus: '点餐 / polite requests',
        completed: true,
        missions: [
          {
            id: 'en-food-1',
            title: 'Listen first',
            type: 'listen',
            prompt: '听服务员的问题，然后选出最自然的回应。',
            helper: '训练你先听懂，再做口头反应。',
            cta: '开始听题',
          },
          {
            id: 'en-food-2',
            title: 'Speak naturally',
            type: 'speak',
            prompt: '跟读 “Can I get an oat latte and a bagel?”，系统会标注连读和重音。',
            helper: '优先训练语调，不只看单词对不对。',
            cta: '开始跟读',
          },
        ],
      },
      {
        slug: 'small-talk-at-work',
        title: 'Small Talk at Work',
        xp: 35,
        duration: '6 min',
        focus: '办公室寒暄 / 轻沟通',
        completed: false,
        missions: [
          {
            id: 'en-work-1',
            title: 'Phrase match',
            type: 'match',
            prompt: '把 “How was your weekend?” 和最自然的回答匹配起来。',
            helper: '先掌握职场里最常见的轻对话模板。',
            cta: '开始配对',
          },
          {
            id: 'en-work-2',
            title: 'Rewrite politely',
            type: 'write',
            prompt: '把 “I need this now.” 改写成更自然的工作表达。',
            helper: '训练礼貌表达和真实语感。',
            cta: '开始改写',
          },
        ],
      },
      {
        slug: 'travel-check-in',
        title: 'Travel Check-in',
        xp: 40,
        duration: '7 min',
        focus: '酒店 / 出行场景',
        completed: false,
        locked: true,
        missions: [
          {
            id: 'en-travel-1',
            title: 'Scenario drill',
            type: 'speak',
            prompt: '模拟酒店前台 check-in，对照提示完成 3 轮口语互动。',
            helper: '进入真实场景训练。',
            cta: '进入场景',
          },
        ],
      },
    ],
  },
  {
    slug: 'japanese',
    name: 'Japanese Quest',
    nativeName: '日语',
    level: 'N5 → N3',
    streakGoal: '每日 10 分钟',
    accent: 'sky',
    headline: '先把假名、基础句型和旅行会话打稳，再往 JLPT 高频词和表达升级。',
    summary: '适合从零开始入门，也适合重新捡起日语。课程从平假名、片假名、です/ます 句型和常用问答切入。',
    stats: {
      units: 6,
      masteredWords: 180,
      speakingScore: '84/100',
      streakDays: 9,
    },
    habits: ['通勤 20 个假名快刷', '午后 1 次句型复述', '睡前 1 节旅行会话微课'],
    lessons: [
      {
        slug: 'kana-warmup',
        title: 'Kana Warmup',
        xp: 24,
        duration: '4 min',
        focus: '平假名识别 / 发音',
        completed: true,
        missions: [
          {
            id: 'jp-kana-1',
            title: 'Swipe review',
            type: 'match',
            prompt: '快速判断 か / き / く / け / こ 的发音与字形。',
            helper: '先用高频重复建立熟悉度。',
            cta: '开始快刷',
          },
          {
            id: 'jp-kana-2',
            title: 'Read aloud',
            type: 'speak',
            prompt: '跟读 さしすせそ，系统提示嘴型和音长。',
            helper: '避免一开始就把音读平。',
            cta: '开始跟读',
          },
        ],
      },
      {
        slug: 'restaurant-basics',
        title: 'Restaurant Basics',
        xp: 32,
        duration: '5 min',
        focus: '餐厅常用句 / です・ます',
        completed: false,
        missions: [
          {
            id: 'jp-restaurant-1',
            title: 'Listen & choose',
            type: 'listen',
            prompt: '听「おすすめは何ですか」，选出正确意思。',
            helper: '先建立旅行中最有用的听力反应。',
            cta: '开始听题',
          },
          {
            id: 'jp-restaurant-2',
            title: 'Build sentence',
            type: 'write',
            prompt: '把「これ / お願いします」拼成完整表达。',
            helper: '从碎片记忆过渡到整句输出。',
            cta: '开始拼句',
          },
        ],
      },
      {
        slug: 'station-navigation',
        title: 'Station Navigation',
        xp: 38,
        duration: '6 min',
        focus: '问路 / 交通词汇',
        completed: false,
        locked: true,
        missions: [
          {
            id: 'jp-station-1',
            title: 'Travel roleplay',
            type: 'speak',
            prompt: '模拟车站问路，对话完成后再做关键句复述。',
            helper: '用旅行场景巩固问路句型。',
            cta: '进入练习',
          },
        ],
      },
    ],
  },
];

export function getLanguageTrack(slug: string) {
  return languageTracks.find((track) => track.slug === slug);
}

export function getLesson(trackSlug: string, lessonSlug: string) {
  const track = getLanguageTrack(trackSlug);
  return track?.lessons.find((lesson) => lesson.slug === lessonSlug);
}
