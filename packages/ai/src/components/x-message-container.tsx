import { useEffect, useRef } from "react";

import type { Message } from "./xandi";
import { XMessageItem } from "./x-message-item";

export interface XMessageContainerProps {
  messages: Message[];
  height?: string | number;
}

export function XMessageContainer({ messages, height = 400 }: XMessageContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto py-10p"
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    >
      <div className="flex flex-col gap-5 p-4">
        {messages.map((message) => (
          <XMessageItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}

