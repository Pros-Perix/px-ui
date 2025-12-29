import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";
import { Button } from "./button";
import UploadCloudIcon from "../icons/upload-cloud-icon";
import CloseIcon from "../icons/close-icon";
import CheckIcon from "../icons/check-icon";
import RetryIcon from "../icons/retry-icon";
import SpinnerIcon from "../icons/spinner-icon";
import UploadIcon from "../icons/upload-icon";
import type {
  FileWithUploadStatus,
  FileUploadWithUploaderActions,
} from "../hooks/use-file-upload";
import { formatBytes } from "../hooks/use-file-upload";
import FileIcon from "../icons/file-icon";

// ============================================================================
// Types
// ============================================================================

export interface FileUploadFile {
  id: string;
  file: File | { name: string; size: number; type: string; url?: string };
  progress?: number;
  status?: "idle" | "uploading" | "success" | "error";
  preview?: string;
  error?: string;
  uploadedUrl?: string;
}

// ============================================================================
// Context
// ============================================================================

interface FileUploadContextValue {
  files: FileUploadFile[];
  addFiles: (files: FileList | File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  retryUpload?: (id: string) => Promise<void>;
  accept?: string;
  multiple: boolean;
  disabled: boolean;
  isDragActive: boolean;
  isUploading: boolean;
  openFileDialog: () => void;
  getInputProps: FileUploadWithUploaderActions["getInputProps"];
  handleDragEnter: FileUploadWithUploaderActions["handleDragEnter"];
  handleDragLeave: FileUploadWithUploaderActions["handleDragLeave"];
  handleDragOver: FileUploadWithUploaderActions["handleDragOver"];
  handleDrop: FileUploadWithUploaderActions["handleDrop"];
}

const FileUploadContext = React.createContext<FileUploadContextValue | null>(
  null,
);

function useFileUploadContext() {
  const context = React.useContext(FileUploadContext);
  if (!context) {
    throw new Error(
      "FileUpload components must be used within FileUpload.Root",
    );
  }
  return context;
}

// ============================================================================
// Root Component
// ============================================================================

export interface RootProps {
  children: React.ReactNode;
  /** Files from the useFileUpload hook */
  files: FileUploadFile[] | FileWithUploadStatus[];
  /** Add files action from the hook */
  addFiles: (files: FileList | File[]) => void;
  /** Remove file action from the hook */
  removeFile: (id: string) => void;
  /** Clear files action from the hook */
  clearFiles: () => void;
  /** Retry upload action from the hook */
  retryUpload?: (id: string) => Promise<void>;
  /** Open file dialog action from the hook */
  openFileDialog: () => void;
  /** Get input props from the hook */
  getInputProps: FileUploadWithUploaderActions["getInputProps"];
  /** Handle drag enter from the hook */
  handleDragEnter: FileUploadWithUploaderActions["handleDragEnter"];
  /** Handle drag leave from the hook */
  handleDragLeave: FileUploadWithUploaderActions["handleDragLeave"];
  /** Handle drag over from the hook */
  handleDragOver: FileUploadWithUploaderActions["handleDragOver"];
  /** Handle drop from the hook */
  handleDrop: FileUploadWithUploaderActions["handleDrop"];
  /** Whether dragging is active (from hook state) */
  isDragActive?: boolean;
  /** Whether upload is in progress (from hook state) */
  isUploading?: boolean;
  /** Accepted file types (e.g., "image/*,.pdf") */
  accept?: string;
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Whether the upload is disabled */
  disabled?: boolean;
  className?: string;
}

function Root({
  children,
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
  isDragActive = false,
  isUploading = false,
  accept,
  multiple = false,
  disabled = false,
  className,
}: RootProps) {
  const contextValue: FileUploadContextValue = {
    files: files as FileUploadFile[],
    addFiles,
    removeFile,
    clearFiles,
    retryUpload,
    accept,
    multiple,
    disabled,
    isDragActive,
    isUploading,
    openFileDialog,
    getInputProps,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };

  return (
    <FileUploadContext.Provider value={contextValue}>
      <div
        data-slot="file-upload"
        className={cn("flex flex-col gap-4", className)}
      >
        {children}
      </div>
    </FileUploadContext.Provider>
  );
}

// ============================================================================
// Dropzone Component
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

export interface DropzoneProps
  extends Omit<React.ComponentProps<"div">, "children">,
    Omit<VariantProps<typeof dropzoneVariants>, "isDragActive"> {
  children?: React.ReactNode;
  /** Custom text for the dropzone */
  dropzoneText?: string;
  /** Custom text for the browse button */
  browseText?: string;
  /** Hide the default content */
  hideDefaultContent?: boolean;
}

function Dropzone({
  className,
  size,
  children,
  dropzoneText = "Paste Or Drag & Drop Files Here",
  browseText = "Browse for files",
  hideDefaultContent = false,
  ...props
}: DropzoneProps) {
  const {
    accept,
    multiple,
    disabled,
    isDragActive,
    isUploading,
    openFileDialog,
    getInputProps,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    addFiles,
  } = useFileUploadContext();

  const descriptionId = React.useId();
  const instructionsId = React.useId();
  const [announcement, setAnnouncement] = React.useState("");

  const inputProps = getInputProps();

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openFileDialog();
      }
    },
    [openFileDialog],
  );

  const handlePaste = React.useCallback(
    (e: React.ClipboardEvent) => {
      if (disabled) return;
      const files = e.clipboardData.files;
      if (files.length > 0) {
        e.preventDefault();
        // Convert FileList to array and add files
        const filesArray = Array.from(files);
        addFiles(filesArray);
        setAnnouncement(
          `${filesArray.length} file${filesArray.length > 1 ? "s" : ""} pasted`,
        );
      }
    },
    [disabled, addFiles],
  );

  return (
    <div
      data-slot="file-upload-dropzone"
      className={cn(
        dropzoneVariants({ size, isDragActive }),
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-disabled={disabled}
      aria-describedby={`${descriptionId} ${instructionsId}`}
      aria-label="File upload dropzone"
      {...props}
    >
      {/* Screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div id={descriptionId} className="sr-only">
        {dropzoneText}
      </div>
      <div id={instructionsId} className="sr-only">
        Press Enter or Space to browse files, or drag and drop files here.
      </div>

      <input
        {...inputProps}
        className="sr-only"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
      />

      {children ? (
        children
      ) : !hideDefaultContent ? (
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
              browseText
            )}
          </Button>
        </>
      ) : null}
    </div>
  );
}

// ============================================================================
// Trigger Component (standalone button)
// ============================================================================

export interface TriggerProps extends React.ComponentProps<typeof Button> {
  /** Text to show while uploading */
  uploadingText?: string;
  /** Show uploading state */
  showUploadingState?: boolean;
  /** Hide the default content */
  hideDefaultContent?: boolean;
}

function Trigger({
  children,
  uploadingText = "Uploading...",
  showUploadingState = true,
  hideDefaultContent = false,
  ...props
}: TriggerProps) {
  const { openFileDialog, disabled, isUploading } = useFileUploadContext();

  const isDisabled = disabled || (showUploadingState && isUploading);

  return (
    <Button
      type="button"
      onClick={openFileDialog}
      disabled={isDisabled}
      data-slot="file-upload-trigger"
      className={cn(
        hideDefaultContent &&
          "not-disabled:hover:bg-transparent h-auto border-none bg-transparent p-0 shadow-none hover:bg-transparent focus-visible:ring-0 active:bg-transparent",
        props.className,
      )}
      {...props}
    >
      {showUploadingState && isUploading ? (
        <>
          <SpinnerIcon className="size-4 animate-spin" />
          {uploadingText}
        </>
      ) : (
        (children ?? (
          <>
            <UploadIcon className="size-4" />
            Select files
          </>
        ))
      )}
    </Button>
  );
}

// ============================================================================
// ItemList Component
// ============================================================================

export interface ItemListProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  children?: React.ReactNode | ((files: FileUploadFile[]) => React.ReactNode);
}

function ItemList({ className, children, ...props }: ItemListProps) {
  const { files } = useFileUploadContext();

  if (files.length === 0) return null;

  return (
    <div
      data-slot="file-upload-item-list"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {typeof children === "function" ? children(files) : children}
    </div>
  );
}

// ============================================================================
// Item Component
// ============================================================================

const ItemContext = React.createContext<FileUploadFile | null>(null);

function useFileUploadItem() {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error(
      "FileUpload.Item* components must be used within FileUpload.Item",
    );
  }
  return context;
}

export interface ItemProps extends React.ComponentProps<"div"> {
  file: FileUploadFile;
  /** Apply error styling based on file status */
  statusStyles?: boolean;
}

function Item({
  file,
  className,
  children,
  statusStyles = true,
  ...props
}: ItemProps) {
  return (
    <ItemContext.Provider value={file}>
      <div
        data-slot="file-upload-item"
        data-status={file.status}
        className={cn(
          "rounded-ppx-s border-ppx-neutral-4 bg-ppx-neutral-1 flex items-center gap-3 border p-3",
          statusStyles &&
            file.status === "error" &&
            "border-ppx-red-4 bg-ppx-red-1",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ItemContext.Provider>
  );
}

// ============================================================================
// ItemPreview Component
// ============================================================================

export interface ItemPreviewProps extends React.ComponentProps<"div"> {
  /** Fallback icon when no preview is available */
  fallback?: React.ReactNode;
}

function ItemPreview({ className, fallback, ...props }: ItemPreviewProps) {
  const file = useFileUploadItem();

  return (
    <div
      data-slot="file-upload-item-preview"
      className={cn(
        "rounded-ppx-xs bg-ppx-neutral-3 flex size-10 shrink-0 items-center justify-center overflow-hidden",
        className,
      )}
      {...props}
    >
      {file.preview ? (
        <img
          src={file.preview}
          alt={file.file.name}
          className="size-full object-cover"
        />
      ) : (
        (fallback ?? <FileIcon className="text-ppx-neutral-10 size-5" />)
      )}
    </div>
  );
}

// ============================================================================
// ItemName Component
// ============================================================================

export interface ItemNameProps extends React.ComponentProps<"span"> {}

function ItemName({ className, ...props }: ItemNameProps) {
  const file = useFileUploadItem();

  return (
    <span
      data-slot="file-upload-item-name"
      className={cn(
        "text-ppx-sm text-ppx-neutral-14 truncate font-medium",
        className,
      )}
      {...props}
    >
      {file.file.name}
    </span>
  );
}

// ============================================================================
// ItemSize Component
// ============================================================================

export interface ItemSizeProps extends React.ComponentProps<"span"> {}

function ItemSize({ className, ...props }: ItemSizeProps) {
  const file = useFileUploadItem();

  return (
    <span
      data-slot="file-upload-item-size"
      className={cn("text-ppx-xs text-ppx-neutral-10", className)}
      {...props}
    >
      {formatBytes(file.file.size)}
    </span>
  );
}

// ============================================================================
// ItemRemove Component
// ============================================================================

export interface ItemRemoveProps extends React.ComponentProps<typeof Button> {}

function ItemRemove({ className, children, ...props }: ItemRemoveProps) {
  const { removeFile } = useFileUploadContext();
  const file = useFileUploadItem();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={() => removeFile(file.id)}
      data-slot="file-upload-item-remove"
      aria-label={`Remove ${file.file.name}`}
      className={cn("ml-auto shrink-0", className)}
      {...props}
    >
      {children ?? <CloseIcon className="size-4" />}
    </Button>
  );
}

// ============================================================================
// ItemProgress Component
// ============================================================================

export interface ItemProgressProps extends React.ComponentProps<"div"> {}

function ItemProgress({ className, ...props }: ItemProgressProps) {
  const file = useFileUploadItem();

  if (file.progress === undefined) return null;

  return (
    <div
      data-slot="file-upload-item-progress"
      className={cn(
        "bg-ppx-neutral-3 h-1.5 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <div
        className="bg-ppx-primary-5 h-full transition-all duration-300"
        style={{ width: `${file.progress}%` }}
      />
    </div>
  );
}

// ============================================================================
// ItemStatus Component
// ============================================================================

export interface ItemStatusProps extends React.ComponentProps<"div"> {
  /** Custom success icon */
  successIcon?: React.ReactNode;
  /** Custom uploading text/element */
  uploadingContent?: React.ReactNode;
  /** Custom error text/element */
  errorContent?: React.ReactNode;
}

function ItemStatus({
  className,
  successIcon,
  uploadingContent,
  errorContent,
  ...props
}: ItemStatusProps) {
  const file = useFileUploadItem();

  if (file.status === "uploading") {
    return (
      <span
        data-slot="file-upload-item-status"
        className={cn("text-ppx-xs text-ppx-neutral-10 shrink-0", className)}
        {...props}
      >
        {uploadingContent ?? `${file.progress ?? 0}%`}
      </span>
    );
  }

  if (file.status === "success") {
    return (
      <span
        data-slot="file-upload-item-status"
        className={cn("text-ppx-green-5 shrink-0", className)}
        {...props}
      >
        {successIcon ?? <CheckIcon className="size-4" />}
      </span>
    );
  }

  if (file.status === "error") {
    return (
      <span
        data-slot="file-upload-item-status"
        className={cn("text-ppx-xs text-ppx-red-5 shrink-0", className)}
        {...props}
      >
        {errorContent ?? "Failed"}
      </span>
    );
  }

  return null;
}

// ============================================================================
// ItemError Component
// ============================================================================

export interface ItemErrorProps extends React.ComponentProps<"span"> {}

function ItemError({ className, ...props }: ItemErrorProps) {
  const file = useFileUploadItem();

  if (!file.error) return null;

  return (
    <span
      data-slot="file-upload-item-error"
      className={cn("text-ppx-xs text-ppx-red-5", className)}
      {...props}
    >
      {file.error}
    </span>
  );
}

// ============================================================================
// ItemRetry Component
// ============================================================================

export interface ItemRetryProps extends React.ComponentProps<typeof Button> {}

function ItemRetry({ className, children, ...props }: ItemRetryProps) {
  const { retryUpload } = useFileUploadContext();
  const file = useFileUploadItem();

  if (file.status !== "error" || !retryUpload) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={() => retryUpload(file.id)}
      data-slot="file-upload-item-retry"
      aria-label={`Retry uploading ${file.file.name}`}
      className={cn("shrink-0", className)}
      {...props}
    >
      {children ?? <RetryIcon className="size-4" />}
    </Button>
  );
}

// ============================================================================
// ClearButton Component
// ============================================================================

export interface ClearButtonProps extends React.ComponentProps<typeof Button> {}

function ClearButton({ children, ...props }: ClearButtonProps) {
  const { clearFiles, files } = useFileUploadContext();

  if (files.length === 0) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={clearFiles}
      data-slot="file-upload-clear"
      {...props}
    >
      {children ?? "Remove all files"}
    </Button>
  );
}

// ============================================================================
// ImageGrid Component
// ============================================================================

export interface ImageGridProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  children?: React.ReactNode | ((files: FileUploadFile[]) => React.ReactNode);
}

function ImageGrid({ className, children, ...props }: ImageGridProps) {
  const { files } = useFileUploadContext();

  if (files.length === 0) return null;

  return (
    <div
      data-slot="file-upload-image-grid"
      className={cn("grid grid-cols-4 gap-2", className)}
      {...props}
    >
      {typeof children === "function" ? children(files) : children}
    </div>
  );
}

// ============================================================================
// ImageGridItem Component
// ============================================================================

export interface ImageGridItemProps extends React.ComponentProps<"div"> {
  file: FileUploadFile;
  /** Show status overlays (uploading/error) */
  showStatusOverlay?: boolean;
}

function ImageGridItem({
  file,
  className,
  showStatusOverlay = true,
  ...props
}: ImageGridItemProps) {
  const { removeFile, retryUpload } = useFileUploadContext();

  return (
    <div
      data-slot="file-upload-image-grid-item"
      data-status={file.status}
      className={cn(
        "rounded-ppx-s group relative aspect-square overflow-hidden",
        file.status === "error" && "ring-ppx-red-5 ring-2",
        className,
      )}
      {...props}
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
      {showStatusOverlay && file.status === "uploading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="text-sm font-medium text-white">{file.progress}%</div>
        </div>
      )}

      {/* Error overlay */}
      {showStatusOverlay && file.status === "error" && retryUpload && (
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
      {showStatusOverlay && file.status === "success" && (
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
}

// ============================================================================
// Exports
// ============================================================================

export const FileUpload = {
  Root,
  Dropzone,
  Trigger,
  ItemList,
  Item,
  ItemPreview,
  ItemName,
  ItemSize,
  ItemRemove,
  ItemProgress,
  ItemStatus,
  ItemError,
  ItemRetry,
  ClearButton,
  ImageGrid,
  ImageGridItem,
};
