import React, { createContext } from "react";

interface AdminLayoutContextType {
  title: string;
  leftButton: React.ReactNode;
  rightButton: React.ReactNode;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setLeftButton: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
  setRightButton: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
}

export const AdminLayoutContext = createContext<AdminLayoutContextType | null>(
  null
);
