INSERT OR REPLACE INTO im_users (id, display_name, avatar_emoji, status_text, streak_days) VALUES
('USR-001', 'You', '🦊', '今天继续冲 streak', 12),
('USR-002', 'Mika', '☕', '在练 cafe roleplay', 18),
('USR-003', 'Ren', '🗼', '今晚只练日语问路', 9),
('USR-004', 'Nora', '🎤', '准备口语接龙', 21),
('USR-005', 'Yuki', '🚇', '东京车站模式中', 14),
('USR-006', 'Bo', '😼', '等你发最尴尬中式英语', 11),
('USR-007', 'Aoi', '🫧', '今天帮大家改语气', 16),
('USR-008', 'Yann', '🔥', '只想围观大家开口', 8);

INSERT OR REPLACE INTO im_friends (user_id, friend_user_id) VALUES
('USR-001', 'USR-002'), ('USR-001', 'USR-003'), ('USR-001', 'USR-004'), ('USR-001', 'USR-005');

INSERT OR REPLACE INTO im_threads (id, title, mode, room_note, online_label, created_at) VALUES
('THR-101', 'English Night Owls', 'group', '今夜主题：30 秒口语接龙', '7 online', '2026-04-14T12:00:00.000Z'),
('THR-102', '東京迷路互助会', 'group', '今夜主题：怎么优雅问路', '12 online', '2026-04-14T12:10:00.000Z');

INSERT OR REPLACE INTO im_thread_members (thread_id, user_id, role) VALUES
('THR-101', 'USR-001', 'member'), ('THR-101', 'USR-002', 'member'), ('THR-101', 'USR-004', 'member'), ('THR-101', 'USR-006', 'member'), ('THR-101', 'USR-008', 'member'),
('THR-102', 'USR-001', 'member'), ('THR-102', 'USR-003', 'member'), ('THR-102', 'USR-005', 'member'), ('THR-102', 'USR-007', 'member');

INSERT OR REPLACE INTO im_messages (id, thread_id, sender_user_id, body, created_at) VALUES
('MSG-101', 'THR-101', 'USR-004', '来个 30 秒自我介绍 challenge？', '2026-04-14T12:20:00.000Z'),
('MSG-102', 'THR-101', 'USR-006', '输的人发今天最尴尬的中式英语。', '2026-04-14T12:21:00.000Z'),
('MSG-103', 'THR-101', 'USR-002', '我先来：Hi, I am Mika and I survive on coffee and courage.', '2026-04-14T12:22:00.000Z'),
('MSG-104', 'THR-101', 'USR-008', '群里已经准备好围观你开口了，别跑。', '2026-04-14T12:23:00.000Z'),
('MSG-201', 'THR-102', 'USR-005', '今天主题：怎么问地铁换乘最自然。', '2026-04-14T12:30:00.000Z'),
('MSG-202', 'THR-102', 'USR-003', 'すみません、山手線はどこですか。 这句真的很常用。', '2026-04-14T12:31:00.000Z'),
('MSG-203', 'THR-102', 'USR-007', '别忘了先说 すみません，语气会柔很多。', '2026-04-14T12:32:00.000Z');
