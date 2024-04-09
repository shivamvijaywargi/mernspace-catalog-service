export interface IFile {
  filename: string;
  fileData: ArrayBuffer;
}

export interface IFileStorage {
  uploadFile(file: IFile): Promise<void>;
  deleteFile(filename: string): void;
  getFileUri(filename: string): string;
}
