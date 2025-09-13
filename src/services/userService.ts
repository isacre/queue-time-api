import prisma from "../db";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import type { User } from "../generated/prisma";

export async function createUser(user: {
  name: string;
  email: string;
  password: string;
}): Promise<{ user: User; token: string }> {
  const exists = await prisma.user.findUnique({ where: { email: user.email } });
  if (exists) throw new Error("User already exists");
  const anyFieldEmpty = Object.values(user).some((value) => value === "");
  if (anyFieldEmpty) throw new Error("All fields are required");

  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: { ...user, password: hashedPassword },
  });

  const token = generateToken({ id: newUser.id });
  return { user: newUser, token };
}

export async function loginUser(user: {
  email: string;
  password: string;
}): Promise<{ user: User; token: string }> {
  const ThereAreEmptyFields = Object.values(user).some((value) => value === "");
  if (ThereAreEmptyFields) throw new Error("Please fill all fields");
  const User = await prisma.user.findUnique({ where: { email: user.email } });
  if (!User) throw new Error("User not found");
  const isPasswordValid = await bcrypt.compare(user.password, User.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  const token = generateToken({ id: User?.id });
  return { user: User, token };
}
