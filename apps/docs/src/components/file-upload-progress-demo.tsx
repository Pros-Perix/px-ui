"use client";

import * as React from "react";
import { FileUpload, type FileUploadFile } from "@px-ui/core";

export function FileUploadProgressDemo() {
  const [files, setFiles] = React.useState<FileUploadFile[]>([]);

  const handleUpload = async (newFiles: FileUploadFile[]) => {
    setFiles(newFiles);

    // Simulate upload progress for newly added files
    const existingIds = new Set(files.map((f) => f.id));
    const filesToUpload = newFiles.filter((f) => !existingIds.has(f.id));

    for (const file of filesToUpload) {
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((r) => setTimeout(r, 100));
        setFiles((prev) =>
          prev.map((f) => (f.id === file.id ? { ...f, progress } : f)),
        );
      }
    }
  };

  return (
    <FileUpload.Root value={files} onValueChange={handleUpload} multiple>
      <FileUpload.Dropzone />
      <FileUpload.ItemList>
        {(files) =>
          files.map((file) => (
            <FileUpload.Item key={file.id} file={file}>
              <FileUpload.ItemPreview />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <FileUpload.ItemName />
                <FileUpload.ItemProgress />
              </div>
              <FileUpload.ItemRemove />
            </FileUpload.Item>
          ))
        }
      </FileUpload.ItemList>
    </FileUpload.Root>
  );
}
