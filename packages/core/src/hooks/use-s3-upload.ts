import * as React from "react";
import type { FileUploadFile } from "../components/file-upload";

// ============================================================================
// Types
// ============================================================================

export interface S3UploadedFile {
  id: string;
  name: string;
  title: string;
  path: string;
  format: string;
  fullPath: string;
  size: number;
  file_name?: string;
  type?: string;
}

export interface SignedUrlResponse {
  url: string;
  full_path: string;
  [key: string]: unknown;
}

export interface S3UploadConfig {
  /**
   * Function to get the signed URL for uploading
   * Should return { result, err } where result contains url and full_path
   */
  getSignedUrl: (params: {
    filename: string;
    content_type: string;
    for_resume?: boolean;
  }) => Promise<{ result?: SignedUrlResponse | null; err?: unknown }>;

  /**
   * Function to upload the file to S3
   * Should return { result, err }
   */
  uploadToS3: (
    url: string,
    formData: Record<string, unknown>,
  ) => Promise<{ result?: unknown; err?: unknown }>;

  /**
   * Whether this upload is for a resume (adds for_resume param)
   */
  forResume?: boolean;

  /**
   * Called when a file upload completes successfully
   */
  onUploadComplete?: (file: S3UploadedFile) => void;

  /**
   * Called when a file upload fails
   */
  onUploadError?: (error: unknown, file: File) => void;

  /**
   * Called when all uploads complete
   */
  onAllUploadsComplete?: (files: S3UploadedFile[]) => void;
}

export interface UseS3UploadReturn {
  /**
   * Upload files using signed URLs
   */
  uploadFiles: (files: FileUploadFile[]) => Promise<S3UploadedFile[]>;

  /**
   * Upload a single file
   */
  uploadFile: (file: FileUploadFile) => Promise<S3UploadedFile | null>;

  /**
   * Whether any upload is in progress
   */
  isUploading: boolean;

  /**
   * Currently uploading files with their progress
   */
  uploadingFiles: Map<string, { file: FileUploadFile; progress: number }>;

  /**
   * Successfully uploaded files
   */
  uploadedFiles: S3UploadedFile[];

  /**
   * Failed uploads
   */
  failedFiles: Array<{ file: FileUploadFile; error: unknown }>;

  /**
   * Reset the upload state
   */
  reset: () => void;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Extract path and fullPath from S3 URL
 */
export function getPathFromUrl(inputPath: string): {
  path: string;
  fullPath: string;
} {
  return {
    path: inputPath?.split("?")?.[0] ?? "",
    fullPath: inputPath ?? "",
  };
}

/**
 * Extract file extension/format from MIME type
 */
export function getFormatFromMimeType(mimeType: string): string {
  return mimeType?.split("/")?.[1] ?? "";
}

/**
 * Extract title from filename (without extension)
 */
export function getTitleFromFilename(filename: string): string {
  return filename?.split(".")?.[0] ?? "";
}

// ============================================================================
// Hook
// ============================================================================

export function useS3Upload(config: S3UploadConfig): UseS3UploadReturn {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadingFiles, setUploadingFiles] = React.useState<
    Map<string, { file: FileUploadFile; progress: number }>
  >(new Map());
  const [uploadedFiles, setUploadedFiles] = React.useState<S3UploadedFile[]>(
    [],
  );
  const [failedFiles, setFailedFiles] = React.useState<
    Array<{ file: FileUploadFile; error: unknown }>
  >([]);

