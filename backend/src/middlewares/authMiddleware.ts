import { type Response, type NextFunction } from "express";
import express from "express";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(
  req: express.Request,
  res: Response,
  next: NextFunction
) {
  const authCookie = req.cookies?.token;
  if (!authCookie)
    return res.status(401).json({ message: "No token provided" });

  try {
    if (!authCookie) return res.status(401).json({ message: "Invalid token" });
    const payload = verifyToken(authCookie);
    if (!payload || typeof payload === "string")
      return res.status(401).json({ message: "Invalid token" });
    req.userId = payload.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
