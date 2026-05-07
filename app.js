import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config("./.env");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["*"],
    credentials: true,
  }),
);

import authRoute from "./src/routes/auth.route.js";
app.use("/api/auth/user", authRoute);



import { errorMiddleware } from "./src/middleware/error.handler.js";
app.use(errorMiddleware);

export default app;
