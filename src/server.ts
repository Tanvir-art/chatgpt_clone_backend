import mongoose from "mongoose";
import app from "./app";
import config from "./app/config/index";
import type { Request, Response } from "express";

async function startServer() {
    try{
        await mongoose.connect(config.databaseUrl);
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
        app.get("/", (req: Request, res: Response) => {
            res.send("Server is up and running!");
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();