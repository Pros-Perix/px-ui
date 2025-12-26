import { toast, Button } from "@px-ui/core";

export function ToastWithActionDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.add({
          title: "File deleted",
          description: "The file has been moved to trash.",
          type: "info",
          actionProps: {
            children: "Undo",
            onClick: () => {
              toast.add({
                title: "File restored",
                description: "The file has been restored.",
                type: "success",
              });
            },
          },
        })
      }
    >
      Delete File
    </Button>
  );
}
