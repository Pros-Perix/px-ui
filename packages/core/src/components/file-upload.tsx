import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";
import { Button } from "./button";
import UploadCloudIcon from "../icons/upload-cloud-icon";
import CloseIcon from "../icons/close-icon";
import RetryIcon from "../icons/retry-icon";
import SpinnerIcon from "../icons/spinner-icon";
import type {
  FileUploadItem,
  UseFileUploadReturn,
} from "../hooks/use-file-upload";
import { formatBytes } from "../hooks/use-file-upload";
import { getFileTypeIcon } from "../icons/get-file-type-icon";

// ============================================================================
// Context
// ============================================================================

interface FileUploadContextValue {
  upload: UseFileUploadReturn;
  accept?: string;
  multiple: boolean;
  disabled: boolean;
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
  /** The upload hook return value */
  upload: UseFileUploadReturn;
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
  upload,
  accept,
  multiple = false,
  disabled = false,
  className,
}: RootProps) {
  const contextValue: FileUploadContextValue = {
    upload,
    accept,
    multiple,
    disabled,
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

/** State passed to the render prop */
export interface DropzoneState {
  /** Whether files are being dragged over the dropzone */
  isDragging: boolean;
  /** Whether files are currently uploading */
  isUploading: boolean;
  /** Whether the dropzone is disabled */
  disabled: boolean;
  /** Current files in the upload */
  files: FileUploadItem[];
}

/** Props passed to the render prop element */
export interface DropzoneRenderProps {
  onDragEnter: React.DragEventHandler;
  onDragLeave: React.DragEventHandler;
  onDragOver: React.DragEventHandler;
  onDrop: React.DragEventHandler;
  onPaste: React.ClipboardEventHandler;
  onKeyDown: React.KeyboardEventHandler;
  onClick: React.MouseEventHandler;
  tabIndex: number;
  role: string;
  "aria-disabled": boolean;
  "data-dragging": boolean;
}

export interface DropzoneProps
  extends Omit<React.ComponentProps<"div">, "children">,
    Omit<VariantProps<typeof dropzoneVariants>, "isDragActive"> {
  /** Custom text for the dropzone */
  dropzoneText?: string;
  /** Custom text for the browse button */
  browseText?: string;
  /**
   * Render prop for complete customization.
   * When provided, replaces the default dropzone element.
   * Receives props to spread and state for conditional styling.
   */
  render?: (
    props: DropzoneRenderProps,
    state: DropzoneState,
  ) => React.ReactElement;
}

function Dropzone({
  className,
  size,
  dropzoneText = "Paste Or Drag & Drop Files Here",
  browseText = "Browse for files",
  render,
  ...props
}: DropzoneProps) {
  const { upload, accept, multiple, disabled } = useFileUploadContext();
  const {
    isDragging,
    isUploading,
    files,
    openFileDialog,
    getInputProps,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    addFiles,
  } = upload;

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
      const pastedFiles = e.clipboardData.files;
      if (pastedFiles.length > 0) {
        e.preventDefault();
        const filesArray = Array.from(pastedFiles);
        addFiles(filesArray);
        setAnnouncement(
          `${filesArray.length} file${filesArray.length > 1 ? "s" : ""} pasted`,
        );
      }
    },
    [disabled, addFiles],
  );

  const handleClick = React.useCallback(() => {
    if (disabled || isUploading) return;
    openFileDialog();
  }, [disabled, isUploading, openFileDialog]);

  // State passed to render prop
  const state: DropzoneState = {
    isDragging,
    isUploading,
    disabled,
    files,
  };

  // Props passed to render prop (to be spread on custom element)
  const renderProps: DropzoneRenderProps = {
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
    onPaste: handlePaste,
    onKeyDown: handleKeyDown,
    onClick: handleClick,
    tabIndex: disabled ? -1 : 0,
    role: "button",
    "aria-disabled": disabled,
    "data-dragging": isDragging,
  };

  // Hidden input element (always rendered)
  const hiddenInput = (
    <input
      {...inputProps}
      className="sr-only"
      accept={accept}
      multiple={multiple}
      disabled={disabled}
      tabIndex={-1}
      aria-hidden="true"
    />
  );

  // Screen reader elements
  const srElements = (
    <>
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
    </>
  );

  // If render prop is provided, use it for full customization
  if (render) {
    return (
      <div data-slot="file-upload-dropzone">
        {hiddenInput}
        {srElements}
        {render(renderProps, state)}
      </div>
    );
  }

  // Default rendering
  return (
    <div
      data-slot="file-upload-dropzone"
      className={cn(
        dropzoneVariants({ size, isDragActive: isDragging }),
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
      {...renderProps}
      aria-describedby={`${descriptionId} ${instructionsId}`}
      aria-label="File upload dropzone"
      {...props}
    >
      {srElements}
      {hiddenInput}

      <div className="text-ppx-neutral-10 flex items-center gap-3">
        <UploadCloudIcon size={40} aria-hidden="true" />
        <span className="text-ppx-base text-ppx-neutral-13 font-medium">
          {dropzoneText}
        </span>
      </div>

      <div className="flex w-full items-center gap-3" aria-hidden="true">
        <div className="bg-ppx-neutral-5 h-px flex-1" />
        <span className="text-ppx-sm text-ppx-neutral-10 font-medium">OR</span>
        <div className="bg-ppx-neutral-5 h-px flex-1" />
      </div>

      <Button
        type="button"
        variant="default"
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
    </div>
  );
}

// ============================================================================
// HiddenInput Component
// ============================================================================

export interface HiddenInputProps
  extends Omit<React.ComponentProps<"input">, "type"> {}

function HiddenInput({ className, ...props }: HiddenInputProps) {
  const { upload, accept, multiple, disabled } = useFileUploadContext();
  const inputProps = upload.getInputProps();

  return (
    <input
      {...inputProps}
      {...props}
      className={cn("sr-only", className)}
      accept={accept}
      multiple={multiple}
      disabled={disabled}
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}

// ============================================================================
// List Component
// ============================================================================

export interface ListProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  children?: React.ReactNode | ((files: FileUploadItem[]) => React.ReactNode);
}

function List({ className, children, ...props }: ListProps) {
  const { upload } = useFileUploadContext();
  const { files } = upload;

  if (files.length === 0) return null;

  return (
    <div
      data-slot="file-upload-list"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {typeof children === "function" ? children(files) : children}
    </div>
  );
}

// ============================================================================
// ListItem Component (Consolidated)
// ============================================================================

export interface ListItemProps extends React.ComponentProps<"div"> {
  file: FileUploadItem;
  /** Show file type icon (default: true) */
  showIcon?: boolean;
  /** Show progress bar when uploading (default: true) */
  showProgress?: boolean;
  /** Show error message when error (default: true) */
  showError?: boolean;
  /** Show remove button (default: true) */
  showRemove?: boolean;
  /** Show retry button when error (default: true) */
  showRetry?: boolean;
  /** Custom icon component */
  icon?: React.ReactNode;
}

function ListItem({
  file,
  className,
  showIcon = true,
  showProgress = true,
  showError = true,
  showRemove = true,
  showRetry = true,
  icon,
  ...props
}: ListItemProps) {
  const { upload, disabled } = useFileUploadContext();
  const { removeFile, retryUpload } = upload;

  const isUploading = file.status === "uploading";
  const isError = file.status === "error";

  // Get the appropriate icon
  const FileTypeIcon = getFileTypeIcon({
    name: file.file.name,
    type: file.file.type,
  });

  return (
    <div
      data-slot="file-upload-list-item"
      data-status={file.status}
      className={cn(
        "rounded-ppx-s border-ppx-neutral-4 bg-ppx-neutral-1 flex items-center gap-3 border p-3",
        isError && "border-ppx-red-4 bg-ppx-red-1",
        className,
      )}
      {...props}
    >
      {/* Icon/Preview */}
      {showIcon && (
        <div className="rounded-ppx-xs bg-ppx-neutral-3 flex size-10 shrink-0 items-center justify-center overflow-hidden">
          {file.preview ? (
            <img
              src={file.preview}
              alt={file.file.name}
              className="size-full object-cover"
            />
          ) : icon ? (
            icon
          ) : (
            <FileTypeIcon className="size-5" />
          )}
        </div>
      )}

      {/* File info */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-ppx-sm text-ppx-neutral-14 truncate font-medium">
          {file.file.name}
        </span>

        <div className="flex items-center gap-2">
          {/* Progress bar */}
          {showProgress && isUploading && (
            <div className="bg-ppx-neutral-3 h-1.5 flex-1 overflow-hidden rounded-full">
              <div
                className="bg-ppx-primary-5 h-full transition-all duration-300"
                style={{ width: `${file.progress}%` }}
              />
            </div>
          )}

          {/* Progress percentage */}
          {isUploading && (
            <span className="text-ppx-xs text-ppx-neutral-10 shrink-0">
              {file.progress}%
            </span>
          )}
        </div>

        {/* Error message */}
        {showError && isError && file.error && (
          <span className="text-ppx-xs text-ppx-red-5">{file.error}</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1">
        {/* Retry button */}
        {showRetry && isError && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => retryUpload(file.id)}
            disabled={disabled}
            aria-label={`Retry uploading ${file.file.name}`}
          >
            <RetryIcon className="size-4" />
          </Button>
        )}

        {/* Remove button */}
        {showRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => removeFile(file.id)}
            disabled={disabled}
            aria-label={`Remove ${file.file.name}`}
          >
            <CloseIcon className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// ClearAll Component
// ============================================================================

export interface ClearAllProps extends React.ComponentProps<typeof Button> {}

function ClearAll({ children, ...props }: ClearAllProps) {
  const { upload, disabled } = useFileUploadContext();
  const { clearFiles, files } = upload;

  if (files.length === 0) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={clearFiles}
      disabled={disabled}
      data-slot="file-upload-clear-all"
      {...props}
    >
      {children ?? "Remove all files"}
    </Button>
  );
}

// ============================================================================
// Exports
// ============================================================================

export const FileUpload = {
  Root,
  Dropzone,
  HiddenInput,
  List,
  ListItem,
  ClearAll,
};
