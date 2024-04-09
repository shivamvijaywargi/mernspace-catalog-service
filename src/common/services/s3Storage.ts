import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

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

  deleteFile(_filename: string): void {
    throw new Error("Method not implemented.");
  }

  getFileUri(_filename: string): string {
    throw new Error("Method not implemented.");
  }
}
