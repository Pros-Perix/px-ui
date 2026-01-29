import {
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

export type FileMetadata = {
  name: string;
  size: number;
  type: string;
  url: string;
  id: string;
};

export type UploadStatus = "idle" | "uploading" | "complete" | "error";

export type FileUploadItem = {
  file: File | FileMetadata;
  id: string;
  preview?: string;
  progress: number;
  status: UploadStatus;
  error?: string;
  uploadedUrl?: string;
};

export type PresignedUrlResponse = {
  /** The S3 bucket URL to POST to */
  url: string;
  /** The full accessible path after upload (may include signed query params) */
  full_path: string;
  /** The S3 object key (e.g., "uuid/filename.pdf") */
  key?: string;
  /** Access control level */
  acl?: string;
  /** Expected response status from S3 */
  success_action_status?: string;
  /** Content-Type for the upload */
  "Content-Type"?: string;
  /** Base64-encoded policy document */
  policy?: string;
  /** AWS credential string */
  "x-amz-credential"?: string;
  /** AWS signing algorithm */
  "x-amz-algorithm"?: string;
  /** AWS request date */
  "x-amz-date"?: string;
  /** AWS request signature */
  "x-amz-signature"?: string;
  /** Additional fields */
  [key: string]: unknown;
};

export type UploadConfig = {
  /**
   * Function to get a presigned URL for uploading
   */
  getPresignedUrl: (params: {
    filename: string;
    contentType: string;
    size: number;
    signal?: AbortSignal;
  }) => Promise<{
    result?: PresignedUrlResponse | null;
    error?: unknown;
  }>;

  /**
   * Function to upload the file to the storage
   */
  uploadFile: (
    url: string,
    file: File,
    presignedData: PresignedUrlResponse,
    onProgress?: (progress: number) => void,
    signal?: AbortSignal,
  ) => Promise<{
    result?: { url: string; [key: string]: unknown };
    error?: unknown;
  }>;

  /**
   * Whether to auto-upload files when they are added
   * @default true
   */
  autoUpload?: boolean;

  /**
   * Called when a single file upload completes
   */
  onUploadComplete?: (file: FileUploadItem) => void;

  /**
   * Called when a single file upload fails
   */
  onUploadError?: (file: FileUploadItem, error: unknown) => void;

  /**
   * Called when all files finish uploading
   */
  onAllUploadsComplete?: (files: FileUploadItem[]) => void;
};

export type UseFileUploadOptions = {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  multiple?: boolean;
  initialFiles?: FileMetadata[];
  onFilesChange?: (files: FileUploadItem[]) => void;
  onFileAdd?: (addedFile: FileUploadItem) => void;
  onFileRemove?: (removedFile: FileUploadItem) => void;
  upload?: UploadConfig;
};

export type UseFileUploadReturn = {
  // State
  files: FileUploadItem[];
  isDragging: boolean;
  isUploading: boolean;
  errors: string[];

  // Core Actions
  addFiles: (files: FileList | File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  clearErrors: () => void;

  // Form integration
  reset: (newFiles?: FileMetadata[]) => void;
  setFiles: (
    files: FileUploadItem[] | ((prev: FileUploadItem[]) => FileUploadItem[]),
  ) => void;
  instanceKey: number;

  // Upload Actions
  uploadFiles: (files?: FileUploadItem[]) => Promise<FileUploadItem[]>;
  retryUpload: (id: string) => Promise<void>;
  cancelUpload: (id: string) => void;

  // Drag/Drop + Input
  handleDragEnter: (e: DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLElement>) => void;
  handleDragOver: (e: DragEvent<HTMLElement>) => void;
  handleDrop: (e: DragEvent<HTMLElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  openFileDialog: () => void;
  getInputProps: (
    props?: InputHTMLAttributes<HTMLInputElement>,
  ) => InputHTMLAttributes<HTMLInputElement> & {
    // biome-ignore lint/suspicious/noExplicitAny: intentional for cross-React ref compatibility
    ref: any;
  };
};

// Helper function to format bytes to human-readable format
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Number.parseFloat((bytes / k ** i).toFixed(dm)) + sizes[i];
};

/**
 * Extract error message from various error formats, including S3 XML errors
 */
function extractErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    // Check if it's an S3 XML error in the message
    const xmlMatch = error.message.match(/<Message>(.*?)<\/Message>/);
    if (xmlMatch) {
      return xmlMatch[1];
    }
    return error.message;
  }

  // Handle objects with message property
  if (error && typeof error === "object") {
    // Check for responseText with XML
    if ("responseText" in error && typeof error.responseText === "string") {
      const xmlMatch = error.responseText.match(/<Message>(.*?)<\/Message>/);
      if (xmlMatch) {
        return xmlMatch[1];
      }
    }

    // Check for body with XML
    if ("body" in error && typeof error.body === "string") {
      const xmlMatch = error.body.match(/<Message>(.*?)<\/Message>/);
      if (xmlMatch) {
        return xmlMatch[1];
      }
    }

    // Standard message property
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }

    // Check for error property
    if ("error" in error) {
      return extractErrorMessage(error.error);
    }
  }

  return "Upload failed";
}

// ============================================================================
// Hook
// ============================================================================

export const useFileUpload = (
  options: UseFileUploadOptions = {},
): UseFileUploadReturn => {
  const { upload, ...baseOptions } = options;
  const autoUpload = upload?.autoUpload ?? true;

  const [files, setFilesState] = useState<FileUploadItem[]>(
    (baseOptions.initialFiles ?? []).map((file) => ({
      file,
      id: file.id,
      preview: file.url,
      progress: 100,
      status: "complete" as const,
      uploadedUrl: file.url,
    })),
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [instanceKey, setInstanceKey] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map());

  // Helper to cancel all ongoing uploads
  const cancelAllUploads = useCallback(() => {
    for (const controller of abortControllersRef.current.values()) {
      controller.abort();
    }
    abortControllersRef.current.clear();
  }, []);

  const {
    maxFiles = Number.POSITIVE_INFINITY,
    maxSize = Number.POSITIVE_INFINITY,
    accept = "*",
    multiple = false,
    onFilesChange,
    onFileAdd,
    onFileRemove,
  } = baseOptions;

  const validateFile = useCallback(
    (file: File): string | null => {
      if (file.size > maxSize) {
        return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
      }

      if (accept !== "*") {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const fileType = file.type || "";
        const fileExtension = `.${file.name.split(".").pop()}`;

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return fileExtension.toLowerCase() === type.toLowerCase();
          }
          if (type.endsWith("/*")) {
            const baseType = type.split("/")[0];
            return fileType.startsWith(`${baseType}/`);
          }
          return fileType === type;
        });

        if (!isAccepted) {
          return `File "${file.name}" is not an accepted file type.`;
        }
      }

      return null;
    },
    [accept, maxSize],
  );

  const createPreview = useCallback((file: File): string | undefined => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return undefined;
  }, []);

  const generateUniqueId = useCallback((file: File): string => {
    return `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }, []);

  const uploadSingleFile = useCallback(
    async (fileWithStatus: FileUploadItem): Promise<FileUploadItem> => {
      if (!upload) {
        return {
          ...fileWithStatus,
          status: "error",
          error: "No upload config provided",
        };
      }

      const file = fileWithStatus.file as File;
      if (!(file instanceof File)) {
        // Already uploaded file (FileMetadata)
        return { ...fileWithStatus, status: "complete", progress: 100 };
      }

      const abortController = new AbortController();
      abortControllersRef.current.set(fileWithStatus.id, abortController);

      try {
        // Update status to uploading
        setFilesState((prev) =>
          prev.map((f) =>
            f.id === fileWithStatus.id
              ? { ...f, status: "uploading" as const, progress: 0 }
              : f,
          ),
        );

        // Step 1: Get presigned URL
        const { result: presignedResult, error: presignedError } =
          await upload.getPresignedUrl({
            filename: file.name,
            contentType: file.type,
            size: file.size,
            signal: abortController.signal,
          });

        if (presignedError || !presignedResult) {
          throw presignedError || new Error("Failed to get presigned URL");
        }

        // Update progress after getting presigned URL
        setFilesState((prev) =>
          prev.map((f) =>
            f.id === fileWithStatus.id ? { ...f, progress: 10 } : f,
          ),
        );

        // Step 2: Upload file
        const { result: uploadResult, error: uploadError } =
          await upload.uploadFile(
            presignedResult.url,
            file,
            presignedResult,
            (progress) => {
              // Scale progress from 10-99 (leave room for final 100%)
              const scaledProgress = Math.min(10 + progress * 0.89, 99);
              setFilesState((prev) =>
                prev.map((f) =>
                  f.id === fileWithStatus.id
                    ? { ...f, progress: Math.round(scaledProgress) }
                    : f,
                ),
              );
            },
            abortController.signal,
          );

        if (uploadError) {
          throw uploadError;
        }

        // Ensure progress hits 100% before changing status
        setFilesState((prev) =>
          prev.map((f) =>
            f.id === fileWithStatus.id ? { ...f, progress: 100 } : f,
          ),
        );

        // Small delay to show 100% before marking complete
        await new Promise((resolve) => setTimeout(resolve, 150));

        const uploadedFile: FileUploadItem = {
          ...fileWithStatus,
          status: "complete",
          progress: 100,
          uploadedUrl: uploadResult?.url ?? presignedResult.full_path,
        };

        setFilesState((prev) =>
          prev.map((f) => (f.id === fileWithStatus.id ? uploadedFile : f)),
        );

        upload.onUploadComplete?.(uploadedFile);

        return uploadedFile;
      } catch (error) {
        // Check if the upload was cancelled via AbortController
        const isAborted =
          error instanceof Error &&
          (error.name === "AbortError" || abortController.signal.aborted);

        if (isAborted) {
          // Upload was cancelled - return idle state
          const cancelledFile: FileUploadItem = {
            ...fileWithStatus,
            status: "idle",
            progress: 0,
          };
          return cancelledFile;
        }

        const errorMessage = extractErrorMessage(error);
        const failedFile: FileUploadItem = {
          ...fileWithStatus,
          status: "error",
          error: errorMessage,
        };

        setFilesState((prev) =>
          prev.map((f) => (f.id === fileWithStatus.id ? failedFile : f)),
        );

        upload.onUploadError?.(failedFile, error);

        return failedFile;
      } finally {
        abortControllersRef.current.delete(fileWithStatus.id);
      }
    },
    [upload],
  );

  const uploadFiles = useCallback(
    async (filesToUpload?: FileUploadItem[]): Promise<FileUploadItem[]> => {
      const targetFiles =
        filesToUpload ?? files.filter((f) => f.status === "idle");

      if (targetFiles.length === 0) return [];

      setIsUploading(true);
      const results: FileUploadItem[] = [];

      for (const file of targetFiles) {
        const result = await uploadSingleFile(file);
        results.push(result);
      }

      setIsUploading(false);
      upload?.onAllUploadsComplete?.(results);

      return results;
    },
    [files, uploadSingleFile, upload],
  );

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      if (!newFiles || newFiles.length === 0) return;

      const newFilesArray = Array.from(newFiles);
      const newErrors: string[] = [];

      // Clear existing errors
      setErrors([]);

      // In single file mode, clear existing files first
      if (!multiple) {
        setFilesState((prev) => {
          for (const file of prev) {
            if (file.preview && file.file instanceof File) {
              URL.revokeObjectURL(file.preview);
            }
          }
          return [];
        });
      }

      // Check if adding these files would exceed maxFiles
      if (
        multiple &&
        maxFiles !== Number.POSITIVE_INFINITY &&
        files.length + newFilesArray.length > maxFiles
      ) {
        newErrors.push(`You can only upload a maximum of ${maxFiles} files.`);
        setErrors(newErrors);
        return;
      }

      const validFiles: FileUploadItem[] = [];

      for (const file of newFilesArray) {
        // Check for duplicates in multiple mode
        if (multiple) {
          const isDuplicate = files.some(
            (existingFile) =>
              existingFile.file.name === file.name &&
              existingFile.file.size === file.size,
          );
          if (isDuplicate) continue;
        }

        const error = validateFile(file);
        if (error) {
          newErrors.push(error);
          continue;
        }

        validFiles.push({
          file,
          id: generateUniqueId(file),
          preview: createPreview(file),
          progress: 0,
          status: "idle",
        });
      }

      if (validFiles.length > 0) {
        // Call onFileAdd callback for each file
        if (onFileAdd) {
          for (const file of validFiles) {
            onFileAdd(file);
          }
        }

        setFilesState((prev) => {
          const updatedFiles = !multiple ? validFiles : [...prev, ...validFiles];
          onFilesChange?.(updatedFiles);
          return updatedFiles;
        });

        // Auto-upload if configured
        if (autoUpload && upload) {
          // Use setTimeout to ensure state is updated before uploading
          setTimeout(() => {
            uploadFiles(validFiles);
          }, 0);
        }
      }

      if (newErrors.length > 0) {
        setErrors(newErrors);
      }

      // Reset input value
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [
      files,
      maxFiles,
      multiple,
      validateFile,
      createPreview,
      generateUniqueId,
      onFilesChange,
      onFileAdd,
      autoUpload,
      upload,
      uploadFiles,
    ],
  );

  const removeFile = useCallback(
    (id: string) => {
      // Cancel any ongoing upload
      const controller = abortControllersRef.current.get(id);
      if (controller) {
        controller.abort();
        abortControllersRef.current.delete(id);
      }

      setFilesState((prev) => {
        const fileToRemove = prev.find((file) => file.id === id);
        if (fileToRemove) {
          // Call onFileRemove callback before removing
          onFileRemove?.(fileToRemove);

          if (fileToRemove.preview && fileToRemove.file instanceof File) {
            URL.revokeObjectURL(fileToRemove.preview);
          }
        }

        const newFiles = prev.filter((file) => file.id !== id);
        onFilesChange?.(newFiles);
        return newFiles;
      });
    },
    [onFilesChange, onFileRemove],
  );

  const clearFiles = useCallback(() => {
    cancelAllUploads();

    setFilesState((prev) => {
      for (const file of prev) {
        if (file.preview && file.file instanceof File) {
          URL.revokeObjectURL(file.preview);
        }
      }
      return [];
    });

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setErrors([]);
    onFilesChange?.([]);
  }, [cancelAllUploads, onFilesChange]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const reset = useCallback(
    (newFiles?: FileMetadata[]) => {
      cancelAllUploads();

      // Revoke all previews
      for (const file of files) {
        if (file.preview && file.file instanceof File) {
          URL.revokeObjectURL(file.preview);
        }
      }

      // Reset input
      if (inputRef.current) {
        inputRef.current.value = "";
      }

      // Clear errors
      setErrors([]);

      // Set new files or clear
      const initializedFiles: FileUploadItem[] = (newFiles ?? []).map(
        (file) => ({
          file,
          id: file.id,
          preview: file.url,
          progress: 100,
          status: "complete" as const,
          uploadedUrl: file.url,
        }),
      );

      setFilesState(initializedFiles);
      onFilesChange?.(initializedFiles);

      // Increment instance key to force remount
      setInstanceKey((prev) => prev + 1);
    },
    [cancelAllUploads, files, onFilesChange],
  );

  const setFiles = useCallback(
    (
      newFiles:
        | FileUploadItem[]
        | ((prev: FileUploadItem[]) => FileUploadItem[]),
    ) => {
      setFilesState((prev) => {
        const nextFiles =
          typeof newFiles === "function" ? newFiles(prev) : newFiles;
        onFilesChange?.(nextFiles);
        return nextFiles;
      });
    },
    [onFilesChange],
  );

  const retryUpload = useCallback(
    async (id: string) => {
      const file = files.find((f) => f.id === id);
      if (file && file.status === "error") {
        setFilesState((prev) =>
          prev.map((f) =>
            f.id === id
              ? { ...f, status: "idle" as const, error: undefined }
              : f,
          ),
        );
        await uploadSingleFile({ ...file, status: "idle", error: undefined });
      }
    },
    [files, uploadSingleFile],
  );

  const cancelUpload = useCallback((id: string) => {
    const controller = abortControllersRef.current.get(id);
    if (controller) {
      controller.abort();
      abortControllersRef.current.delete(id);
    }

    setFilesState((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "idle" as const, progress: 0 } : f,
      ),
    );
  }, []);

  const handleDragEnter = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (inputRef.current?.disabled) return;

      if (e.dataTransfer.files?.length > 0) {
        if (!multiple) {
          addFiles([e.dataTransfer.files[0]]);
        } else {
          addFiles(e.dataTransfer.files);
        }
      }
    },
    [addFiles, multiple],
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        addFiles(e.target.files);
      }
    },
    [addFiles],
  );

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const getInputProps = useCallback(
    (props: InputHTMLAttributes<HTMLInputElement> = {}) => ({
      ...props,
      accept: props.accept || accept,
      multiple: props.multiple !== undefined ? props.multiple : multiple,
      onChange: handleFileChange,
      // biome-ignore lint/suspicious/noExplicitAny: intentional
      ref: inputRef as any,
      type: "file" as const,
    }),
    [accept, multiple, handleFileChange],
  );

  return {
    // State
    files,
    isDragging,
    isUploading,
    errors,

    // Core Actions
    addFiles,
    removeFile,
    clearFiles,
    clearErrors,

    // Form integration
    reset,
    setFiles,
    instanceKey,

    // Upload Actions
    uploadFiles,
    retryUpload,
    cancelUpload,

    // Drag/Drop + Input
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    openFileDialog,
    getInputProps,
  };
};

// Legacy type exports for backwards compatibility
export type FileWithPreview = FileUploadItem;
export type FileWithUploadStatus = FileUploadItem;
export type FileUploadOptions = UseFileUploadOptions;
export type FileUploadWithUploaderOptions = UseFileUploadOptions;
