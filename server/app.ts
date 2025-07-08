import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import goalRoutes from "./routes/goalRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", goalRoutes);

export default app;
