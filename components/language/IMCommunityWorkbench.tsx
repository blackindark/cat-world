'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import { Users } from 'lucide-react';
import type { ImOverview } from '@/lib/im/types';

export function IMCommunityWorkbench({ overview }: { overview: ImOverview }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<string[]>(overview.friends.slice(0, 2).map((friend) => friend.id));

  const friendIds = useMemo(() => new Set(selectedMembers), [selectedMembers]);

  async function createGroup(formData: FormData) {
    setError(null);
    setMessage(null);
    const title = String(formData.get('title') ?? '').trim();
    const roomNote = String(formData.get('roomNote') ?? '').trim();
    if (!title || !roomNote) {
      setError('群名称和群主题都要填。');
      return;
    }

    const response = await fetch('/api/im/groups', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title, roomNote, memberIds: selectedMembers }),
    });

    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error ?? '创建群聊失败');
      return;
    }

    setMessage(`群聊 ${payload.title} 已创建。`);
    startTransition(() => router.refresh());
  }

  function toggleMember(id: string) {
    setSelectedMembers((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <div className="community-grid">
      <section className="panel community-card">
        <div className="section-header">
          <div>
            <h3>好友列表</h3>
            <p className="muted">这些数据现在已经可以从 D1 读出来，后面可以继续接搜索、邀请和备注。</p>
          </div>
        </div>
        <div className="friend-grid">
          {overview.friends.map((friend) => (
            <article key={friend.id} className="friend-card">
              <div className="friend-avatar">{friend.avatarEmoji}</div>
              <div>
                <strong>{friend.displayName}</strong>
                <p className="muted">{friend.statusText}</p>
              </div>
              <span className="soft-chip">{friend.streakDays} 天</span>
            </article>
          ))}
        </div>
      </section>

      <section className="panel community-card">
        <div className="section-header">
          <div>
            <h3>建群工作台</h3>
            <p className="muted">先把创建群聊这个动作打通，后面继续接邀请和群设置。</p>
          </div>
        </div>
        <form
          className="erp-form"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            void createGroup(formData);
          }}
        >
          <label>
            <span>群名称</span>
            <input name="title" placeholder="比如：周末英语摸鱼团" required />
          </label>
          <label>
            <span>群主题</span>
            <input name="roomNote" placeholder="比如：每晚 10 分钟口语接龙" required />
          </label>
          <div className="member-pick-grid">
            {overview.friends.map((friend) => (
              <button
                type="button"
                key={friend.id}
                className={friendIds.has(friend.id) ? 'member-pill active' : 'member-pill'}
                onClick={() => toggleMember(friend.id)}
              >
                <Users size={14} /> {friend.displayName}
              </button>
            ))}
          </div>
          <button className="primary-button fun-button" disabled={isPending} type="submit">
            {isPending ? '创建中…' : '创建群聊'}
          </button>
          {message ? <p className="form-message success">{message}</p> : null}
          {error ? <p className="form-message error">{error}</p> : null}
        </form>
      </section>
    </div>
  );
}
