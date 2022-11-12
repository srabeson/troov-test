// Configure dotenv
import * as dotenv from "dotenv";
dotenv.config();

import express, { ErrorRequestHandler } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { expressjwt } from "express-jwt";

import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
import apiRouter from "./routes/api";

const app = express();

// Setup middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Setup routers
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use(
  "/api",
  expressjwt({
    secret: process.env.SECRET as string,
    algorithms: ["HS256"],
  }),
  apiRouter
);

// Use a custom error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(err.status).json({ error: err });
};
app.use(errorHandler);

export default app;
