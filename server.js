import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./route/user.js";
import authRouter from "./route/auth.js";
import { errorHandler } from "./middlewares/errorhandler.js";
import { mongoBDConnect } from "./config/db.js";

// initialization
const app = express();
dotenv.config();

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// set environment vars
const PORT = process.env.PORT || 9090;

// routing
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

// use error handler
app.use(errorHandler);

// app listen
app.listen(PORT, () => {
  mongoBDConnect();
  console.log(`server is running on port ${PORT}`.bgGreen.black);
});
