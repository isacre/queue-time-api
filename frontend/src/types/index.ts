export type UserType = {
  id: string;
  name: string;
  token: string;
};

export type QueueType = {
  id: number;
  name: string;
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type QueueItemType = {
  id: number;
  queueId: number;
  text: string;
  position: number;
  createdAt: string;
  updatedAt: string;
};
