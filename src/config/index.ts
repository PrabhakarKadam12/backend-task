import dotenv from "dotenv";
dotenv.config();

export const config = {
    mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/backendTask",
    apiURL: "https://randomuser.me/api/",
    batchSize: Number(process.env.BATCH_SIZE) || 300,
    requestsPerSecond: Number(process.env.REQUESTS_PER_SECOND) || 5,
    sleepTime: Number(process.env.SLEEP_TIME) || 30,
};
