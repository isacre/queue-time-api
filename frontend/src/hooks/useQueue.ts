import { connectSocket, disconnectSocket, socket } from "@/socket";
import type { QueueItemType } from "@/types";
import { useEffect, useState } from "react";

export default function useQueue(queueId: string) {
  const [queueItems, setQueueItems] = useState<QueueItemType[]>([]);

  useEffect(() => {
    connectSocket(queueId);

    function handleQueueItems(items: QueueItemType[]) {
      setQueueItems(items);
    }

    socket.on("queueItems", handleQueueItems);

    return () => {
      socket.off("queueItems", handleQueueItems);
      disconnectSocket();
    };
  }, [queueId]);

  return { queueItems };
}
