import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";
import { Button } from "./button";
import UploadCloudIcon from "../icons/upload-cloud-icon";

const fileUploadVariants = cva(
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

export interface FileUploadProps
  extends Omit<React.ComponentProps<"div">, "onDrop" | "onChange" | "onError">,
    Omit<VariantProps<typeof fileUploadVariants>, "isDragActive"> {
  /** Called when files are selected or dropped */
  onFilesSelect?: (files: File[]) => void;
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
  /** Custom text for the dropzone */
  dropzoneText?: string;
  /** Custom text for the browse button */
  browseText?: string;
  /** Called when file validation fails */
  onError?: (error: FileUploadError) => void;
}

export interface FileUploadError {
  type: "file-too-large" | "too-many-files" | "invalid-type";
  message: string;
  files?: File[];
}

function FileUpload({
  className,
  size,
  onFilesSelect,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  disabled = false,
  dropzoneText = "Paste Or Drag & Drop Files Here",
  browseText = "Browse for files",
  onError,
  ...props
}: FileUploadProps) {
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [announcement, setAnnouncement] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const descriptionId = React.useId();
  const instructionsId = React.useId();

  const validateFiles = React.useCallback(
    (files: File[]): File[] => {
      let validFiles = [...files];

      // Check max files
      if (maxFiles && validFiles.length > maxFiles) {
        const errorMsg = `Maximum ${maxFiles} file(s) allowed`;
        onError?.({
          type: "too-many-files",
          message: errorMsg,
          files: validFiles.slice(maxFiles),
        });
        setAnnouncement(`Error: ${errorMsg}`);
        validFiles = validFiles.slice(0, maxFiles);
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
          setAnnouncement(`Error: ${errorMsg}`);
          validFiles = validFiles.filter((file) => file.size <= maxSize);
        }
      }

      // Check file type (if accept is specified)
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
          setAnnouncement(`Error: ${errorMsg}`);
          validFiles = validFiles.filter(
            (file) => !invalidFiles.includes(file),
          );
        }
      }

      return validFiles;
    },
    [accept, maxFiles, maxSize, onError],
  );

  const handleFiles = React.useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      const validFiles = validateFiles(fileArray);

      if (validFiles.length > 0) {
        onFilesSelect?.(validFiles);
        // Announce to screen readers
        const fileNames = validFiles.map((f) => f.name).join(", ");
        setAnnouncement(
          `${validFiles.length} file${validFiles.length > 1 ? "s" : ""} selected: ${fileNames}`,
        );
      }
    },
    [onFilesSelect, validateFiles],
  );

  const handleDragEnter = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragActive(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragActive(true);
      }
    },
    [disabled],
  );

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (disabled) return;

      handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles],
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
      // Reset input value to allow selecting the same file again
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [handleFiles],
  );

  const handleBrowseClick = React.useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleBrowseClick();
      }
    },
    [handleBrowseClick],
  );

  // Build accessible description
  const getAccessibleDescription = () => {
    const parts = [dropzoneText];
    if (accept) parts.push(`Accepted formats: ${accept}`);
    if (maxSize) parts.push(`Maximum size: ${formatFileSize(maxSize)}`);
    if (maxFiles) parts.push(`Maximum files: ${maxFiles}`);
    if (multiple) parts.push("Multiple files allowed");
    return parts.join(". ");
  };

  return (
    <div
      data-slot="file-upload"
      className={cn(
        fileUploadVariants({ size, isDragActive }),
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

      {/* Hidden description for screen readers */}
      <div id={descriptionId} className="sr-only">
        {getAccessibleDescription()}
      </div>
      <div id={instructionsId} className="sr-only">
        Press Enter or Space to browse files, or drag and drop files here. You
        can also paste files from clipboard.
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
        onClick={handleBrowseClick}
        disabled={disabled}
      >
        {browseText}
      </Button>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export { FileUpload, formatFileSize };
