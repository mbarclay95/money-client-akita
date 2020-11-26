export interface FileUpload {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  filePath: string;
  originalFileName: string;
}

export function createFileUpload(params: Partial<FileUpload>): FileUpload {
  return {
    id: params.id,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    updatedAt: params.createdAt ? new Date(params.updatedAt) : null,
    filePath: params.filePath ?? null,
    originalFileName: params.originalFileName ?? null,
  } as FileUpload;
}
