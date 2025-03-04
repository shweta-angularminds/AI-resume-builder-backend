import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

import resumeRouter from "./routers/resume.router.js";

app.use("/api/v1/resume", resumeRouter);

export { app };
