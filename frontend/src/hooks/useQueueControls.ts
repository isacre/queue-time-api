import { addQueueItem, nextQueueItem } from "@/services/queueItems";

export default function useQueueControls(queueId: string) {
  function addToQueue(item: string) {
    addQueueItem(queueId, item)
      .then(() => {})
      .catch(() => {
        window.alert("Error adding to queue");
      });
  }

  function skipQueueItem() {
    nextQueueItem(queueId)
      .then(() => {})
      .catch(() => {
        window.alert("Error skipping item");
      });
  }

  return { addToQueue, skipQueueItem };
}
