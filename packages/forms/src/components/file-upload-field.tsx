import * as React from "react";
import {
  FileIcon,
  UploadIcon,
  FileUpload,
  useFileUpload,
  type FileUploadWithUploaderOptions,
  type FileWithPreview,
  type FileWithUploadStatus,
} from "@px-ui/core";

// ============================================================================
// Types
// ============================================================================

export interface FileUploadFieldProps
  extends Omit<FileUploadWithUploaderOptions, "initialFiles"> {
  /** Variant determines the visual layout */
  variant?: "dropzone" | "button" | "compact";
  /** Size of the dropzone (only applies to dropzone variant) */
  size?: "sm" | "default" | "lg";
  /** Text displayed in the dropzone */
  dropzoneText?: string;
  /** Text for the browse/upload button */
  buttonText?: string;
  /** Show file list below the dropzone */
  showFileList?: boolean;
  /** Show image grid instead of list for image files */
  showImageGrid?: boolean;
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
    file: FileWithUploadStatus,
    actions: { remove: () => void; retry: () => void },
  ) => React.ReactNode;
  /** Error handler */
  onError?: (error: { type: string; message: string; files?: File[] }) => void;
}

// ============================================================================
// Main Component
// ============================================================================

export function FileUploadField({
  variant = "dropzone",
  size = "default",
  dropzoneText = "Paste Or Drag & Drop Files Here",
  buttonText = "Browse for files",
  showFileList = true,
  showImageGrid = false,
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
  upload,
}: FileUploadFieldProps) {
  const [state, actions] = useFileUpload({
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
    onFilesChange: onFilesChange as (files: FileWithPreview[]) => void,
    onFilesAdded: onFilesAdded as (files: FileWithPreview[]) => void,
    upload,
  });

  const { files, isDragging, errors, isUploading } = state;
  const {
    addFiles,
    removeFile,
    clearFiles,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    openFileDialog,
    getInputProps,
    retryUpload,
  } = actions;

  // Handle errors
  React.useEffect(() => {
    if (errors.length > 0 && onError) {
      onError({
        type: "validation",
        message: errors[0],
      });
    }
  }, [errors, onError]);

  // Common props for FileUpload.Root
  const rootProps = {
    files,
    addFiles,
    removeFile,
    clearFiles,
    retryUpload,
    openFileDialog,
    getInputProps,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    isDragActive: isDragging,
    isUploading,
    accept,
    multiple,
    disabled,
  };

  // Render file item using primitives or custom render prop
  const renderDefaultFileItem = (file: FileWithUploadStatus) => {
    if (renderFileItem) {
      return renderFileItem(file, {
        remove: () => removeFile(file.id),
        retry: () => retryUpload(file.id),
      });
    }

    const isImage = file.file.type?.startsWith("image/") ?? false;

    return (
      <FileUpload.Item key={file.id} file={file}>
        <FileUpload.ItemPreview
          fallback={
            isImage ? undefined : (
              <FileIcon className="text-ppx-neutral-10 size-5" />
            )
          }
        />

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <FileUpload.ItemName />

          <div className="flex items-center gap-2">
            <FileUpload.ItemSize />
            {file.status === "uploading" && (
              <FileUpload.ItemProgress className="flex-1" />
            )}
          </div>

          <FileUpload.ItemError />
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <FileUpload.ItemStatus />
          <FileUpload.ItemRetry />
          <FileUpload.ItemRemove />
        </div>
      </FileUpload.Item>
    );
  };

  // Render image grid item using primitives
  const renderImageGridItem = (file: FileWithUploadStatus) => (
    <FileUpload.ImageGridItem key={file.id} file={file} showStatusOverlay />
  );

  // Render based on variant
  if (variant === "button" || variant === "compact") {
    return (
      <FileUpload.Root {...rootProps} className={className}>
        <div className="flex items-center gap-3">
          <FileUpload.Trigger
            uploadingText={buttonText}
            showUploadingState={variant === "compact"}
            variant={variant === "button" ? "default" : "outline"}
            size={size}
          />
        </div>

        {/* File List */}
        {showFileList && files.length > 0 && variant !== "compact" && (
          <FileUpload.ItemList>
            {files.map(renderDefaultFileItem)}
          </FileUpload.ItemList>
        )}
      </FileUpload.Root>
    );
  }

  // Dropzone variant (default)
  return (
    <FileUpload.Root {...rootProps} className={className}>
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

      {/* File List or Image Grid */}
      {showFileList && files.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-ppx-neutral-14 text-sm font-medium">
              {multiple ? `Files (${files.length})` : "Selected file"}
            </span>
            {multiple && files.length > 1 && (
              <FileUpload.ClearButton
                size="sm"
                className="text-ppx-red-5 hover:text-ppx-red-6"
              >
                Remove all
              </FileUpload.ClearButton>
            )}
          </div>

          {showImageGrid ? (
            <FileUpload.ImageGrid>
              {files.map(renderImageGridItem)}
            </FileUpload.ImageGrid>
          ) : (
            <FileUpload.ItemList>
              {files.map(renderDefaultFileItem)}
            </FileUpload.ItemList>
          )}
        </div>
      )}
    </FileUpload.Root>
  );
}

export type {
  FileWithUploadStatus,
  UploadConfig,
  FileUploadWithUploaderOptions,
} from "@px-ui/core";
