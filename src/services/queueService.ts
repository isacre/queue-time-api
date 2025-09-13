import prisma from "../db";
import type { Queue, QueueItem } from "../generated/prisma";

export async function createQueue(
  queue: {
    name: string;
  },
  userId: number
): Promise<Queue> {
  const newQueue = await prisma.queue.create({
    data: { name: queue.name, userId: userId },
  });
  if (!newQueue) throw new Error("Failed to create queue");

  return newQueue;
}

export async function getQueues(userId: number): Promise<Queue[]> {
  const queues = await prisma.queue.findMany({ where: { userId } });
  if (!queues) throw new Error("Failed to get queues");
  return queues;
}

export async function getQueueById(id: number): Promise<Queue> {
  const queue = await prisma.queue.findUnique({ where: { id } });
  if (!queue) throw new Error("Queue not found");
  return queue;
}

export async function deleteQueue(id: number, userId: number): Promise<Queue> {
  const queue = await prisma.queue.findUnique({ where: { id } });
  if (!queue) throw new Error("Queue not found");
  if (queue.userId !== userId)
    throw new Error("You are not allowed to delete this queue");
  const deletedQueue = await prisma.queue.delete({ where: { id } });
  if (!deletedQueue) throw new Error("Failed to delete queue");
  return deletedQueue;
}

export async function addQueueItem(
  queueId: number,
  userId: number,
  item: { text: string; position: number }
): Promise<QueueItem> {
  const queue = await prisma.queue.findUnique({ where: { id: queueId } });
  if (!queue) throw new Error("Queue not found");
  if (queue.userId !== userId)
    throw new Error("You are not allowed to add item to this queue");
  const queueItem = await prisma.queueItem.create({
    data: { queueId, text: item.text, position: item.position },
  });
  if (!queueItem) throw new Error("Failed to add queue item");
  return queueItem;
}

export async function removeQueueItem(
  id: number,
  userId: number
): Promise<void> {
  const queue = await prisma.queue.findFirst({
    where: { queueItems: { some: { id } } },
  });
  if (!queue) throw new Error("Queue not found");
  if (queue.userId !== userId)
    throw new Error("You are not allowed to remove item from this queue");
  const queueItem = await prisma.queueItem.delete({ where: { id } });
  if (!queueItem) throw new Error("Queue item not found");
}

export async function updateQueueItem(
  id: number,
  userId: number,
  item: { text: string; position: number }
): Promise<QueueItem> {
  const queue = await prisma.queue.findFirst({
    where: { queueItems: { some: { id } } },
  });
  if (!queue) throw new Error("Queue not found");
  if (queue.userId !== userId)
    throw new Error("You are not allowed to update item from this queue");
  const queueItem = await prisma.queueItem.update({
    where: { id },
    data: { text: item.text, position: item.position },
  });
  if (!queueItem) throw new Error("Queue item not found");
  return queueItem;
}
