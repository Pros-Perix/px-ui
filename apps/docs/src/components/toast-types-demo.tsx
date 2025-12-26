import { toast, Button } from "@px-ui/core";

export function ToastTypesDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Success",
            description: "Your changes have been saved.",
            type: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Error",
            description: "Something went wrong. Please try again.",
            type: "error",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Warning",
            description: "Your session will expire in 5 minutes.",
            type: "warning",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Info",
            description: "A new version is available.",
            type: "info",
          })
        }
      >
        Info
      </Button>
    </div>
  );
}
