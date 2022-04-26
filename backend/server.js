// import createError from "http-errors";
import express from "express";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
