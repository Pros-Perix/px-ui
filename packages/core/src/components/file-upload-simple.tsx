import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";
import { Button } from "./button";
import { FileUpload, formatFileSize, type FileUploadFile } from "./file-upload";
import UploadCloudIcon from "../icons/upload-cloud-icon";
import CloseIcon from "../icons/close-icon";
import {
  useFileUploadWithUploader,
  type FileUploadWithUploaderOptions,
  type FileWithPreview,
  type FileWithUploadStatus,
} from "../hooks/use-file-upload";

// ============================================================================
// Types
// ============================================================================

export interface FileUploadSimpleProps
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
// Dropzone Styles
// ============================================================================

const dropzoneVariants = cva(
  "flex flex-col items-center justify-center gap-4 rounded-ppx-m bg-ppx-neutral-2 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ppx-neutral-17/30",
  {
    variants: {
      size: {
        default: "p-8 min-h-[200px]",
        sm: "p-6 min-h-[160px]",
        lg: "p-10 min-h-[260px]",
      },
      isDragActive: {
        true: "border-2 border-dashed border-ppx-primary-5 bg-ppx-primary-1",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      isDragActive: false,
    },
  },
);

// ============================================================================
// Main Component
// ============================================================================

export function FileUploadSimple({
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
}: FileUploadSimpleProps) {
  const [state, actions] = useFileUploadWithUploader({
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

  const inputProps = getInputProps({ disabled });

  // Render file item with status
  const renderDefaultFileItem = (file: FileWithUploadStatus) => {
    const isImage = file.file.type?.startsWith("image/") ?? false;

    return (
      <div
        key={file.id}
        className={cn(
          "rounded-ppx-s border-ppx-neutral-4 bg-ppx-neutral-1 flex items-center gap-3 border p-3",
          file.status === "error" && "border-ppx-red-4 bg-ppx-red-1",
        )}
      >
        {/* Preview */}
        <div className="rounded-ppx-xs bg-ppx-neutral-3 flex size-10 shrink-0 items-center justify-center overflow-hidden">
          {file.preview && isImage ? (
            <img
              src={file.preview}
              alt={file.file.name}
              className="size-full object-cover"
            />
          ) : (
            <FileIcon className="text-ppx-neutral-10 size-5" />
          )}
        </div>

        {/* Info */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-ppx-sm text-ppx-neutral-14 truncate font-medium">
              {file.file.name}
            </span>
            {file.status === "uploading" && (
              <span className="text-ppx-xs text-ppx-neutral-10 ml-2 shrink-0">
                {file.progress}%
              </span>
            )}
            {file.status === "success" && (
              <CheckIcon className="text-ppx-green-5 ml-2 size-4 shrink-0" />
            )}
            {file.status === "error" && (
              <span className="text-ppx-xs text-ppx-red-5 ml-2 shrink-0">
                Failed
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-ppx-xs text-ppx-neutral-10">
              {formatFileSize(file.file.size)}
            </span>
            {file.status === "uploading" && (
              <div className="bg-ppx-neutral-3 h-1.5 flex-1 overflow-hidden rounded-full">
                <div
                  className="bg-ppx-primary-5 h-full transition-all duration-300"
                  style={{ width: `${file.progress}%` }}
                />
              </div>
            )}
          </div>

          {file.error && (
            <span className="text-ppx-xs text-ppx-red-5">{file.error}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1">
          {file.status === "error" && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => retryUpload(file.id)}
              aria-label="Retry upload"
            >
              <RetryIcon className="size-4" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => removeFile(file.id)}
            aria-label={`Remove ${file.file.name}`}
          >
            <CloseIcon className="size-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Render image grid item
  const renderImageGridItem = (file: FileWithUploadStatus) => (
    <div
      key={file.id}
      className={cn(
        "rounded-ppx-s group relative aspect-square overflow-hidden",
        file.status === "error" && "ring-ppx-red-5 ring-2",
      )}
    >
      {file.preview ? (
        <img
          src={file.preview}
          alt={file.file.name}
          className="size-full object-cover"
        />
      ) : (
        <div className="bg-ppx-neutral-3 flex size-full items-center justify-center">
          <FileIcon className="text-ppx-neutral-10 size-8" />
        </div>
      )}

      {/* Upload overlay */}
      {file.status === "uploading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="text-sm font-medium text-white">{file.progress}%</div>
        </div>
      )}

      {/* Error overlay */}
      {file.status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => retryUpload(file.id)}
            className="text-white hover:text-white"
          >
            <RetryIcon className="size-5" />
          </Button>
        </div>
      )}

      {/* Success indicator */}
      {file.status === "success" && (
        <div className="bg-ppx-green-5 absolute bottom-1 right-1 rounded-full p-0.5">
          <CheckIcon className="size-3 text-white" />
        </div>
      )}

      {/* Remove button */}
      <button
        type="button"
        onClick={() => removeFile(file.id)}
        className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
        aria-label={`Remove ${file.file.name}`}
      >
        <CloseIcon className="size-3" />
      </button>
    </div>
  );

  // Render based on variant
  if (variant === "button" || variant === "compact") {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        <input {...inputProps} className="sr-only" />

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant={variant === "compact" ? "outline" : "default"}
            size={variant === "compact" ? "sm" : "default"}
            onClick={openFileDialog}
            disabled={disabled || isUploading}
          >
            {isUploading ? (
              <>
                <SpinnerIcon className="size-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <UploadIcon className="size-4" />
                {buttonText}
              </>
            )}
          </Button>

          {variant === "compact" && files.length > 0 && (
            <span className="text-ppx-neutral-12 truncate text-sm">
              {files.length === 1
                ? files[0].file.name
                : `${files.length} files selected`}
            </span>
          )}
        </div>

        {/* File List */}
        {showFileList && files.length > 0 && variant !== "compact" && (
          <div className="flex flex-col gap-2">
            {files.map((file) =>
              renderFileItem
                ? renderFileItem(file, {
                    remove: () => removeFile(file.id),
                    retry: () => retryUpload(file.id),
                  })
                : renderDefaultFileItem(file),
            )}
          </div>
        )}
      </div>
    );
  }

  // Dropzone variant (default)
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <input {...inputProps} className="sr-only" />

      <div
        className={cn(
          dropzoneVariants({ size, isDragActive: isDragging }),
          disabled && "cursor-not-allowed opacity-60",
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openFileDialog();
          }
        }}
      >
        {children ? (
          children
        ) : (
          <>
            <div className="text-ppx-neutral-10 flex items-center gap-3">
              <UploadCloudIcon size={40} aria-hidden="true" />
              <span className="text-ppx-base text-ppx-neutral-13 font-medium">
                {dropzoneText}
              </span>
            </div>

            <div className="flex w-full items-center gap-3" aria-hidden="true">
              <div className="bg-ppx-neutral-5 h-px flex-1" />
              <span className="text-ppx-sm text-ppx-neutral-10 font-medium">
                OR
              </span>
              <div className="bg-ppx-neutral-5 h-px flex-1" />
            </div>

            <Button
              type="button"
              variant="default"
              onClick={openFileDialog}
              disabled={disabled || isUploading}
            >
              {isUploading ? (
                <>
                  <SpinnerIcon className="size-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                buttonText
              )}
            </Button>
          </>
        )}
      </div>

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
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFiles}
                className="text-ppx-red-5 hover:text-ppx-red-6"
              >
                Remove all
              </Button>
            )}
          </div>

          {showImageGrid ? (
            <div className="grid grid-cols-4 gap-2">
              {files.map(renderImageGridItem)}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {files.map((file) =>
                renderFileItem
                  ? renderFileItem(file, {
                      remove: () => removeFile(file.id),
                      retry: () => retryUpload(file.id),
                    })
                  : renderDefaultFileItem(file),
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Helper Icons
// ============================================================================

function FileIcon({ className }: { className?: string }) {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function RetryIcon({ className }: { className?: string }) {
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
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
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

function SpinnerIcon({ className }: { className?: string }) {
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
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

// ============================================================================
// Export hook for direct use
// ============================================================================

export { useFileUploadWithUploader } from "../hooks/use-file-upload";
export type {
  FileWithUploadStatus,
  UploadConfig,
  FileUploadWithUploaderOptions,
} from "../hooks/use-file-upload";
