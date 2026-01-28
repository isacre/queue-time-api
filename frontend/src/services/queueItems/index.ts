import { api } from "../index";

export async function addQueueItem(queueId: string, item: string) {
  const response = await api.post(`/queue/${queueId}/add-to-end`, { item });
  return response.data;
}

export async function nextQueueItem(queueId: string) {
  const response = await api.post(`/queue/${queueId}/next`);
  return response.data;
}
