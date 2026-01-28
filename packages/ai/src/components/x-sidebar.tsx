import { Button } from "@px-ui/core";

import { CloseIcon, NewChatIcon } from "../assets/icons";
import { XChatHistory, type ChatHistoryItem } from "./x-chat-history";

export interface XSidebarProps {
  isOpen?: boolean;
  chatHistory?: ChatHistoryItem[];
  activeChatId?: string;
  onClose?: () => void;
  onNewChat?: () => void;
  onSelectChat?: (chatId: string) => void;
}

export function XSidebar({
  isOpen = true,
  chatHistory = [],
  activeChatId,
  onClose,
  onNewChat,
  onSelectChat,
}: XSidebarProps) {
  if (!isOpen) return null;

  return (
    <aside className="flex h-full w-64 flex-col border-r border-ppx-neutral-5 bg-ppx-neutral-2">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-ppx-neutral-5 p-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <CloseIcon />
        </Button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <Button
          variant="ghost"
          onClick={onNewChat}
          className="w-full justify-start gap-3"
        >
          <NewChatIcon className="h-5 w-5" />
          New chat
        </Button>
      </div>

      {/* Chat History */}
      <XChatHistory
        items={chatHistory}
        activeChatId={activeChatId}
        onSelectChat={onSelectChat}
      />
    </aside>
  );
}
