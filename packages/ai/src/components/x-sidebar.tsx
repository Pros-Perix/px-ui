import { useEffect, useRef, useState } from "react";
import { Button } from "@px-ui/core";

import { CloseIcon, NewChatIcon } from "../assets/icons";
import { useXandi } from "../context/xandi-context";
import { XChatHistory, type ChatHistoryItem } from "./x-chat-history";

export interface XSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function XSidebar({
  isOpen = true,
  onClose,
}: XSidebarProps) {
  const { startNewConversation, getConvHistory, loadConversation, conversation } = useXandi();
  const [chatHistoryItems, setChatHistoryItems] = useState<ChatHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const fetchInProgressRef = useRef(false);

  useEffect(() => {
    if (!isOpen || !getConvHistory || fetchInProgressRef.current) return;

    fetchInProgressRef.current = true;
    setIsLoadingHistory(true);

    getConvHistory()
      .then((history) => {
        setChatHistoryItems(
          (history ?? []).map((item) => ({
            id: item.id,
            title: item.title,
            timestamp: item.timestamp,
          }))
        );
      })
      .catch((error) => {
        console.error("Failed to fetch conversation history:", error);
      })
      .finally(() => {
        fetchInProgressRef.current = false;
        setIsLoadingHistory(false);
      });
  }, [isOpen, getConvHistory]);

  const handleSelectChat = (chatId: string) => {
    loadConversation(chatId);
  };

  if (!isOpen) return null;

  return (
    <aside className="flex h-full w-64 flex-col border-r border-ppx-neutral-5 bg-ppx-neutral-2">
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

      <div className="p-3">
        <Button
          variant="ghost"
          onClick={startNewConversation}
          className="w-full justify-start gap-3"
        >
          <NewChatIcon className="h-5 w-5" />
          New chat
        </Button>
      </div>

      <XChatHistory
        items={chatHistoryItems}
        isLoading={isLoadingHistory}
        activeChatId={conversation.id ?? undefined}
        onSelectChat={handleSelectChat}
      />
    </aside>
  );
}
