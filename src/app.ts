import type { Application } from "express";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import globalErrorHandler from "./app/middleware/globalErrorhandler";
// import notFound from "./app/middleware/notFound";
import router from "./app/route/index";
import cookieParser from "cookie-parser";
const app : Application= express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",   
    credentials: true,                   
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

// application routes
app.use('/api', router);
app.use(globalErrorHandler);
// app.use(notFound);

export default app; 