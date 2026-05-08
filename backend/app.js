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
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

import authRoute from "./src/routes/auth.route.js";
app.use("/api/auth", authRoute);

import scrapeRoute from "./src/routes/scrape.route.js";
app.use("/api/scrape", scrapeRoute);

import storyRoute from "./src/routes/story.route.js";
app.use("/api/stories", storyRoute);

import { errorMiddleware } from "./src/middleware/error.handler.js";
app.use(errorMiddleware);

export default app;
