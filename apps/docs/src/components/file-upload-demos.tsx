import * as React from "react";
import {
  FileUpload,
  useFileUpload,
  type FileUploadItem,
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
// Helper Components
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
