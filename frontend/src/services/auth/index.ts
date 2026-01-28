import { api } from "../index";
import type { UserType } from "../../types";

export interface UserLoginData {
  email: string;
  password: string;
}

export const register = async (data: UserLoginData & { name: string }) => {
  const response = await api.post("user/register", data);
  return response.data;
};

export const login = async (data: UserLoginData): Promise<UserType> => {
  const response = await api.post("user/login", data);
  return response.data;
};

export const verifyToken = async (): Promise<{ user: UserType }> => {
  const response = await api.post("user/verify-token");
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("user/logout");
  return response.data;
};
