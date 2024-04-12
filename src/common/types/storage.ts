export interface IFile {
  filename: string;
  fileData: ArrayBuffer;
}

export interface IFileStorage {
  uploadFile(file: IFile): Promise<void>;
  deleteFile(filename: string): Promise<void>;
  getFileUri(filename: string): string;
}
