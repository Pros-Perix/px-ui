import * as React from "react";
import { cn } from "@px-ui/core";

export interface ChatContainerProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

function ChatContainer({ className, children, ...props }: ChatContainerProps) {
  return (
    <div
      data-slot="chat-container"
      className={cn(
        "flex flex-col h-full w-full overflow-hidden rounded-ppx-m border border-ppx-neutral-5 bg-ppx-background",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { ChatContainer };

