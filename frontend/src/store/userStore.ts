import { create } from "zustand";
import type { UserType } from "../types";

interface UserStore {
  user: Omit<UserType, "token"> | null;
  setUser: (user: Omit<UserType, "token"> | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => {
    if (!user) {
      set({ user: null });
      return;
    }
    set({ user: { id: user.id, name: user.name } });
  },
}));
