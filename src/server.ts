import mongoose from "mongoose";
import { config } from "./config";
import app from "./app";

const PORT = process.env.PORT || 3000;

// Connect to MongoDB and Start the Server
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });
