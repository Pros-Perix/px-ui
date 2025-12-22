import {
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from "react";

export type FileMetadata = {
  name: string;
  size: number;
  type: string;
  url: string;
  id: string;
};

export type FileWithPreview = {
  file: File | FileMetadata;
  id: string;
  preview?: string;
};

export type FileUploadOptions = {
  maxFiles?: number; // Only used when multiple is true, defaults to Infinity
  maxSize?: number; // in bytes
  accept?: string;
  multiple?: boolean; // Defaults to false
  initialFiles?: FileMetadata[];
  onFilesChange?: (files: FileWithPreview[]) => void; // Callback when files change
  onFilesAdded?: (addedFiles: FileWithPreview[]) => void; // Callback when new files are added
};

export type FileUploadState = {
  files: FileWithPreview[];
  isDragging: boolean;
  errors: string[];
};

export type FileUploadActions = {
  addFiles: (files: FileList | File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  clearErrors: () => void;
  handleDragEnter: (e: DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLElement>) => void;
  handleDragOver: (e: DragEvent<HTMLElement>) => void;
  handleDrop: (e: DragEvent<HTMLElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  openFileDialog: () => void;
  getInputProps: (
    props?: InputHTMLAttributes<HTMLInputElement>,
  ) => InputHTMLAttributes<HTMLInputElement> & {
    // Use `any` here to avoid cross-React ref type conflicts across packages
    // biome-ignore lint/suspicious/noExplicitAny: intentional
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

// ============================================================================
// Extended Hook with Upload Support
// ============================================================================

export type UploadStatus = "idle" | "uploading" | "success" | "error";

export type FileWithUploadStatus = FileWithPreview & {
  progress: number;
  status: UploadStatus;
  error?: string;
  uploadedUrl?: string;
};

export type PresignedUrlResponse = {
  url: string;
  fullPath: string;
  [key: string]: unknown;
};

export type UploadConfig = {
  /**
   * Function to get a presigned URL for uploading
   * Called before uploading each file
   * @param params - Parameters including filename, contentType, size, and optional AbortSignal
   * @param params.signal - Optional AbortSignal to cancel the request
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
   * Receives the presigned URL and the file
   * @param url - The presigned URL to upload to
   * @param file - The file to upload
   * @param presignedData - The full presigned URL response data
   * @param onProgress - Optional callback for upload progress
   * @param signal - Optional AbortSignal to cancel the upload
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
  onUploadComplete?: (file: FileWithUploadStatus) => void;

  /**
   * Called when a single file upload fails
   */
  onUploadError?: (file: FileWithUploadStatus, error: unknown) => void;

  /**
   * Called when all files finish uploading
   */
  onAllUploadsComplete?: (files: FileWithUploadStatus[]) => void;
};

export type FileUploadWithUploaderOptions = FileUploadOptions & {
  upload?: UploadConfig;
};

export type FileUploadWithUploaderState = Omit<FileUploadState, "files"> & {
  files: FileWithUploadStatus[];
  isUploading: boolean;
};

export type FileUploadWithUploaderActions = Omit<
  FileUploadActions,
  "addFiles"
> & {
  addFiles: (files: FileList | File[]) => void;
  uploadFiles: (
    files?: FileWithUploadStatus[],
  ) => Promise<FileWithUploadStatus[]>;
  retryUpload: (id: string) => Promise<void>;
  cancelUpload: (id: string) => void;
};

export const useFileUpload = (
  options: FileUploadWithUploaderOptions = {},
): [FileUploadWithUploaderState, FileUploadWithUploaderActions] => {
  const { upload, ...baseOptions } = options;
  const autoUpload = upload?.autoUpload ?? true;

  const [files, setFiles] = useState<FileWithUploadStatus[]>(
    (baseOptions.initialFiles ?? []).map((file) => ({
      file,
      id: file.id,
      preview: file.url,
      progress: 100,
      status: "success" as const,
      uploadedUrl: file.url,
    })),
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map());

  const {
    maxFiles = Number.POSITIVE_INFINITY,
    maxSize = Number.POSITIVE_INFINITY,
    accept = "*",
    multiple = false,
    onFilesChange,
    onFilesAdded,
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
    async (
      fileWithStatus: FileWithUploadStatus,
    ): Promise<FileWithUploadStatus> => {
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
        return { ...fileWithStatus, status: "success", progress: 100 };
      }

      const abortController = new AbortController();
      abortControllersRef.current.set(fileWithStatus.id, abortController);

      try {
        // Update status to uploading
        setFiles((prev) =>
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
        setFiles((prev) =>
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
              // Scale progress from 10-100
              const scaledProgress = 10 + progress * 0.9;
              setFiles((prev) =>
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

        const uploadedFile: FileWithUploadStatus = {
          ...fileWithStatus,
          status: "success",
          progress: 100,
          uploadedUrl: uploadResult?.url ?? presignedResult.fullPath,
        };

        setFiles((prev) =>
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
          // Upload was cancelled - return idle state (already set by cancelUpload)
          const cancelledFile: FileWithUploadStatus = {
            ...fileWithStatus,
            status: "idle",
            progress: 0,
          };
          return cancelledFile;
        }

        const errorMessage =
          error instanceof Error ? error.message : "Upload failed";
        const failedFile: FileWithUploadStatus = {
          ...fileWithStatus,
          status: "error",
          error: errorMessage,
        };

        setFiles((prev) =>
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
    async (
      filesToUpload?: FileWithUploadStatus[],
    ): Promise<FileWithUploadStatus[]> => {
      const targetFiles =
        filesToUpload ?? files.filter((f) => f.status === "idle");

      if (targetFiles.length === 0) return [];

      setIsUploading(true);
      const results: FileWithUploadStatus[] = [];

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
        setFiles((prev) => {
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

      const validFiles: FileWithUploadStatus[] = [];

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
        // Call onFilesAdded callback
        onFilesAdded?.(validFiles);

        setFiles((prev) => {
          const updatedFiles = !multiple
            ? validFiles
            : [...prev, ...validFiles];
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
      onFilesAdded,
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

      setFiles((prev) => {
        const fileToRemove = prev.find((file) => file.id === id);
        if (fileToRemove?.preview && fileToRemove.file instanceof File) {
          URL.revokeObjectURL(fileToRemove.preview);
        }

        const newFiles = prev.filter((file) => file.id !== id);
        onFilesChange?.(newFiles);
        return newFiles;
      });
    },
    [onFilesChange],
  );

  const clearFiles = useCallback(() => {
    // Cancel all ongoing uploads
    for (const controller of abortControllersRef.current.values()) {
      controller.abort();
    }
    abortControllersRef.current.clear();

    setFiles((prev) => {
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
  }, [onFilesChange]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const retryUpload = useCallback(
    async (id: string) => {
      const file = files.find((f) => f.id === id);
      if (file && file.status === "error") {
        setFiles((prev) =>
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

    setFiles((prev) =>
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

  return [
    { files, isDragging, errors, isUploading },
    {
      addFiles,
      removeFile,
      clearFiles,
      clearErrors,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleFileChange,
      openFileDialog,
      getInputProps,
      uploadFiles,
      retryUpload,
      cancelUpload,
    },
  ];
};
