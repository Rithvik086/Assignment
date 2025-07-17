import express from "express";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { getLogs } from "./controllers/logcontroller.js";
import dbConnect from "./config/Dbconfig.js";
import authRoutes from "./routers/authRoutes.js";
import taskroutes from "./routers/taskroutes.js";
import { getUsers } from "./controllers/taskController.js";
import { verifytoken } from "./middleware/authmiddleware.js";
import User from "./models/userModel.js";

const app = express();
const port = 3000;
const hostname = "127.0.0.1";
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

try {
  await dbConnect();
} catch (err) {
  console.error("Failed to connect to db" + err);
  process.exit(1);
}

app.use("/", authRoutes);
app.use("/api/tasks", taskroutes);
app.get("/getlogs", getLogs);
app.get("/getUsers", getUsers);
app.get("/isverified", verifytoken, async (req, res) => {
  res.json({ user: req.user });
});

app.get("/smartassign", async (req, res) => {
  let smart = null;
  let lowest = 10000;
  const users = await User.find();

  users.forEach((user) => {
    if (user.assignedtasks.length < lowest) {
      lowest = user.assignedtasks.length;
      smart = user;
    }
  });
  res.json({ smart });
});
io.on("connection", (socket) => {
  console.log("user connected", socket.id);
});

export { io };

// Starts an Express server locally on port 3000
server.listen(port, hostname, () => {
  console.log(`Listening on http://${hostname}:${port}/`);
});
