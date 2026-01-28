import prisma from "../db";
import type { Queue, QueueItem } from "../generated/prisma";
import { getIO } from "../sockets";

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
  const socket = getIO();
  const queue = await prisma.queue.findUnique({ where: { id: queueId } });
  if (!queue) throw new Error("Queue not found");
  if (queue.userId !== userId)
    throw new Error("You are not allowed to add item to this queue");
  const queueItem = await prisma.queueItem.create({
    data: { queueId, text: item.text, position: item.position },
  });
  if (!queueItem) throw new Error("Failed to add queue item");
  const queueItems = await prisma.queueItem.findMany({ where: { queueId } });
  socket.in(queueId.toString()).emit("queueItems", queueItems);
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

export async function nextQueueItem(
  queueId: number,
  userId: number
): Promise<QueueItem | null> {
  const queue = await prisma.queue.findUnique({ where: { id: queueId } });
  if (!queue) throw new Error("Queue not found");
  if (queue.userId !== userId)
    throw new Error("You are not allowed to manage this queue");

  // Find the first item (lowest position)
  const firstItem = await prisma.queueItem.findFirst({
    where: { queueId },
    orderBy: { position: "asc" },
  });

  if (!firstItem) {
    return null;
  }
  await prisma.queueItem.delete({ where: { id: firstItem.id } });
  const queueItems = await prisma.queueItem.findMany({ where: { queueId } });
  const io = getIO();
  io.to(queueId.toString()).emit("queueItems", queueItems);
  return firstItem;
}

export async function addQueueItemToEnd(
  queueId: number,
  userId: number,
  item: string
): Promise<QueueItem> {
  const queue = await prisma.queue.findUnique({ where: { id: queueId } });
  if (!queue) throw new Error("Queue not found");
  if (queue.userId !== userId)
    throw new Error("You are not allowed to add item to this queue");

  // Find the highest position to add at the end
  const lastItem = await prisma.queueItem.findFirst({
    where: { queueId },
    orderBy: { position: "desc" },
  });

  const newPosition = lastItem ? lastItem.position + 1 : 1;

  const queueItem = await prisma.queueItem.create({
    data: { queueId, text: item, position: newPosition },
  });

  if (!queueItem) throw new Error("Failed to add queue item");

  const queueItems = await prisma.queueItem.findMany({ where: { queueId } });
  const io = getIO();
  io.to(queueId.toString()).emit("queueItems", queueItems);

  return queueItem;
}
