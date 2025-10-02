import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const startTime = Date.now();
  const { method, url, ip } = req;

  // Log incoming request
  logger.info(`Incoming ${method} ${url}`, {
    ip,
    userAgent: req.get("User-Agent"),
    userId: (req as Request).userId || "anonymous",
  });

  // Override res.end to log response
  const originalEnd = res.end;
  res.end = function (chunk?: BufferEncoding, encoding?: BufferEncoding) {
    const duration = Date.now() - startTime;
    const { statusCode } = res;

    // Determine log level based on status code
    const logLevel = statusCode >= 400 ? "error" : "info";
    const message = `Outgoing ${method} ${url} - ${statusCode}`;

    logger[logLevel](message, {
      statusCode,
      duration: `${duration}ms`,
      ip,
      userId: (req as Request).userId || "anonymous",
    });

    // Call original end method
    originalEnd.call(this, chunk, encoding || "utf-8");
  };

  next();
}
