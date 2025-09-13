import { type Request, type Response } from "express";
import express from "express";
import { setupSwagger } from "./swagger";
import userRoutes from "./routes/userRoutes";
import queueRoutes from "./routes/queueRoutes";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
app.use("/user", userRoutes);
app.use("/queue", queueRoutes);

setupSwagger(app);
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
