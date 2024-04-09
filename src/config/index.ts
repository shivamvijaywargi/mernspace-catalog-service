import config from "config";

const { LOG_LEVEL, NODE_ENV } = process.env;

const PORT: number = config.get("server.port") || 5502;
const MONGO_URI: string =
  config.get("mongo.uri") ||
  "mongodb://localhost:27017/mernspace-catalog-service";
const JWKS_URI: string =
  config.get("auth.jwksUri") || "http://localhost:5501/.well-known/jwks.json";
const s3AccessKeyId: string = config.get("s3.accessKeyId");
const s3SecretAccessKey: string = config.get("s3.secretAccessKey");
const s3Region: string = config.get("s3.region");
const s3Bucket: string = config.get("s3.bucket");

export const CONFIG = {
  JWKS_URI,
  LOG_LEVEL,
  MONGO_URI,
  NODE_ENV,
  PORT,
  s3AccessKeyId,
  s3SecretAccessKey,
  s3Region,
  s3Bucket,
};
