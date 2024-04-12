import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import createHttpError from "http-errors";

import { CONFIG } from "../../config";
import { IFile, IFileStorage } from "../types/storage";

export class S3Storage implements IFileStorage {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: CONFIG.s3Region,
      credentials: {
        accessKeyId: CONFIG.s3AccessKeyId,
        secretAccessKey: CONFIG.s3SecretAccessKey,
      },
    });
  }

  async uploadFile(file: IFile): Promise<void> {
    const objectParams = {
      Bucket: CONFIG.s3Bucket,
      Key: file.filename,
      Body: Buffer.from(file.fileData),
    };

    await this.client.send(new PutObjectCommand(objectParams));
  }

  async deleteFile(filename: string): Promise<void> {
    const objectParams = {
      Bucket: CONFIG.s3Bucket,
      Key: filename,
    };

    await this.client.send(new DeleteObjectCommand(objectParams));
  }

  getFileUri(filename: string): string {
    const { s3Bucket, s3Region } = CONFIG;

    if (s3Bucket && s3Region) {
      return `https://${s3Bucket}.s3.${s3Region}.amazonaws.com/${filename}`;
    }

    throw createHttpError(500, "Invalid S3 configuration");
  }
}
