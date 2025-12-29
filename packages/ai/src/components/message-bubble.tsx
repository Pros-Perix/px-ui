import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@px-ui/core";
import type { MessageRole } from "../types";

const messageBubbleVariants = cva(
  "max-w-[80%] rounded-ppx-m px-4 py-3 text-ppx-sm",
  {
    variants: {
      role: {
        user: "ml-auto bg-ppx-primary-5 text-white rounded-br-none",
        assistant: "mr-auto bg-ppx-neutral-3 text-ppx-foreground rounded-bl-none",
        system: "mx-auto bg-ppx-neutral-2 text-ppx-neutral-11 text-center italic",
      },
    },
    defaultVariants: {
      role: "assistant",
    },
  },
);

export interface MessageBubbleProps
  extends Omit<React.ComponentProps<"div">, "role">,
    VariantProps<typeof messageBubbleVariants> {
  role: MessageRole;
  content: React.ReactNode;
  renderContent?: (content: React.ReactNode) => React.ReactNode;
}

function MessageBubble({
  className,
  role,
  content,
  renderContent,
  ...props
}: MessageBubbleProps) {
  const displayContent = renderContent ? renderContent(content) : content;

  return (
    <div
      data-slot="message-bubble"
      data-role={role}
      className={cn(messageBubbleVariants({ role }), className)}
      {...props}
    >
      {displayContent}
    </div>
  );
}

export { MessageBubble, messageBubbleVariants };

