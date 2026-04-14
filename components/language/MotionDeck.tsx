'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BrainCircuit, Flame, Layers3, Mic2, Sparkles, Star, Trophy, UserRound } from 'lucide-react';

type LearnCard = {
  title: string;
  body: string;
  href: string;
  cta: string;
  icon: keyof typeof iconMap;
};

type ReviewItem = {
  term: string;
  gloss: string;
  badge: string;
};

type CoachPrompt = {
  title: string;
  description: string;
  badge: string;
};

type ProfileStat = {
  label: string;
  value: string;
  icon: keyof typeof iconMap;
};

const iconMap = {
  sparkles: Sparkles,
  mic: Mic2,
  layers: Layers3,
  flame: Flame,
  brain: BrainCircuit,
  trophy: Trophy,
  star: Star,
  user: UserRound,
};

const container = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      duration: 0.35,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32 } },
};

export function LearnDeck({ cards }: { cards: LearnCard[] }) {
  return (
    <motion.div className="hub-grid" variants={container} initial="hidden" animate="show">
      {cards.map((card) => {
        const Icon = iconMap[card.icon];
        return (
          <motion.article key={card.title} className="hub-card" variants={item} whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }}>
            <div className="hub-card-icon"><Icon size={22} /></div>
            <strong>{card.title}</strong>
            <p className="muted">{card.body}</p>
            <Link href={card.href} className="primary-cta hub-card-cta">{card.cta}</Link>
          </motion.article>
        );
      })}
    </motion.div>
  );
}

export function ReviewDeck({ items }: { items: ReviewItem[] }) {
  return (
    <motion.div className="hub-grid" variants={container} initial="hidden" animate="show">
      {items.map((entry, index) => (
        <motion.article key={entry.term} className="hub-card review-card" variants={item} whileHover={{ rotate: index % 2 === 0 ? -2 : 2, y: -4 }}>
          <span className="soft-chip">{entry.badge}</span>
          <strong>{entry.term}</strong>
          <p className="muted">{entry.gloss}</p>
          <div className="review-pips">
            <span />
            <span />
            <span />
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

export function CoachDeck({ prompts }: { prompts: CoachPrompt[] }) {
  return (
    <motion.div className="hub-grid" variants={container} initial="hidden" animate="show">
      {prompts.map((prompt) => (
        <motion.article key={prompt.title} className="hub-card coach-card" variants={item} whileHover={{ y: -5, scale: 1.01 }}>
          <span className="soft-chip">{prompt.badge}</span>
          <strong>{prompt.title}</strong>
          <p className="muted">{prompt.description}</p>
          <button type="button" className="primary-button fun-button">开始对练</button>
        </motion.article>
      ))}
    </motion.div>
  );
}

export function MeDeck({ stats }: { stats: ProfileStat[] }) {
  return (
    <motion.div className="profile-grid" variants={container} initial="hidden" animate="show">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon];
        return (
          <motion.article key={stat.label} className="profile-stat-card" variants={item} whileHover={{ y: -5 }}>
            <div className="hub-card-icon"><Icon size={20} /></div>
            <strong>{stat.value}</strong>
            <p className="muted">{stat.label}</p>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
