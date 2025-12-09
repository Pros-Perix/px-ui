import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";
import { Button } from "./button";
import UploadCloudIcon from "../icons/upload-cloud-icon";
import CloseIcon from "../icons/close-icon";

// ============================================================================
// Context
// ============================================================================

export interface FileUploadFile {
  id: string;
  file: File;
  progress?: number;
  status?: "idle" | "uploading" | "success" | "error";
  preview?: string;
}

interface FileUploadContextValue {
  files: FileUploadFile[];
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  updateFile: (id: string, updates: Partial<FileUploadFile>) => void;
  accept?: string;
  multiple: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled: boolean;
  isDragActive: boolean;
  setIsDragActive: (active: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  openFilePicker: () => void;
  onError?: (error: FileUploadError) => void;
}

const FileUploadContext = React.createContext<FileUploadContextValue | null>(
  null,
);

function useFileUpload() {
  const context = React.useContext(FileUploadContext);
  if (!context) {
    throw new Error(
      "FileUpload components must be used within FileUpload.Root",
    );
  }
  return context;
}

// ============================================================================
// Types
// ============================================================================

export interface FileUploadError {
  type: "file-too-large" | "too-many-files" | "invalid-type";
  message: string;
  files?: File[];
}

// ============================================================================
// Root Component
// ============================================================================

export interface RootProps {
  children: React.ReactNode;
  /** Controlled files state */
  value?: FileUploadFile[];
  /** Default files for uncontrolled mode */
  defaultValue?: FileUploadFile[];
  /** Called when files change */
  onValueChange?: (files: FileUploadFile[]) => void;
  /** Accepted file types (e.g., "image/*,.pdf") */
  accept?: string;
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Whether the upload is disabled */
  disabled?: boolean;
  /** Called when file validation fails */
  onError?: (error: FileUploadError) => void;
  className?: string;
}

function Root({
  children,
  value,
  defaultValue = [],
  onValueChange,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  disabled = false,
  onError,
  className,
}: RootProps) {
  const [internalFiles, setInternalFiles] =
    React.useState<FileUploadFile[]>(defaultValue);
  const [isDragActive, setIsDragActive] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isControlled = value !== undefined;
  const files = isControlled ? value : internalFiles;

  const setFiles = React.useCallback(
    (
      newFiles:
        | FileUploadFile[]
        | ((prev: FileUploadFile[]) => FileUploadFile[]),
    ) => {
      const resolvedFiles =
        typeof newFiles === "function" ? newFiles(files) : newFiles;

      if (!isControlled) {
        setInternalFiles(resolvedFiles);
      }
      onValueChange?.(resolvedFiles);
    },
    [files, isControlled, onValueChange],
  );

  const validateFiles = React.useCallback(
    (filesToValidate: File[]): File[] => {
      let validFiles = [...filesToValidate];

      // Check max files
      if (maxFiles) {
        const totalFiles = files.length + validFiles.length;
        if (totalFiles > maxFiles) {
          const allowedCount = Math.max(0, maxFiles - files.length);
          const errorMsg = `Maximum ${maxFiles} file(s) allowed`;
          onError?.({
            type: "too-many-files",
            message: errorMsg,
            files: validFiles.slice(allowedCount),
          });
          validFiles = validFiles.slice(0, allowedCount);
        }
      }

      // Check file size
      if (maxSize) {
        const oversizedFiles = validFiles.filter((file) => file.size > maxSize);
        if (oversizedFiles.length > 0) {
          const errorMsg = `File(s) exceed maximum size of ${formatFileSize(maxSize)}`;
          onError?.({
            type: "file-too-large",
            message: errorMsg,
            files: oversizedFiles,
          });
          validFiles = validFiles.filter((file) => file.size <= maxSize);
        }
      }

      // Check file type
      if (accept) {
        const acceptedTypes = accept.split(",").map((t) => t.trim());
        const invalidFiles = validFiles.filter((file) => {
          return !acceptedTypes.some((type) => {
            if (type.startsWith(".")) {
              return file.name.toLowerCase().endsWith(type.toLowerCase());
            }
            if (type.endsWith("/*")) {
              const baseType = type.replace("/*", "");
              return file.type.startsWith(baseType);
            }
            return file.type === type;
          });
        });

        if (invalidFiles.length > 0) {
          const errorMsg = `Invalid file type(s). Accepted: ${accept}`;
          onError?.({
            type: "invalid-type",
            message: errorMsg,
            files: invalidFiles,
          });
          validFiles = validFiles.filter(
            (file) => !invalidFiles.includes(file),
          );
        }
      }

      return validFiles;
    },
    [accept, files.length, maxFiles, maxSize, onError],
  );

  const addFiles = React.useCallback(
    (newFiles: File[]) => {
      const validFiles = validateFiles(newFiles);

      if (validFiles.length > 0) {
        const fileUploadFiles: FileUploadFile[] = validFiles.map((file) => ({
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          file,
          status: "idle" as const,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        }));

        if (multiple) {
          setFiles((prev) => [...prev, ...fileUploadFiles]);
        } else {
          // Single file mode - replace existing
          setFiles(fileUploadFiles.slice(0, 1));
        }
      }
    },
    [multiple, setFiles, validateFiles],
  );

  const removeFile = React.useCallback(
    (id: string) => {
      setFiles((prev) => {
        const file = prev.find((f) => f.id === id);
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
        }
        return prev.filter((f) => f.id !== id);
      });
    },
    [setFiles],
  );

