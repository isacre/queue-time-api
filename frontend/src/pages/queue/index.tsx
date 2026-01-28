import Button from "@/components/button";
import useQueue from "@/hooks/useQueue";
import useQueueControls from "@/hooks/useQueueControls";
import useUserData from "@/hooks/useUserData";
import { useParams } from "react-router-dom";
export default function QueuePage() {
  const { id } = useParams();
  const { queueItems } = useQueue(id as string);
  const { user } = useUserData();
  const { addToQueue, skipQueueItem } = useQueueControls(id as string);

  return (
    <div className="flex flex-col gap-2 p-2">
      {user && (
        <div className="flex gap-2 justify-center items-center h-[50px]">
          <Button
            onClick={() => {
              const name = window.prompt("Person name" as string) as string;
              addToQueue(name);
            }}
          >
            Add to Queue
          </Button>
          <Button onClick={skipQueueItem}>Skip</Button>
        </div>
      )}
      <ul className="h-full flex flex-col gap-2">
        {queueItems.length === 0 ? (
          <li>No items in queue</li>
        ) : (
          queueItems.map((item) => (
            <li
              className="p-2 border text-center border-gray-300 rounded-md bg-[#e5e5e5] text-black"
              key={item.id}
            >
              {item.text}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
