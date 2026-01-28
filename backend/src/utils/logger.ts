export enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG",
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

class Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, metadata } = entry;

    let color = "";
    switch (level) {
      case LogLevel.ERROR:
        color = "\x1b[31m"; // Red
        break;
      case LogLevel.WARN:
        color = "\x1b[33m"; // Yellow
        break;
      case LogLevel.INFO:
        color = "\x1b[36m"; // Cyan
        break;
      case LogLevel.DEBUG:
        color = "\x1b[35m"; // Magenta
        break;
    }

    const reset = "\x1b[0m";
    const metadataStr = metadata ? ` ${JSON.stringify(metadata)}` : "";

    return `${color}[${timestamp}] ${level}:${reset} ${message}${metadataStr}`;
  }

  private log(
    level: LogLevel,
    message: string,
    metadata?: Record<string, any>
  ): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: this.getTimestamp(),
      metadata,
    };

    console.log(this.formatLog(entry));
  }

  error(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.ERROR, message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, metadata);
  }

  info(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, metadata);
  }

  debug(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, metadata);
  }
}

export const logger = new Logger();
