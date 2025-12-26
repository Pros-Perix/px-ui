import { useRef } from "react";
import { anchoredToast, Button } from "@px-ui/core";

export function ToastAnchoredDemo() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Button
      ref={buttonRef}
      variant="outline"
      onClick={() => {
        navigator.clipboard.writeText("Hello, World!");
        anchoredToast.add({
          title: "Copied!",
          positionerProps: {
            anchor: buttonRef.current,
          },
          data: {
            tooltipStyle: true,
          },
        });
      }}
    >
      Copy to Clipboard
    </Button>
  );
}