  const uploadFile = React.useCallback(
    async (fileUpload: FileUploadFile): Promise<S3UploadedFile | null> => {
      const { file } = fileUpload;

      // Update progress to show upload started
      setUploadingFiles((prev) => {
        const next = new Map(prev);
        next.set(fileUpload.id, { file: fileUpload, progress: 0 });
        return next;
      });

      try {
        // Step 1: Get signed URL
        const signedUrlParams: {
          filename: string;
          content_type: string;
          for_resume?: boolean;
        } = {
          filename: file.name,
          content_type: file.type,
        };

        if (config.forResume) {
          signedUrlParams.for_resume = true;
        }

        const { result: signedUrlResult, err: signedUrlErr } =
          await config.getSignedUrl(signedUrlParams);

        if (signedUrlErr || !signedUrlResult) {
          throw signedUrlErr || new Error("Failed to get signed URL");
        }

        // Update progress after getting signed URL
        setUploadingFiles((prev) => {
          const next = new Map(prev);
          next.set(fileUpload.id, { file: fileUpload, progress: 30 });
          return next;
        });

        // Step 2: Upload to S3
        const { url, full_path: fullPath, ...uploadData } = signedUrlResult;

        const formData: Record<string, unknown> = {
          ...uploadData,
          file,
        };

        // Update progress before upload
        setUploadingFiles((prev) => {
          const next = new Map(prev);
          next.set(fileUpload.id, { file: fileUpload, progress: 50 });
          return next;
        });

        const { result: uploadResult, err: uploadErr } =
          await config.uploadToS3(url, formData);

        if (uploadErr) {
          throw uploadErr;
        }

        // Update progress to complete
        setUploadingFiles((prev) => {
          const next = new Map(prev);
          next.set(fileUpload.id, { file: fileUpload, progress: 100 });
          return next;
        });

        // Create the uploaded file object
        const uploadedFile: S3UploadedFile = {
          id: fileUpload.id,
          name: file.name,
          title: getTitleFromFilename(file.name),
          format: getFormatFromMimeType(file.type),
          size: file.size,
          type: file.type,
          ...getPathFromUrl(fullPath),
        };

        setUploadedFiles((prev) => [...prev, uploadedFile]);
        config.onUploadComplete?.(uploadedFile);

        // Remove from uploading files after a brief delay
        setTimeout(() => {
          setUploadingFiles((prev) => {
            const next = new Map(prev);
            next.delete(fileUpload.id);
            return next;
          });
        }, 500);

        return uploadedFile;
      } catch (error) {
        setFailedFiles((prev) => [...prev, { file: fileUpload, error }]);
        config.onUploadError?.(error, file);

        // Remove from uploading files
        setUploadingFiles((prev) => {
          const next = new Map(prev);
          next.delete(fileUpload.id);
          return next;
        });

        return null;
      }
    },
    [config],
  );

  const uploadFiles = React.useCallback(
    async (files: FileUploadFile[]): Promise<S3UploadedFile[]> => {
      if (files.length === 0) return [];

      setIsUploading(true);
      const results: S3UploadedFile[] = [];

      // Upload files sequentially to avoid overwhelming the server
      for (const file of files) {
        const result = await uploadFile(file);
        if (result) {
          results.push(result);
        }
      }

      setIsUploading(false);
      config.onAllUploadsComplete?.(results);

      return results;
    },
    [uploadFile, config],
  );

  const reset = React.useCallback(() => {
    setIsUploading(false);
    setUploadingFiles(new Map());
    setUploadedFiles([]);
    setFailedFiles([]);
  }, []);

  return {
    uploadFiles,
    uploadFile,
    isUploading,
    uploadingFiles,
    uploadedFiles,
    failedFiles,
    reset,
  };
}

// ============================================================================
// Parallel Upload Hook (for multiple files at once)
// ============================================================================

export interface UseS3ParallelUploadConfig extends S3UploadConfig {
  /**
   * Maximum number of concurrent uploads
   * @default 3
   */
  maxConcurrent?: number;
}

export function useS3ParallelUpload(
  config: UseS3ParallelUploadConfig,
): UseS3UploadReturn {
  const { maxConcurrent = 3, ...baseConfig } = config;
  const baseHook = useS3Upload(baseConfig);

  const uploadFiles = React.useCallback(
    async (files: FileUploadFile[]): Promise<S3UploadedFile[]> => {
      if (files.length === 0) return [];

      const results: S3UploadedFile[] = [];
      const chunks: FileUploadFile[][] = [];

      // Split files into chunks for parallel processing
      for (let i = 0; i < files.length; i += maxConcurrent) {
        chunks.push(files.slice(i, i + maxConcurrent));
      }

      // Process chunks sequentially, but files within each chunk in parallel
      for (const chunk of chunks) {
        const chunkResults = await Promise.all(
          chunk.map((file) => baseHook.uploadFile(file)),
        );
        results.push(
          ...chunkResults.filter((r): r is S3UploadedFile => r !== null),
        );
      }

      config.onAllUploadsComplete?.(results);
      return results;
    },
    [baseHook, maxConcurrent, config],
  );

  return {
    ...baseHook,
    uploadFiles,
  };
}

