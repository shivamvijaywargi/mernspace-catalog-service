import config from "config";

const { LOG_LEVEL, NODE_ENV } = process.env;

const PORT: number = config.get("server.port") || 5502;
const MONGO_URI: string =
  config.get("mongo.uri") ||
  "mongodb://localhost:27017/mernspace-catalog-service";

export const CONFIG = {
  LOG_LEVEL,
  MONGO_URI,
  NODE_ENV,
  PORT,
};
