import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import testRoute from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/test", testRoute)

connectDB();

export default app;
