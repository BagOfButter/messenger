import express, { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRouter } from "@routes/auth/authRouter";
import { settingsRouter } from "@routes/settings/settingsRouter";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/settings", settingsRouter);

mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

io.on("connection", (socket: Socket) => {
  console.log("Connected successfully");

  socket.on("disconnect", () => {
    console.log("Disconnected successfully");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
