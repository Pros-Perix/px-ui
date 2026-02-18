import { useEffect, useLayoutEffect, useRef } from "react";

import { XMessageItem } from "./x-message-item";
import { XTypingIndicator } from "./x-typing-indicator";
import { useXandi } from "../context/xandi-context";

export interface XMessageContainerProps {
  height?: string | number;
  onLoadMore?: () => void;
}

export function XMessageContainer({ height = 400, onLoadMore }: XMessageContainerProps) {
  const { conversation, isLoading } = useXandi();
  const containerRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef(0);
  const prevScrollTopRef = useRef(0);
  const prevLastMessageIdRef = useRef<string | null>(null);
  const prevMessageCountRef = useRef(0);
  const skipScrollToBottomRef = useRef(false);

  const messages = conversation.messages;
  const messageCount = messages.length;
  const lastMessageId = messageCount > 0 ? messages[messageCount - 1].id : null;

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prevCount = prevMessageCountRef.current;
    const prevLastId = prevLastMessageIdRef.current;
    const isPrependOlder =
      prevCount > 0 &&
      messageCount > prevCount &&
      lastMessageId != null &&
      lastMessageId === prevLastId;

    if (isPrependOlder) {
      const prevScrollHeight = prevScrollHeightRef.current;
      const prevScrollTop = prevScrollTopRef.current;
      const newScrollHeight = el.scrollHeight;
      el.scrollTop = Math.max(0, prevScrollTop + (newScrollHeight - prevScrollHeight));
      skipScrollToBottomRef.current = true;
    }

    prevScrollHeightRef.current = el.scrollHeight;
    prevScrollTopRef.current = el.scrollTop;
    prevMessageCountRef.current = messageCount;
    prevLastMessageIdRef.current = lastMessageId;
  }, [messageCount, lastMessageId, messages]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (skipScrollToBottomRef.current) {
      skipScrollToBottomRef.current = false;
      return;
    }
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }, [conversation.messages, isLoading]);

  useEffect(() => {
    if (!onLoadMore) return;
    const sentinel = topSentinelRef.current;
    const container = containerRef.current;
    if (!sentinel || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: container,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onLoadMore]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col overflow-y-auto py-[10px]"
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    >
      <div className="flex min-w-0 flex-col-reverse gap-5 p-4">
        {isLoading && <XTypingIndicator />}
        {[...messages].reverse().map((message) => (
          <XMessageItem key={message.id} message={message} />
        ))}
        <div ref={topSentinelRef} className="h-1 shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
}
