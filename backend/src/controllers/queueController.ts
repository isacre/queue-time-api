import type { Request, Response } from "express";
import {
  createQueue as createQueueService,
  getQueues as getQueuesService,
  getQueueById as getQueueByIdService,
  deleteQueue as deleteQueueService,
  addQueueItem as addQueueItemService,
  removeQueueItem as removeQueueItemService,
  updateQueueItem as updateQueueItemService,
  nextQueueItem as nextQueueItemService,
  addQueueItemToEnd as addQueueItemToEndService,
} from "../services/queueService";
import { logger } from "../utils/logger";

export async function createQueue(req: Request, res: Response) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const queue = await createQueueService({ name }, Number(req.userId));
    res.status(201).json(queue);
  } catch (error: unknown) {
    logger.error("Error creating queue", {
      error: error instanceof Error ? error.message : "Unknown error",
      userId: req.userId,
      body: req.body,
    });
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function getQueues(req: Request, res: Response) {
  try {
    const queues = await getQueuesService(Number(req.userId));
    res.status(200).json(queues);
  } catch (error: unknown) {
    logger.error("Error getting queues", {
      error: error instanceof Error ? error.message : "Unknown error",
      userId: req.userId,
    });
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function getQueueById(req: Request, res: Response) {
  try {
    const queue = await getQueueByIdService(Number(req.params.id));
    res.status(200).json(queue);
  } catch (error: unknown) {
    logger.error("Error getting queue by id", {
      error: error instanceof Error ? error.message : "Unknown error",
      queueId: req.params.id,
    });
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function deleteQueue(req: Request, res: Response) {
  try {
    await deleteQueueService(Number(req.params.id), Number(req.userId));
    res.status(200).json({ message: "Queue deleted" });
  } catch (error: unknown) {
    logger.error("Error deleting queue", {
      error: error instanceof Error ? error.message : "Unknown error",
      userId: req.userId,
      queueId: req.params.id,
    });
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function addQueueItem(req: Request, res: Response) {
  try {
    await addQueueItemService(
      Number(req.params.id),
      Number(req.userId),
      req.body
    );
    res.status(200).json({ message: "Queue item added" });
  } catch (error: unknown) {
    logger.error("Error adding queue item", {
      error: error instanceof Error ? error.message : "Unknown error",
      userId: req.userId,
      queueId: req.params.id,
      body: req.body,
    });
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function removeQueueItem(req: Request, res: Response) {
  try {
    await removeQueueItemService(Number(req.params.id), Number(req.userId));
    res.status(200).json({ message: "Queue item removed" });
  } catch (error: unknown) {
    logger.error("Error removing queue item", {
      error: error instanceof Error ? error.message : "Unknown error",
      userId: req.userId,
      itemId: req.params.id,
    });
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function updateQueueItem(req: Request, res: Response) {
  try {
    await updateQueueItemService(
      Number(req.params.id),
      Number(req.userId),
      req.body
    );
    res.status(200).json({ message: "Queue item updated" });
  } catch (error: unknown) {
    logger.error("Error updating queue item", {
      error: error instanceof Error ? error.message : "Unknown error",
      userId: req.userId,
      itemId: req.params.id,
      body: req.body,
    });
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function nextQueueItem(req: Request, res: Response) {
  try {
    const item = await nextQueueItemService(
      Number(req.params.id),
      Number(req.userId)
    );
    res.status(200).json({
      message: item ? "Next item processed" : "Queue is empty",
      item,
    });
  } catch (error: unknown) {
    logger.error("Error processing next queue item", {
      error: error instanceof Error ? error.message : "Unknown error",
      userId: req.userId,
      queueId: req.params.id,
    });
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function addQueueItemToEnd(req: Request, res: Response) {
  try {
    const { item } = req.body;
    if (!item) return res.status(400).json({ message: "item is required" });

    const itemAdded = await addQueueItemToEndService(
      Number(req.params.id),
      Number(req.userId),
      item
    );

    if (!itemAdded)
      return res
        .status(400)
        .json({ message: "Failed to add item to end of queue" });

    res.status(200).json({
      message: "Item added to end of queue",
      item,
    });
  } catch (error: unknown) {
    logger.error("Error adding item to end of queue", {
      error: error instanceof Error ? error.message : "Unknown error",
      userId: req.userId,
      queueId: req.params.id,
      body: req.body,
    });
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
