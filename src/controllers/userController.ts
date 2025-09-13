import type { Request, Response } from "express";
import { createUser, loginUser } from "../services/userService";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const result = await createUser({ name, email, password });
    res.status(201).json(result);
  } catch (error: unknown) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    const user = {
      id: result.user.id,
      name: result.user.name,
      token: result.token,
    };
    res.status(200).json(user);
  } catch (error: unknown) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
