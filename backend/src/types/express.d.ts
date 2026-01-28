//eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from "express";
declare global {
  namespace Express {
    interface Request {
      userId?: string; // opcional, ou string se você tiver certeza
    }
  }
}
