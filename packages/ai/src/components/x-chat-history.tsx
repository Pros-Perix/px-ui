import { Button, Spinner } from "@px-ui/core";

import { ChatIcon } from "../assets/icons";

export interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: Date;
}

export interface XChatHistoryProps {
  items?: ChatHistoryItem[];
  /** Whether conversation history is being fetched */
  isLoading?: boolean;
  activeChatId?: string;
  onSelectChat?: (chatId: string) => void;
}

export function XChatHistory({
  items = [],
  isLoading = false,
  activeChatId,
  onSelectChat,
}: XChatHistoryProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 text-ppx-sm font-medium text-ppx-foreground">
          <ChatIcon />
          Chats
        </div>
      </div>

      {/* Chat List - show loader only when loading and list is empty (first time) */}
      {isLoading && items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-8">
          <Spinner size="medium" className="text-ppx-neutral-10" />
          <span className="text-ppx-sm text-ppx-neutral-10">Loading conversations...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="px-6 py-4 text-ppx-sm text-ppx-neutral-10">
          No chat history yet
        </div>
      ) : (
        <div className="space-y-0.5">
          {items.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onSelectChat?.(item.id)}
              className={`w-full justify-start truncate rounded-none px-6 ${
                activeChatId === item.id
                  ? "bg-ppx-neutral-4 text-ppx-foreground"
                  : "text-ppx-neutral-12"
              }`}
            >
              {item.title}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

