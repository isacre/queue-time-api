import { type Request, type Response } from "express";
import express from "express";
import { setupSwagger } from "./swagger";
import userRoutes from "./routes/userRoutes";
import queueRoutes from "./routes/queueRoutes";
import { initSockets } from "./sockets";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";
import { requestLogger } from "./middlewares/requestLogger";
import { errorLogger, notFoundLogger } from "./middlewares/errorLogger";
import { logger } from "./utils/logger";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
const app = express();

// Middlewares
app.use(requestLogger); // Log all requests
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
app.use("/user", userRoutes);
app.use("/queue", queueRoutes);

// Error handling middlewares (must be last)
app.use(notFoundLogger); // Handle 404s
app.use(errorLogger); // Handle all errors

setupSwagger(app);
const httpServer = http.createServer(app);
initSockets(httpServer);
app.listen(8000, () => {
  logger.info("Server is running on port 8000");
});
