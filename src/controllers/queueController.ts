import type { Request, Response } from "express";
import {
  createQueue as createQueueService,
  getQueues as getQueuesService,
  getQueueById as getQueueByIdService,
  deleteQueue as deleteQueueService,
  addQueueItem as addQueueItemService,
  removeQueueItem as removeQueueItemService,
  updateQueueItem as updateQueueItemService,
} from "../services/queueService";

export async function createQueue(req: Request, res: Response) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const queue = await createQueueService({ name }, Number(req.userId));
    res.status(201).json(queue);
  } catch (error: unknown) {
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
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
