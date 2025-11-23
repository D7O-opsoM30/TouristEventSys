import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:5173", "http://localhost:8081", "http://localhost:8082"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
};

start();


