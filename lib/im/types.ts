export type ImUser = {
  id: string;
  displayName: string;
  avatarEmoji: string;
  statusText: string;
  streakDays: number;
};

export type ImGroup = {
  id: string;
  title: string;
  roomNote: string;
  onlineLabel: string;
  memberCount: number;
  preview: string;
};

export type ImOverview = {
  currentUser: ImUser;
  friends: ImUser[];
  groups: ImGroup[];
};

export type CreateImGroupInput = {
  title: string;
  roomNote: string;
  memberIds: string[];
};

export type SendImMessageInput = {
  threadId: string;
  senderUserId: string;
  body: string;
};
