import { toast, Button } from "@px-ui/core";

export function ToastPromiseDemo() {
  const handleSave = () => {
    const savePromise = new Promise<void>((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve();
        } else {
          reject(new Error("Network error"));
        }
      }, 2000);
    });

    toast.promise(savePromise, {
      loading: { title: "Saving...", description: "Please wait" },
      success: { title: "Saved!", description: "Your changes are live" },
      error: { title: "Failed", description: "Could not save changes" },
    });
  };

  return (
    <Button variant="outline" onClick={handleSave}>
      Save Changes
    </Button>
  );
}
