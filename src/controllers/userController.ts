import type { Request, Response } from "express";
import {
  createUser,
  loginUser,
  verifyTokenService,
} from "../services/userService";
import { logger } from "../utils/logger";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const result = await createUser({ name, email, password });
    res.status(201).json(result);
  } catch (error: unknown) {
    logger.error("Error registering user", {
      error: error instanceof Error ? error.message : "Unknown error",
      email: req.body.email,
    });
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const user = {
      id: result.user.id,
      name: result.user.name,
    };

    res.status(200).json(user);
  } catch (error: unknown) {
    logger.error("Error logging in user", {
      error: error instanceof Error ? error.message : "Unknown error",
      email: req.body.email,
    });
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function verifyToken(req: Request, res: Response) {
  try {
    const token = req.cookies.token;
    const result = await verifyTokenService(token);
    res.status(200).json(result);
  } catch (error: unknown) {
    logger.error("Error verifying token", {
      error: error instanceof Error ? error.message : "Unknown error",
      hasToken: !!req.cookies.token,
    });
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("token", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "User logged out successfully" });
}
