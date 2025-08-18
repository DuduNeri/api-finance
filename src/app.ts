import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import testRoute from "./routes";
import UserRouter from "./routes/user.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/test", testRoute)
app.use("/users", UserRouter)

connectDB();

export default app;
