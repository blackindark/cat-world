import { executeRun, getD1Database, queryAll, queryFirst, requireD1Database } from '@/lib/supply-chain/d1';
import { imSeed } from './data';
import type { CreateImGroupInput, ImGroup, ImOverview, ImUser, SendImMessageInput } from './types';

type UserRow = { id: string; display_name: string; avatar_emoji: string; status_text: string; streak_days: number };
type GroupRow = { id: string; title: string; room_note: string; online_label: string; member_count: number; preview: string };

const CURRENT_USER_ID = 'USR-001';

export async function getImOverview(): Promise<ImOverview> {
  const db = await getD1Database();
  if (!db) return imSeed;

  try {
    const currentUser = await queryFirst<UserRow>(db, 'SELECT * FROM im_users WHERE id = ?', CURRENT_USER_ID);
    if (!currentUser) return imSeed;

    const friends = await queryAll<UserRow>(
      db,
      `SELECT u.*
         FROM im_friends f
         JOIN im_users u ON u.id = f.friend_user_id
        WHERE f.user_id = ?
        ORDER BY u.display_name`,
      CURRENT_USER_ID,
    );

    const groups = await queryAll<GroupRow>(
      db,
      `SELECT t.id, t.title, t.room_note, t.online_label,
              COUNT(m.user_id) AS member_count,
              COALESCE((
                SELECT sender.display_name || ': ' || msg.body
                  FROM im_messages msg
                  JOIN im_users sender ON sender.id = msg.sender_user_id
                 WHERE msg.thread_id = t.id
                 ORDER BY msg.created_at DESC
                 LIMIT 1
              ), '还没有消息，快来当第一个开口的人。') AS preview
         FROM im_threads t
         JOIN im_thread_members m ON m.thread_id = t.id
        WHERE t.mode = 'group'
          AND t.id IN (SELECT thread_id FROM im_thread_members WHERE user_id = ?)
        GROUP BY t.id, t.title, t.room_note, t.online_label
        ORDER BY t.created_at DESC`,
      CURRENT_USER_ID,
    );

    return {
      currentUser: mapUser(currentUser),
      friends: friends.map(mapUser),
      groups: groups.map(mapGroup),
    };
  } catch {
    return imSeed;
  }
}

export async function createImGroup(input: CreateImGroupInput): Promise<ImGroup> {
  const db = await requireD1Database();
  const id = createId('THR');
  const createdAt = new Date().toISOString();
  const allMemberIds = Array.from(new Set([CURRENT_USER_ID, ...input.memberIds.filter(Boolean)]));

  await executeRun(
    db,
    'INSERT INTO im_threads (id, title, mode, room_note, online_label, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    id,
    input.title.trim(),
    'group',
    input.roomNote.trim(),
    `${allMemberIds.length} online`,
    createdAt,
  );

  for (const memberId of allMemberIds) {
    await executeRun(
      db,
      'INSERT INTO im_thread_members (thread_id, user_id, role) VALUES (?, ?, ?)',
      id,
      memberId,
      memberId === CURRENT_USER_ID ? 'owner' : 'member',
    );
  }

  return {
    id,
    title: input.title.trim(),
    roomNote: input.roomNote.trim(),
    onlineLabel: `${allMemberIds.length} online`,
    memberCount: allMemberIds.length,
    preview: '新群已建立，等你发第一条消息。',
  };
}

export async function sendImMessage(input: SendImMessageInput) {
  const db = await requireD1Database();
  const id = createId('MSG');
  const createdAt = new Date().toISOString();
  await executeRun(
    db,
    'INSERT INTO im_messages (id, thread_id, sender_user_id, body, created_at) VALUES (?, ?, ?, ?, ?)',
    id,
    input.threadId,
    input.senderUserId,
    input.body.trim(),
    createdAt,
  );
  return { id, createdAt };
}

function mapUser(row: UserRow): ImUser {
  return {
    id: row.id,
    displayName: row.display_name,
    avatarEmoji: row.avatar_emoji,
    statusText: row.status_text,
    streakDays: row.streak_days,
  };
}

function mapGroup(row: GroupRow): ImGroup {
  return {
    id: row.id,
    title: row.title,
    roomNote: row.room_note,
    onlineLabel: row.online_label,
    memberCount: row.member_count,
    preview: row.preview,
  };
}

function createId(prefix: string) {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${random}`;
}
