import { useEffect, useRef } from "react";

import { XMessageItem } from "./x-message-item";
import { XTypingIndicator } from "./x-typing-indicator";
import { useXandi } from "../context/xandi-context";

export interface XMessageContainerProps {
  height?: string | number;
}

export function XMessageContainer({ height = 400 }: XMessageContainerProps) {
  const { messages, isLoading } = useXandi();
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive or loading state changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto py-[10px]"
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    >
      <div className="flex flex-col gap-5 p-4">
        {messages.map((message) => (
          <XMessageItem key={message.id} message={message} />
        ))}
        {isLoading && <XTypingIndicator />}
      </div>
    </div>
  );
}
