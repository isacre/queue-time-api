import { verifyToken } from "@/services/auth";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

export default function useUserData() {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    verifyToken().then((res) => {
      setUser(res);
    });
  }, [setUser]);

  return { user };
}
