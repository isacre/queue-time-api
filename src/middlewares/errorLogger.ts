import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export function errorLogger(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { method, url, ip } = req;

  logger.error(`Error in ${method} ${url}`, {
    error: error.message,
    stack: error.stack,
    ip,
    userId: (req as any).userId || "anonymous",
    body: req.body,
    query: req.query,
    params: req.params,
  });

  // If response hasn't been sent yet, send error response
  if (!res.headersSent) {
    res.status(500).json({
      message: "Internal server error",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }

  next(error);
}

export function notFoundLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { method, url, ip } = req;

  logger.warn(`Route not found: ${method} ${url}`, {
    ip,
    userAgent: req.get("User-Agent"),
    userId: (req as any).userId || "anonymous",
  });

  res.status(404).json({
    message: "Route not found",
  });
}
