// import mongoose from "mongoose";
// import app from "./app";
// import config from "./app/config/index";
// import type { Request, Response } from "express";

// async function startServer() {
//     try{
//         await mongoose.connect(config.databaseUrl);
//         app.listen(config.port, () => {
//             console.log(`Server is running on port ${config.port}`);
//         });
//         app.get("/", (req: Request, res: Response) => {
//             res.send("Server is up and running!");
//         });
//     } catch (error) {
//         console.error("Error starting server:", error);
//     }
// }

// startServer();  


import mongoose from "mongoose";
import app from "./app";
import config from "./app/config/index";
import type { Request, Response } from "express";
import http from "http";
import { initSocket } from "./app/websocket/socket";

async function startServer() {
  try {
    await mongoose.connect(config.databaseUrl);

    const server = http.createServer(app);   // <-- IMPORTANT
    initSocket(server);                      // <-- SOCKET INITIALIZE HERE

    server.listen(config.port, () => {
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
