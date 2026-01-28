import { useState } from "react";
import { AdminLayoutContext } from "./context";

export const AdminLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [title, setTitle] = useState("");
  const [leftButton, setLeftButton] = useState<React.ReactNode | null>(null);
  const [rightButton, setRightButton] = useState<React.ReactNode | null>(null);
  return (
    <AdminLayoutContext.Provider
      value={{
        title,
        leftButton,
        rightButton,
        setTitle,
        setLeftButton,
        setRightButton,
      }}
    >
      {children}
    </AdminLayoutContext.Provider>
  );
};
