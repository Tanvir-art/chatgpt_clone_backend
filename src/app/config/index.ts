import dotenv from "dotenv";
import path from "path";


dotenv.config({path: path.join(process.cwd(), ".env")});

export default {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || "",
    jwtSecret: process.env.JWT_SECRET || "",
    openAIApiKey: process.env.OPENAI_API_KEY || "",
    nodeEnv: process.env.NODE_ENV || "development",
}
