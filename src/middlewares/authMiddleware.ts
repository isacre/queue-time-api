import { type Response, type NextFunction } from "express";
import express from "express";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(
  req: express.Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const [, token] = authHeader.split(" ");
  try {
    if (!token) return res.status(401).json({ message: "Invalid token" });
    const payload = verifyToken(token);
    if (!payload || typeof payload === "string")
      return res.status(401).json({ message: "Invalid token" });
    req.userId = payload.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
