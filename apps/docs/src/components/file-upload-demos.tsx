import * as React from "react";
import {
  FileUpload,
  useFileUpload,
  type FileWithUploadStatus,
  type FileWithPreview,
  formatBytes,
} from "@px-ui/core";
import { FileUploadField } from "@px-ui/forms";

// ============================================================================
// Basic Dropzone
// ============================================================================

export function BasicDropzoneDemo() {
  const [state, actions] = useFileUpload({
    onFilesChange: (files) => console.log(files),
  });

  return (
    <FileUpload.Root
      files={state.files}
      addFiles={actions.addFiles}
      removeFile={actions.removeFile}
      clearFiles={actions.clearFiles}
      openFileDialog={actions.openFileDialog}
      getInputProps={actions.getInputProps}
      handleDragEnter={actions.handleDragEnter}
      handleDragLeave={actions.handleDragLeave}
      handleDragOver={actions.handleDragOver}
      handleDrop={actions.handleDrop}
      isDragActive={state.isDragging}
    >
      <FileUpload.Dropzone />
    </FileUpload.Root>
  );
}


// ============================================================================
// Avatar Upload
// ============================================================================

export function AvatarUploadDemo() {
  const [state, actions] = useFileUpload({
    accept: "image/*",
    maxSize: 2 * 1024 * 1024,
    multiple: false,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <FileUpload.Root
        files={state.files}
        addFiles={actions.addFiles}
        removeFile={actions.removeFile}
        clearFiles={actions.clearFiles}
        openFileDialog={actions.openFileDialog}
        getInputProps={actions.getInputProps}
        handleDragEnter={actions.handleDragEnter}
        handleDragLeave={actions.handleDragLeave}
        handleDragOver={actions.handleDragOver}
        handleDrop={actions.handleDrop}
        isDragActive={state.isDragging}
        accept="image/*"
      >
        <FileUpload.Trigger hideDefaultContent>
          <FileUpload.Dropzone
            hideDefaultContent
            className="size-32 min-h-0 rounded-full p-0"
          >
            {state.files.length > 0 ? (
              <img
                src={state.files[0].preview}
                alt="Avatar"
                className="size-full rounded-full object-cover"
              />
            ) : (
              <div className="text-ppx-neutral-10 flex flex-col items-center justify-center">
                <UserIcon className="size-10" />
                <span className="mt-1 text-xs">Upload</span>
              </div>
            )}
          </FileUpload.Dropzone>
        </FileUpload.Trigger>
      </FileUpload.Root>
      <p className="text-ppx-neutral-10 text-xs">
        Click or drag to upload avatar
      </p>
    </div>
  );
}

// ============================================================================
// Multiple Images Grid
// ============================================================================

export function MultipleImagesGridDemo() {
  const [state, actions] = useFileUpload({
    accept: "image/*",
    maxSize: 5 * 1024 * 1024,
    maxFiles: 8,
    multiple: true,
  });

  return (
    <div className="w-full max-w-md">
      <FileUpload.Root
        files={state.files}
        addFiles={actions.addFiles}
        removeFile={actions.removeFile}
        clearFiles={actions.clearFiles}
        openFileDialog={actions.openFileDialog}
        getInputProps={actions.getInputProps}
        handleDragEnter={actions.handleDragEnter}
        handleDragLeave={actions.handleDragLeave}
        handleDragOver={actions.handleDragOver}
        handleDrop={actions.handleDrop}
        isDragActive={state.isDragging}
        accept="image/*"
        multiple
      >
        <FileUpload.Dropzone
          size="sm"
          dropzoneText="Drop images here"
          browseText="Select images"
        />
        {state.files.length > 0 && (
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-ppx-neutral-14 text-sm font-medium">
                Uploaded ({state.files.length}/8)
              </span>
              <FileUpload.ClearButton className="text-xs">
                Remove all
              </FileUpload.ClearButton>
            </div>
            <FileUpload.ImageGrid className="grid-cols-4 gap-2">
              {(files) =>
                files.map((file) => (
                  <FileUpload.ImageGridItem key={file.id} file={file} />
                ))
              }
            </FileUpload.ImageGrid>
          </div>
        )}
      </FileUpload.Root>
    </div>
  );
}

// ============================================================================
// Multiple Files with List
// ============================================================================

export function MultipleFilesListDemo() {
  const [state, actions] = useFileUpload({
    maxSize: 100 * 1024 * 1024,
    maxFiles: 10,
    multiple: true,
  });

  return (
    <div className="w-full max-w-md">
      <FileUpload.Root
        files={state.files}
        addFiles={actions.addFiles}
        removeFile={actions.removeFile}
        clearFiles={actions.clearFiles}
        openFileDialog={actions.openFileDialog}
        getInputProps={actions.getInputProps}
        handleDragEnter={actions.handleDragEnter}
        handleDragLeave={actions.handleDragLeave}
        handleDragOver={actions.handleDragOver}
        handleDrop={actions.handleDrop}
        isDragActive={state.isDragging}
        multiple
      >
        <FileUpload.Dropzone
          dropzoneText="Drag & drop files here"
          browseText="Browse files"
        />
        {state.files.length > 0 && (
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-ppx-neutral-14 text-sm font-medium">
                Files ({state.files.length})
              </span>
              <FileUpload.ClearButton className="text-ppx-red-5 hover:text-ppx-red-6 text-xs">
                Remove all
              </FileUpload.ClearButton>
            </div>
            <FileUpload.ItemList className="max-h-64 overflow-y-auto">
              {(files) =>
                files.map((file) => (
                  <FileUpload.Item key={file.id} file={file}>
                    <FileUpload.ItemPreview
                      fallback={<FileTypeIcon type={file.file.type} />}
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <FileUpload.ItemName />
                      <FileUpload.ItemSize />
                    </div>
                    <FileUpload.ItemRemove />
                  </FileUpload.Item>
                ))
              }
            </FileUpload.ItemList>
          </div>
        )}
      </FileUpload.Root>
    </div>
  );
}

// ============================================================================
// Compact File Upload (Button Only)
// ============================================================================

export function CompactUploadDemo() {
  const [state, actions] = useFileUpload({
    accept: ".pdf,.doc,.docx",
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  return (
    <div className="w-full max-w-sm">
      <FileUpload.Root
        files={state.files}
        addFiles={actions.addFiles}
        removeFile={actions.removeFile}
        clearFiles={actions.clearFiles}
        openFileDialog={actions.openFileDialog}
        getInputProps={actions.getInputProps}
        handleDragEnter={actions.handleDragEnter}
        handleDragLeave={actions.handleDragLeave}
        handleDragOver={actions.handleDragOver}
        handleDrop={actions.handleDrop}
        isDragActive={state.isDragging}
        accept=".pdf,.doc,.docx"
      >
        <div className="flex items-center gap-3">
          <FileUpload.Trigger variant="outline" size="sm">
            <UploadIcon className="size-4" />
            Upload document
          </FileUpload.Trigger>
          {state.files.length > 0 && (
            <span className="text-ppx-neutral-12 text-sm">
              {state.files[0].file.name}
            </span>
          )}
        </div>
      </FileUpload.Root>
    </div>
  );
}

// ============================================================================
// Upload with Progress Simulation
// ============================================================================

export function UploadWithProgressDemo() {
  const [state, actions] = useFileUpload({
    multiple: true,
    upload: {
      autoUpload: true,
      getPresignedUrl: async ({ filename }) => {
        await new Promise((r) => setTimeout(r, 200));
        return {
          result: {
            url: `https://example.com/upload/${filename}`,
            fullPath: `https://cdn.example.com/${filename}`,
          },
        };
      },
      uploadFile: async (_url, _file, presignedData, onProgress) => {
        for (let i = 0; i <= 100; i += 5) {
          await new Promise((r) => setTimeout(r, 100));
          onProgress?.(i);
        }
        return { result: { url: presignedData.fullPath } };
      },
    },
  });

  return (
    <div className="w-full max-w-md">
      <FileUpload.Root
        files={state.files}
        addFiles={actions.addFiles}
        removeFile={actions.removeFile}
        clearFiles={actions.clearFiles}
        retryUpload={actions.retryUpload}
        openFileDialog={actions.openFileDialog}
        getInputProps={actions.getInputProps}
        handleDragEnter={actions.handleDragEnter}
        handleDragLeave={actions.handleDragLeave}
        handleDragOver={actions.handleDragOver}
        handleDrop={actions.handleDrop}
        isDragActive={state.isDragging}
        isUploading={state.isUploading}
        multiple
      >
        <FileUpload.Dropzone size="sm" />
        {state.files.length > 0 && (
          <FileUpload.ItemList className="mt-4">
            {(files) =>
              files.map((file) => (
                <FileUpload.Item key={file.id} file={file}>
                  <FileUpload.ItemPreview
                    fallback={<FileTypeIcon type={file.file.type} />}
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <FileUpload.ItemName />
                      <FileUpload.ItemStatus />
                    </div>
                    <FileUpload.ItemProgress />
                    <FileUpload.ItemError />
                  </div>
                  <FileUpload.ItemRetry />
                  <FileUpload.ItemRemove />
                </FileUpload.Item>
              ))
            }
          </FileUpload.ItemList>
        )}
      </FileUpload.Root>
    </div>
  );
}

// ============================================================================
// Files Table
// ============================================================================

export function FilesTableDemo() {
  const [state, actions] = useFileUpload({
    maxFiles: 10,
    multiple: true,
  });

  return (
    <div className="w-full max-w-lg">
      <FileUpload.Root
        files={state.files}
        addFiles={actions.addFiles}
        removeFile={actions.removeFile}
        clearFiles={actions.clearFiles}
        openFileDialog={actions.openFileDialog}
        getInputProps={actions.getInputProps}
        handleDragEnter={actions.handleDragEnter}
        handleDragLeave={actions.handleDragLeave}
        handleDragOver={actions.handleDragOver}
        handleDrop={actions.handleDrop}
        isDragActive={state.isDragging}
        multiple
      >
        <FileUpload.Dropzone size="sm" />
        {state.files.length > 0 && (
          <div className="rounded-ppx-s border-ppx-neutral-4 mt-4 overflow-hidden border">
            <div className="bg-ppx-neutral-2 flex items-center justify-between px-4 py-2">
              <span className="text-ppx-neutral-14 text-sm font-medium">
                Files ({state.files.length})
              </span>
              <div className="flex gap-2">
                <FileUpload.Trigger size="sm" variant="ghost">
                  Add files
                </FileUpload.Trigger>
                <FileUpload.ClearButton
                  size="sm"
                  variant="ghost"
                  className="text-ppx-red-5"
                >
                  Remove all
                </FileUpload.ClearButton>
              </div>
            </div>
            <table className="w-full">
              <thead className="border-ppx-neutral-4 bg-ppx-neutral-1 border-b">
                <tr className="text-ppx-neutral-12 text-left text-xs font-medium">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Size</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-ppx-neutral-3 divide-y">
                {state.files.map((file) => (
                  <tr key={file.id} className="text-sm">
                    <td className="text-ppx-neutral-14 max-w-[200px] truncate px-4 py-2 font-medium">
                      {file.file.name}
                    </td>
                    <td className="text-ppx-neutral-10 px-4 py-2">
                      {getFileExtension(file.file.name).toUpperCase()}
                    </td>
                    <td className="text-ppx-neutral-10 px-4 py-2">
                      {formatBytes(file.file.size)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => actions.removeFile(file.id)}
                        className="text-ppx-red-5 hover:text-ppx-red-6"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </FileUpload.Root>
    </div>
  );
}

// ============================================================================
// Mixed Content Cards
// ============================================================================

export function MixedContentCardsDemo() {
  const [state, actions] = useFileUpload({
    multiple: true,
  });

  return (
    <div className="w-full max-w-md">
      <FileUpload.Root
        files={state.files}
        addFiles={actions.addFiles}
        removeFile={actions.removeFile}
        clearFiles={actions.clearFiles}
        openFileDialog={actions.openFileDialog}
        getInputProps={actions.getInputProps}
        handleDragEnter={actions.handleDragEnter}
        handleDragLeave={actions.handleDragLeave}
        handleDragOver={actions.handleDragOver}
        handleDrop={actions.handleDrop}
        isDragActive={state.isDragging}
        multiple
      >
        <FileUpload.Dropzone size="sm" />
        {state.files.length > 0 && (
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-ppx-neutral-14 text-sm font-medium">
                Files ({state.files.length})
              </span>
              <FileUpload.ClearButton className="text-xs">
                Remove all
              </FileUpload.ClearButton>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {state.files.map((file) => (
                <div
                  key={file.id}
                  className="rounded-ppx-s border-ppx-neutral-4 bg-ppx-neutral-1 group relative overflow-hidden border"
                >
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="h-24 w-full object-cover"
                    />
                  ) : (
                    <div className="bg-ppx-neutral-2 flex h-24 w-full items-center justify-center">
                      <FileTypeIcon type={file.file.type} className="size-10" />
                    </div>
                  )}
                  <div className="p-2">
                    <p className="text-ppx-neutral-14 truncate text-xs font-medium">
                      {file.file.name}
                    </p>
                    <p className="text-ppx-neutral-10 text-xs">
                      {formatBytes(file.file.size)}
                    </p>
                  </div>
                  <button
                    onClick={() => actions.removeFile(file.id)}
                    className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <CloseIcon className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </FileUpload.Root>
    </div>
  );
}

// ============================================================================
// Dropzone Sizes
// ============================================================================

export function DropzoneSizesDemo() {
  const [stateSmall, actionsSmall] = useFileUpload({});
  const [stateDefault, actionsDefault] = useFileUpload({});
  const [stateLarge, actionsLarge] = useFileUpload({});

  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <p className="text-ppx-neutral-10 mb-2 text-xs font-medium">Small</p>
        <FileUpload.Root
          files={stateSmall.files}
          addFiles={actionsSmall.addFiles}
          removeFile={actionsSmall.removeFile}
          clearFiles={actionsSmall.clearFiles}
          openFileDialog={actionsSmall.openFileDialog}
          getInputProps={actionsSmall.getInputProps}
          handleDragEnter={actionsSmall.handleDragEnter}
          handleDragLeave={actionsSmall.handleDragLeave}
          handleDragOver={actionsSmall.handleDragOver}
          handleDrop={actionsSmall.handleDrop}
          isDragActive={stateSmall.isDragging}
        >
          <FileUpload.Dropzone size="sm" />
        </FileUpload.Root>
      </div>
      <div>
        <p className="text-ppx-neutral-10 mb-2 text-xs font-medium">Default</p>
        <FileUpload.Root
          files={stateDefault.files}
          addFiles={actionsDefault.addFiles}
          removeFile={actionsDefault.removeFile}
          clearFiles={actionsDefault.clearFiles}
          openFileDialog={actionsDefault.openFileDialog}
          getInputProps={actionsDefault.getInputProps}
          handleDragEnter={actionsDefault.handleDragEnter}
          handleDragLeave={actionsDefault.handleDragLeave}
          handleDragOver={actionsDefault.handleDragOver}
          handleDrop={actionsDefault.handleDrop}
          isDragActive={stateDefault.isDragging}
        >
          <FileUpload.Dropzone size="default" />
        </FileUpload.Root>
      </div>
      <div>
        <p className="text-ppx-neutral-10 mb-2 text-xs font-medium">Large</p>
        <FileUpload.Root
          files={stateLarge.files}
          addFiles={actionsLarge.addFiles}
          removeFile={actionsLarge.removeFile}
          clearFiles={actionsLarge.clearFiles}
          openFileDialog={actionsLarge.openFileDialog}
          getInputProps={actionsLarge.getInputProps}
          handleDragEnter={actionsLarge.handleDragEnter}
          handleDragLeave={actionsLarge.handleDragLeave}
          handleDragOver={actionsLarge.handleDragOver}
          handleDrop={actionsLarge.handleDrop}
          isDragActive={stateLarge.isDragging}
        >
          <FileUpload.Dropzone size="lg" />
        </FileUpload.Root>
      </div>
    </div>
  );
}

// ============================================================================
// Helper Icons
// ============================================================================

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function FileTypeIcon({
  type,
  className = "size-5 text-ppx-neutral-10",
}: {
  type: string;
  className?: string;
}) {
  // PDF
  if (type === "application/pdf") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8.5 13a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM9 18H7v-1h2v1zm3 0h-2v-1h2v1zm0-3h-2v-1h2v1zm3 3h-2v-1h2v1z" />
      </svg>
    );
  }

  // Image
  if (type.startsWith("image/")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" />
      </svg>
    );
  }

  // Audio
  if (type.startsWith("audio/")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    );
  }

  // Video
  if (type.startsWith("video/")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
      </svg>
    );
  }

  // Archive/ZIP
  if (type.includes("zip") || type.includes("archive")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM9.5 8h2v2h-2V8zm0 3h2v2h-2v-2zm0 3h2v2h-2v-2zm0 3h2v2h-2v-2z" />
      </svg>
    );
  }

  // Default file
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4z" />
    </svg>
  );
}

function getFileExtension(filename: string): string {
  return filename.split(".").pop() || "";
}

// ============================================================================
// FileUploadField Demos
// ============================================================================

// Dummy upload functions (simulated)
const getPresignedUrl = async ({
  filename,
}: {
  filename: string;
  contentType: string;
  size: number;
}) => {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 200));
  return {
    result: {
      url: `https://example.com/upload/${filename}`,
      fullPath: `https://cdn.example.com/${filename}`,
    },
  };
};

const uploadFile = async (
  _url: string,
  _file: File,
  presignedData: { url: string; fullPath: string },
  onProgress?: (progress: number) => void,
) => {
  // Simulate upload with progress
  for (let i = 0; i <= 100; i += 10) {
    await new Promise((r) => setTimeout(r, 100));
    onProgress?.(i);
  }
  return { result: { url: presignedData.fullPath } };
};

export function SimpleUploadDemo() {
  return (
    <div className="w-full max-w-md">
      <FileUploadField
        accept="image/*,.pdf,.doc,.docx"
        maxSize={10 * 1024 * 1024}
        onFilesChange={(files: FileWithPreview[]) =>
          console.log("Files changed:", files)
        }
      />
    </div>
  );
}

export function SimpleUploadWithS3Demo() {
  const [uploadedCount, setUploadedCount] = React.useState(0);

  return (
    <div className="w-full max-w-md">
      <FileUploadField
        accept="image/*,.pdf"
        multiple
        maxFiles={5}
        maxSize={5 * 1024 * 1024}
        upload={{
          getPresignedUrl: getPresignedUrl,
          uploadFile: uploadFile,
          onUploadComplete: (file: FileWithUploadStatus) => {
            console.log("Uploaded:", file);
          },
          onAllUploadsComplete: (files: FileWithUploadStatus[]) => {
            setUploadedCount(files.length);
            console.log("All uploads complete:", files);
          },
        }}
        onFilesChange={(files: FileWithPreview[]) =>
          console.log("Files:", files)
        }
      />
      {uploadedCount > 0 && (
        <div className="mt-4">
          <p className="text-ppx-neutral-10 text-sm">
            {uploadedCount} file(s) uploaded successfully
          </p>
        </div>
      )}
    </div>
  );
}

export function SimpleButtonVariantDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-ppx-neutral-10 mb-2 text-xs font-medium">
          Button Variant
        </p>
        <FileUploadField
          variant="button"
          buttonText="Upload Files"
          multiple
          upload={{
            getPresignedUrl: getPresignedUrl,
            uploadFile: uploadFile,
          }}
        />
      </div>
      <div>
        <p className="text-ppx-neutral-10 mb-2 text-xs font-medium">
          Compact Variant
        </p>
        <FileUploadField
          variant="compact"
          accept=".pdf,.doc,.docx"
          upload={{
            getPresignedUrl: getPresignedUrl,
            uploadFile: uploadFile,
          }}
        />
      </div>
    </div>
  );
}

export function SimpleImageGridDemo() {
  return (
    <div className="w-full max-w-md">
      <FileUploadField
        accept="image/*"
        multiple
        maxFiles={8}
        showImageGrid
        size="sm"
        dropzoneText="Drop images here"
        buttonText="Select images"
        upload={{
          getPresignedUrl: getPresignedUrl,
          uploadFile: uploadFile,
        }}
      />
    </div>
  );
}
