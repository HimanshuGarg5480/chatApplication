import { config } from "dotenv";
import connectDB from "./db/connectDB.js";
import { app, server } from "./socket/socket.js";
import authRouter from "./routes/authRoute.js";
import messageRouter from "./routes/messageRoute.js";
import cors from "cors";
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/v1/api/user",authRouter);
app.use("/v1/api/message",messageRouter);

const port = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(port, () => {
    console.log("server started", port);
  });
});
