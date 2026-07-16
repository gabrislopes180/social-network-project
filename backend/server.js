import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { followRouter } from "./routes/followRoutes.js";
import { postRouter } from "./routes/postRoutes.js";
import { likesRouter } from "./routes/likeRoutes.js";

const app = express();
app.use(cookieParser());

connectDB(process.env.MONGODB_URL);

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Olá!");
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/follows", followRouter);
app.use("/posts", postRouter);
app.use("/likes", likesRouter);

app.listen(process.env.PORT, () => {
  console.log("Hello Express!");
});
