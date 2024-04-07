import mongoose from "mongoose";

import { CONFIG } from ".";
import { logger } from "./logger";

export const connectDB = async () => {
  try {
    const MONGO_URI = CONFIG.MONGO_URI || "mongodb://127.0.0.1:27017/ammajaan";

    const conn = await mongoose.connect(MONGO_URI);
    logger.info(`Connected to DB: ${conn.connection.host}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
