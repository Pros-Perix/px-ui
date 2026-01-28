import * as React from "react";
import {
  FileUpload,
  useFileUpload,
  type FileUploadItem,
  formatBytes,
  getFileTypeIcon,
  Button,
} from "@px-ui/core";
import { FileUploadField } from "@px-ui/forms";

// ============================================================================
// Basic Dropzone
// ============================================================================

export function BasicDropzoneDemo() {
  const upload = useFileUpload({
    onFilesChange: (files) => console.log(files),
  });

  return (
    <FileUpload.Root upload={upload}>
      <FileUpload.Dropzone />
    </FileUpload.Root>
  );
}

// ============================================================================
// Avatar Upload
// ============================================================================

export function AvatarUploadDemo() {
  const upload = useFileUpload({
    accept: "image/*",
    maxSize: 2 * 1024 * 1024,
    multiple: false,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <FileUpload.Root upload={upload} accept="image/*">
        <FileUpload.Dropzone
          hideDefaultContent
          className="size-32 min-h-0 rounded-full p-0 cursor-pointer"
        >
          {upload.files.length > 0 ? (
            <img
              src={upload.files[0].preview}
              alt="Avatar"
              className="size-full rounded-full object-cover"
            />
          ) : (
            <div className="text-ppx-neutral-10 flex flex-col items-center justify-center">
              <UserIcon className="size-10" />
              <span className="mt-1 text-xs">Upload</span>
            </div>
          )}
        </FileUpload.Dropzone>
      </FileUpload.Root>
      <p className="text-ppx-neutral-10 text-xs">
        Click or drag to upload avatar
      </p>
    </div>
  );
}

// ============================================================================
// Multiple Files with List
// ============================================================================

export function MultipleFilesListDemo() {
  const upload = useFileUpload({
    maxSize: 100 * 1024 * 1024,
    maxFiles: 10,
    multiple: true,
  });

  return (
    <div className="w-full max-w-md">
      <FileUpload.Root upload={upload} multiple>
        <FileUpload.Dropzone
          dropzoneText="Drag & drop files here"
          browseText="Browse files"
        />
        {upload.files.length > 0 && (
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-ppx-neutral-14 text-sm font-medium">
                Files ({upload.files.length})
              </span>
              <FileUpload.ClearAll className="text-ppx-red-5 hover:text-ppx-red-6 text-xs">
                Remove all
              </FileUpload.ClearAll>
            </div>
            <FileUpload.List className="max-h-64 overflow-y-auto">
              {(files) =>
                files.map((file) => (
                  <FileUpload.ListItem key={file.id} file={file} />
                ))
              }
            </FileUpload.List>
          </div>
        )}
      </FileUpload.Root>
    </div>
  );
}

// ============================================================================
// Upload with Progress Simulation
// ============================================================================

export function UploadWithProgressDemo() {
  const upload = useFileUpload({
    multiple: true,
    upload: {
      autoUpload: true,
      getPresignedUrl: async ({ filename }) => {
        await new Promise((r) => setTimeout(r, 200));
        return {
          result: {
            url: `https://example.com/upload/${filename}`,
            fullPath: `https://cdn.example.com/${filename}`,
          },
        };
      },
      uploadFile: async (_url, _file, presignedData, onProgress) => {
        for (let i = 0; i <= 100; i += 5) {
          await new Promise((r) => setTimeout(r, 100));
          onProgress?.(i);
        }
        return { result: { url: presignedData.fullPath } };
      },
    },
  });

  return (
    <div className="w-full max-w-md">
      <FileUpload.Root upload={upload} multiple>
        <FileUpload.Dropzone size="sm" />
        {upload.files.length > 0 && (
          <FileUpload.List className="mt-4">
            {(files) =>
              files.map((file) => (
                <FileUpload.ListItem key={file.id} file={file} />
              ))
            }
          </FileUpload.List>
        )}
      </FileUpload.Root>
    </div>
  );
}

// ============================================================================
// Files Table
// ============================================================================

export function FilesTableDemo() {
  const upload = useFileUpload({
    maxFiles: 10,
    multiple: true,
  });

  return (
    <div className="w-full max-w-lg">
      <FileUpload.Root upload={upload} multiple>
        <FileUpload.Dropzone size="sm" />
        {upload.files.length > 0 && (
          <div className="rounded-ppx-s border-ppx-neutral-4 mt-4 overflow-hidden border">
            <div className="bg-ppx-neutral-2 flex items-center justify-between px-4 py-2">
              <span className="text-ppx-neutral-14 text-sm font-medium">
                Files ({upload.files.length})
              </span>
              <FileUpload.ClearAll
                size="sm"
                variant="ghost"
                className="text-ppx-red-5"
              >
                Remove all
              </FileUpload.ClearAll>
            </div>
            <table className="w-full">
              <thead className="border-ppx-neutral-4 bg-ppx-neutral-1 border-b">
                <tr className="text-ppx-neutral-12 text-left text-xs font-medium">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Size</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-ppx-neutral-3 divide-y">
                {upload.files.map((file) => (
                  <tr key={file.id} className="text-sm">
                    <td className="text-ppx-neutral-14 max-w-[200px] truncate px-4 py-2 font-medium">
                      <div className="flex items-center gap-2">
                        {React.createElement(
                          getFileTypeIcon({ name: file.file.name, type: file.file.type }),
                          { className: "size-4 shrink-0" }
                        )}
                        <span className="truncate">{file.file.name}</span>
                      </div>
                    </td>
                    <td className="text-ppx-neutral-10 px-4 py-2">
                      {getFileExtension(file.file.name).toUpperCase()}
                    </td>
                    <td className="text-ppx-neutral-10 px-4 py-2">
                      {formatBytes(file.file.size)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => upload.removeFile(file.id)}
                        className="text-ppx-red-5 hover:text-ppx-red-6"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </FileUpload.Root>
    </div>
  );
}

// ============================================================================
// Dropzone Sizes
// ============================================================================

export function DropzoneSizesDemo() {
  const uploadSmall = useFileUpload({});
  const uploadDefault = useFileUpload({});
  const uploadLarge = useFileUpload({});

  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <p className="text-ppx-neutral-10 mb-2 text-xs font-medium">Small</p>
        <FileUpload.Root upload={uploadSmall}>
          <FileUpload.Dropzone size="sm" />
        </FileUpload.Root>
      </div>
      <div>
        <p className="text-ppx-neutral-10 mb-2 text-xs font-medium">Default</p>
        <FileUpload.Root upload={uploadDefault}>
          <FileUpload.Dropzone size="default" />
        </FileUpload.Root>
      </div>
      <div>
        <p className="text-ppx-neutral-10 mb-2 text-xs font-medium">Large</p>
        <FileUpload.Root upload={uploadLarge}>
          <FileUpload.Dropzone size="lg" />
        </FileUpload.Root>
      </div>
    </div>
  );
}

// ============================================================================
// Form Reset Demo
// ============================================================================

export function FormResetDemo() {
  const [formState, setFormState] = React.useState({
    name: "",
    submitted: false,
  });

  const upload = useFileUpload({
    multiple: true,
    upload: {
      autoUpload: true,
      getPresignedUrl: async ({ filename }) => {
        await new Promise((r) => setTimeout(r, 200));
        return {
          result: {
            url: `https://example.com/upload/${filename}`,
            fullPath: `https://cdn.example.com/${filename}`,
          },
        };
      },
      uploadFile: async (_url, _file, presignedData, onProgress) => {
        for (let i = 0; i <= 100; i += 10) {
          await new Promise((r) => setTimeout(r, 50));
          onProgress?.(i);
        }
        return { result: { url: presignedData.fullPath } };
      },
    },
    onFilesChange: (files) => console.log("Files changed:", files),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", {
      name: formState.name,
      files: upload.files,
    });
    setFormState({ name: "", submitted: true });
  };

  const handleReset = () => {
    setFormState({ name: "", submitted: false });
    upload.reset(); // This clears files and increments instanceKey
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-ppx-neutral-14 mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            value={formState.name}
            onChange={(e) =>
              setFormState((s) => ({ ...s, name: e.target.value }))
            }
            className="rounded-ppx-s border-ppx-neutral-4 w-full border px-3 py-2"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="text-ppx-neutral-14 mb-1 block text-sm font-medium">
            Attachments
          </label>
          <FileUpload.Root
            key={upload.instanceKey}
            upload={upload}
            multiple
          >
            <FileUpload.Dropzone size="sm" />
            {upload.files.length > 0 && (
              <FileUpload.List className="mt-2">
                {(files) =>
                  files.map((file) => (
                    <FileUpload.ListItem key={file.id} file={file} />
                  ))
                }
              </FileUpload.List>
            )}
          </FileUpload.Root>
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={upload.isUploading}>
            Submit
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset Form
          </Button>
        </div>

        {formState.submitted && (
          <p className="text-ppx-green-5 text-sm">
            Form submitted! Click "Reset Form" to clear everything.
          </p>
        )}
      </form>
    </div>
  );
}

// ============================================================================
// Helper Icons
// ============================================================================

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
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
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function getFileExtension(filename: string): string {
  return filename.split(".").pop() || "";
}

// ============================================================================
// FileUploadField Demos
// ============================================================================

// Dummy upload functions (simulated)
const getPresignedUrl = async ({
  filename,
}: {
  filename: string;
  contentType: string;
  size: number;
}) => {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 200));
  return {
    result: {
      url: `https://example.com/upload/${filename}`,
      fullPath: `https://cdn.example.com/${filename}`,
    },
  };
};

const uploadFile = async (
  _url: string,
  _file: File,
  presignedData: { url: string; fullPath: string },
  onProgress?: (progress: number) => void,
) => {
  // Simulate upload with progress
  for (let i = 0; i <= 100; i += 10) {
    await new Promise((r) => setTimeout(r, 100));
    onProgress?.(i);
  }
  return { result: { url: presignedData.fullPath } };
};

export function SimpleUploadDemo() {
  return (
    <div className="w-full max-w-md">
      <FileUploadField
        accept="image/*,.pdf,.doc,.docx"
        maxSize={10 * 1024 * 1024}
        onFilesChange={(files: FileUploadItem[]) =>
          console.log("Files changed:", files)
        }
      />
    </div>
  );
}

export function SimpleUploadWithS3Demo() {
  const [uploadedCount, setUploadedCount] = React.useState(0);

  return (
    <div className="w-full max-w-md">
      <FileUploadField
        accept="image/*,.pdf"
        multiple
        maxFiles={5}
        maxSize={5 * 1024 * 1024}
        upload={{
          getPresignedUrl: getPresignedUrl,
          uploadFile: uploadFile,
          onUploadComplete: (file: FileUploadItem) => {
            console.log("Uploaded:", file);
          },
          onAllUploadsComplete: (files: FileUploadItem[]) => {
            setUploadedCount(files.length);
            console.log("All uploads complete:", files);
          },
        }}
        onFilesChange={(files: FileUploadItem[]) =>
          console.log("Files:", files)
        }
      />
      {uploadedCount > 0 && (
        <div className="mt-4">
          <p className="text-ppx-neutral-10 text-sm">
            {uploadedCount} file(s) uploaded successfully
          </p>
        </div>
      )}
    </div>
  );
}
