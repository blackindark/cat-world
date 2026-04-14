CREATE TABLE IF NOT EXISTS im_users (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  avatar_emoji TEXT NOT NULL,
  status_text TEXT NOT NULL,
  streak_days INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS im_friends (
  user_id TEXT NOT NULL,
  friend_user_id TEXT NOT NULL,
  PRIMARY KEY (user_id, friend_user_id),
  FOREIGN KEY (user_id) REFERENCES im_users(id),
  FOREIGN KEY (friend_user_id) REFERENCES im_users(id)
);

CREATE TABLE IF NOT EXISTS im_threads (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  mode TEXT NOT NULL,
  room_note TEXT NOT NULL,
  online_label TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS im_thread_members (
  thread_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  PRIMARY KEY (thread_id, user_id),
  FOREIGN KEY (thread_id) REFERENCES im_threads(id),
  FOREIGN KEY (user_id) REFERENCES im_users(id)
);

CREATE TABLE IF NOT EXISTS im_messages (
  id TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL,
  sender_user_id TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (thread_id) REFERENCES im_threads(id),
  FOREIGN KEY (sender_user_id) REFERENCES im_users(id)
);

CREATE INDEX IF NOT EXISTS idx_im_friends_user_id ON im_friends(user_id);
CREATE INDEX IF NOT EXISTS idx_im_thread_members_user_id ON im_thread_members(user_id);
CREATE INDEX IF NOT EXISTS idx_im_messages_thread_id_created_at ON im_messages(thread_id, created_at);
