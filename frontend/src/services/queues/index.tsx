import { api } from "../index";

export async function getQueues() {
  const response = await api.get("/queue");
  return response.data;
}

export async function getQueue(id: string) {
  const response = await api.get(`/queue/${id}`);
  return response.data;
}

export async function createQueue(name: string) {
  const response = await api.post("/queue", { name });
  return response.data;
}
