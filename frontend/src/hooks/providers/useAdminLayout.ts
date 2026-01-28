import { AdminLayoutContext } from "@/contexts/adminLayoutContext/context";
import { useContext } from "react";

export const useAdminLayout = () => {
  const context = useContext(AdminLayoutContext);
  if (!context) {
    throw new Error(
      "useAdminLayout must be used within an AdminLayoutProvider"
    );
  }
  return context;
};
