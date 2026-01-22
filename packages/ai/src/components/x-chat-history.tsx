import { Button } from "@px-ui/core";

import { ChatIcon } from "../assets/icons";

export interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: Date;
}

export interface ChatHistoryGroup {
  label: string;
  items: ChatHistoryItem[];
}

export interface XChatHistoryProps {
  groups?: ChatHistoryGroup[];
  activeChatId?: string;
  onSelectChat?: (chatId: string) => void;
}

export function XChatHistory({
  groups = [],
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

      {/* Chat List */}
      {groups.length === 0 ? (
        <div className="px-6 py-4 text-ppx-sm text-ppx-neutral-10">
          No chat history yet
        </div>
      ) : (
        groups.map((group) => (
          <div key={group.label} className="mb-2">
            <div className="px-6 py-2 text-ppx-xs font-medium text-ppx-neutral-10">
              {group.label}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => (
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
          </div>
        ))
      )}
    </div>
  );
}

