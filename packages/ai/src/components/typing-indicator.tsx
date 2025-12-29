import * as React from "react";
import { cn } from "@px-ui/core";

export interface TypingIndicatorProps extends React.ComponentProps<"div"> {
  visible?: boolean;
}

function TypingIndicator({
  className,
  visible = true,
  ...props
}: TypingIndicatorProps) {
  if (!visible) return null;

  return (
    <div
      data-slot="typing-indicator"
      className={cn(
        "flex items-center gap-1 px-4 py-3 mr-auto bg-ppx-neutral-3 rounded-ppx-m rounded-bl-none max-w-fit",
        className,
      )}
      {...props}
    >
      <span className="size-2 rounded-full bg-ppx-neutral-9 animate-bounce [animation-delay:-0.3s]" />
      <span className="size-2 rounded-full bg-ppx-neutral-9 animate-bounce [animation-delay:-0.15s]" />
      <span className="size-2 rounded-full bg-ppx-neutral-9 animate-bounce" />
      <span className="sr-only">AI is typing...</span>
    </div>
  );
}

export { TypingIndicator };

