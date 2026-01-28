import type { QueueType } from "@/types";
import { useNavigate } from "react-router-dom";

export default function Queue({ queue }: { queue: QueueType }) {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer border shadow-sm text-black rounded-[8px] bg-white p-4"
      onClick={() => navigate(`/queue/${queue?.id}`)}
    >
      <b className="text-bold">{queue?.name}</b>
      <p className="text-sm text-[RGBA(0,0,0,0.5)] text-[14px]">
        {"Manage customer service queue"}
      </p>
    </div>
  );
}
