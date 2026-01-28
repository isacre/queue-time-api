import { Button } from "@/components/ui/button";
import useConfigurePageHeader from "@/hooks/useConfigurePageHeader";
import useQueues from "@/hooks/useQueues";
import { logoutUser } from "@/services/auth";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import Queue from "./queue";

export default function QueuesPage() {
  useConfigurePageHeader({
    title: "Queues",
    rightButton: <Button onClick={logout}>Logout</Button>,
  });
  const navigate = useNavigate();
  const { queues } = useQueues();
  const { setUser } = useUserStore();

  function logout() {
    logoutUser().then(() => {
      setUser(null);
      navigate("/");
    });
  }

  return (
    <div className="p-2 flex flex-col gap-2 overflow-y-auto">
      <b className="text-bold text-[20px] mb-3">My queues</b>
      {queues.map((queue) => (
        <Queue queue={queue} key={queue.id} />
      ))}
    </div>
  );
}
