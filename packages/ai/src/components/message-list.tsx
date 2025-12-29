import * as React from "react";
import { cn } from "@px-ui/core";
import type { Message, RenderMessageFn } from "../types";
import { MessageBubble } from "./message-bubble";

export interface MessageListProps extends React.ComponentProps<"div"> {
  messages: Message[];
  renderMessage?: RenderMessageFn;
  autoScroll?: boolean;
}

function MessageList({
  className,
  messages,
  renderMessage,
  autoScroll = true,
  ...props
}: MessageListProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, autoScroll]);

  return (
    <div
      ref={scrollRef}
      data-slot="message-list"
      className={cn(
        "flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth",
        className,
      )}
      {...props}
    >
      {messages.map((message, index) =>
        renderMessage ? (
          renderMessage({ message, index })
        ) : (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ),
      )}
    </div>
  );
}

export { MessageList };

