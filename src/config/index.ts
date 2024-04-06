import config from "config";

const { LOG_LEVEL, NODE_ENV } = process.env;

const PORT: number = config.get("server.port") || 5502;

export const CONFIG = {
  PORT,
  LOG_LEVEL,
  NODE_ENV,
};