  const clearFiles = React.useCallback(() => {
    files.forEach((f) => {
      if (f.preview) {
        URL.revokeObjectURL(f.preview);
      }
    });
    setFiles([]);
  }, [files, setFiles]);

  const updateFile = React.useCallback(
    (id: string, updates: Partial<FileUploadFile>) => {
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, ...updates } : f)),
      );
    },
    [setFiles],
  );

  const openFilePicker = React.useCallback(() => {
    if (!disabled) {
      inputRef.current?.click();
    }
  }, [disabled]);

  // Cleanup previews on unmount
  React.useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.preview) {
          URL.revokeObjectURL(f.preview);
        }
      });
    };
  }, []);

  const contextValue: FileUploadContextValue = {
    files,
    addFiles,
    removeFile,
    clearFiles,
    updateFile,
    accept,
    multiple,
    maxSize,
    maxFiles,
    disabled,
    isDragActive,
    setIsDragActive,
    inputRef,
    openFilePicker,
    onError,
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
    addFiles,
    accept,
    multiple,
    disabled,
    isDragActive,
    setIsDragActive,
    inputRef,
    openFilePicker,
  } = useFileUpload();

  const descriptionId = React.useId();
  const instructionsId = React.useId();
  const [announcement, setAnnouncement] = React.useState("");

  const handleFiles = React.useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const filesArray = Array.from(fileList);
      addFiles(filesArray);
      setAnnouncement(
        `${filesArray.length} file${filesArray.length > 1 ? "s" : ""} selected`,
      );
    },
    [addFiles],
  );

  const handleDragEnter = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragActive(true);
    },
    [disabled, setIsDragActive],
  );

  const handleDragLeave = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    },
    [setIsDragActive],
  );

  const handleDragOver = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragActive(true);
    },
    [disabled, setIsDragActive],
  );

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      if (!disabled) handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles, setIsDragActive],
  );

  const handlePaste = React.useCallback(
    (e: React.ClipboardEvent) => {
      if (disabled) return;
      const files = e.clipboardData.files;
      if (files.length > 0) {
        e.preventDefault();
        handleFiles(files);
      }
    },
    [disabled, handleFiles],
  );

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      if (inputRef.current) inputRef.current.value = "";
    },
    [handleFiles, inputRef],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openFilePicker();
      }
    },
    [openFilePicker],
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
        ref={inputRef}
        type="file"
        className="sr-only"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
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
            onClick={openFilePicker}
            disabled={disabled}
          >
            {browseText}
          </Button>
        </>
      ) : null}
    </div>
  );
}

// ============================================================================
// Trigger Component (standalone button)
// ============================================================================

export interface TriggerProps extends React.ComponentProps<typeof Button> {}

function Trigger({ children, ...props }: TriggerProps) {
  const { openFilePicker, disabled } = useFileUpload();

  return (
    <Button
      type="button"
      onClick={openFilePicker}
      disabled={disabled}
      data-slot="file-upload-trigger"
      {...props}
    >
      {children ?? "Select files"}
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
  const { files } = useFileUpload();

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
}

function Item({ file, className, children, ...props }: ItemProps) {
  return (
    <ItemContext.Provider value={file}>
      <div
        data-slot="file-upload-item"
        className={cn(
          "rounded-ppx-s border-ppx-neutral-4 bg-ppx-neutral-1 flex items-center gap-3 border p-3",
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
      {formatFileSize(file.file.size)}
    </span>
  );
}

// ============================================================================
// ItemRemove Component
// ============================================================================

export interface ItemRemoveProps extends React.ComponentProps<typeof Button> {}

function ItemRemove({ className, children, ...props }: ItemRemoveProps) {
  const { removeFile } = useFileUpload();
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
// ClearButton Component
// ============================================================================

export interface ClearButtonProps extends React.ComponentProps<typeof Button> {}

function ClearButton({ children, ...props }: ClearButtonProps) {
  const { clearFiles, files } = useFileUpload();

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
  const { files } = useFileUpload();

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
}

function ImageGridItem({ file, className, ...props }: ImageGridItemProps) {
  const { removeFile } = useFileUpload();

  return (
    <div
      data-slot="file-upload-image-grid-item"
      className={cn(
        "rounded-ppx-s group relative aspect-square overflow-hidden",
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
// Helper Components
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

// ============================================================================
// Utility Functions
// ============================================================================

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
  ClearButton,
  ImageGrid,
  ImageGridItem,
};

export { formatFileSize, useFileUpload };
