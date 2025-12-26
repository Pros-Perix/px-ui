import { toast, Button } from "@px-ui/core";

export function ToastBasicDemo() {
  return (
    <Button
      onClick={() =>
        toast.add({
          title: "Event has been created",
          description: "Monday, January 3rd at 6:00pm",
        })
      }
    >
      Create Event
    </Button>
  );
}
