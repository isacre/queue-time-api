import { getQueues } from "@/services/queues";
import type { QueueType } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useQueues() {
  const [queues, setQueues] = useState<QueueType[]>([]);
  const navigate = useNavigate();

  const fetchQueues = useCallback(() => {
    getQueues()
      .then((res) => {
        setQueues(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchQueues();
  }, [navigate, fetchQueues]);

  return { queues, fetchQueues };
}
