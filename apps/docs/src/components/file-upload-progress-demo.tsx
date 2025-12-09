import * as React from "react";
import { FileUpload, type FileUploadFile } from "@px-ui/core";

export function FileUploadProgressDemo() {
  const [files, setFiles] = React.useState<FileUploadFile[]>([]);

  const handleUpload = async (newFiles: FileUploadFile[]) => {
    setFiles(newFiles);

    // Simulate upload progress for each file
    for (const file of newFiles) {
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((r) => setTimeout(r, 150));
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? { ...f, progress, status: progress < 100 ? "uploading" : "success" }
              : f,
          ),
        );
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <FileUpload.Root value={files} onValueChange={handleUpload} multiple>
        <FileUpload.Dropzone size="sm" />
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
    </div>
  );
}
