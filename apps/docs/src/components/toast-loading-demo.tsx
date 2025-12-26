import { toast, Button } from "@px-ui/core";

export function ToastLoadingDemo() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        const toastId = toast.add({
          title: "Uploading...",
          description: "Please wait while we process your file.",
          type: "loading",
        });

        // Simulate upload completion after 2 seconds
        setTimeout(() => {
          toast.update(toastId, {
            title: "Upload complete!",
            description: "Your file has been uploaded successfully.",
            type: "success",
          });
        }, 2000);
      }}
    >
      Upload File
    </Button>
  );
}
