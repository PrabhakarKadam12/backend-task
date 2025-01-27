import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import userRoutes from "./routes/user.routes";

const app: Application = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan("dev")); // Log requests to the console

// Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.send("Backend Task API is running!");
});

// API Routes
app.use("/api", userRoutes);

export default app;
