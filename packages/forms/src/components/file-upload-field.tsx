import * as React from "react";
import {
  FileUpload,
  useFileUpload,
  type UseFileUploadOptions,
  type FileUploadItem,
  getFileTypeIcon,
} from "@px-ui/core";

// ============================================================================
// Types
// ============================================================================

export interface FileUploadFieldProps
  extends Omit<UseFileUploadOptions, "initialFiles"> {
  /** Size of the dropzone */
  size?: "sm" | "default" | "lg";
  /** Text displayed in the dropzone */
  dropzoneText?: string;
  /** Text for the browse/upload button */
  buttonText?: string;
  /** Show file list below the dropzone */
  showFileList?: boolean;
  /** Initial files (already uploaded) */
  initialFiles?: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }>;
  /** Whether the upload is disabled */
  disabled?: boolean;
  /** Custom className */
  className?: string;
  /** Custom content to render inside the dropzone */
  children?: React.ReactNode;
  /** Render prop for custom file item rendering */
  renderFileItem?: (
    file: FileUploadItem,
    actions: { remove: () => void; retry: () => void },
  ) => React.ReactNode;
  /** Error handler */
  onError?: (error: { type: string; message: string; files?: File[] }) => void;
}

// ============================================================================
// Main Component
// ============================================================================

export function FileUploadField({
  size = "default",
  dropzoneText = "Paste Or Drag & Drop Files Here",
  buttonText = "Browse for files",
  showFileList = true,
  initialFiles = [],
  disabled = false,
  className,
  children,
  renderFileItem,
  onError,
  // Hook options
  maxFiles,
  maxSize,
  accept,
  multiple = false,
  onFilesChange,
  onFilesAdded,
  upload: uploadConfig,
}: FileUploadFieldProps) {
  const uploadHook = useFileUpload({
    maxFiles,
    maxSize,
    accept,
    multiple,
    initialFiles: initialFiles.map((f) => ({
      ...f,
      id: f.id,
      name: f.name,
      size: f.size,
      type: f.type,
      url: f.url,
    })),
    onFilesChange,
    onFilesAdded,
    upload: uploadConfig,
  });

  const { files, errors, retryUpload, removeFile } = uploadHook;

  // Handle errors
  React.useEffect(() => {
    if (errors.length > 0 && onError) {
      onError({
        type: "validation",
        message: errors[0],
      });
    }
  }, [errors, onError]);

  // Render file item using ListItem or custom render prop
  const renderDefaultFileItem = (file: FileUploadItem) => {
    if (renderFileItem) {
      return renderFileItem(file, {
        remove: () => removeFile(file.id),
        retry: () => retryUpload(file.id),
      });
    }

    return <FileUpload.ListItem key={file.id} file={file} />;
  };

  return (
    <FileUpload.Root
      key={uploadHook.instanceKey}
      upload={uploadHook}
      accept={accept}
      multiple={multiple}
      disabled={disabled}
      className={className}
    >
      <FileUpload.Dropzone
        size={size}
        dropzoneText={dropzoneText}
        browseText={buttonText}
        hideDefaultContent={!!children}
      >
        {children}
      </FileUpload.Dropzone>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="text-ppx-red-5 text-sm">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      )}

      {/* File List */}
      {showFileList && files.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-ppx-neutral-14 text-sm font-medium">
              {multiple ? `Files (${files.length})` : "Selected file"}
            </span>
            {multiple && files.length > 1 && (
              <FileUpload.ClearAll
                size="sm"
                className="text-ppx-red-5 hover:text-ppx-red-6"
              >
                Remove all
              </FileUpload.ClearAll>
            )}
          </div>

          <FileUpload.List>
            {files.map(renderDefaultFileItem)}
          </FileUpload.List>
        </div>
      )}
    </FileUpload.Root>
  );
}

export type {
  FileUploadItem,
  UploadConfig,
  UseFileUploadOptions as FileUploadWithUploaderOptions,
} from "@px-ui/core";
