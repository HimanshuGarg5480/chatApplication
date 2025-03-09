import express from "express";
import http from "http";
import initializeSocket from "./socket/index.js";

const app = express();
const server = http.createServer(app);
const io = initializeSocket(server);

export { io, server, app };
 