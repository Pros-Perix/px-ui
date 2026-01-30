import { Avatar, Button } from "@px-ui/core";

import { CloseIcon, MenuIcon, NewChatIcon } from "../assets/icons";
import { useXandi } from "../context/xandi-context";

export interface XHeaderProps {
  onClose?: () => void;
  onToggleHistory?: () => void;
}

export function XHeader({
  onClose,
  onToggleHistory,
}: XHeaderProps) {
  const { startNewConversation, config } = useXandi();

  return (
    <header className="flex items-center justify-between border-b border-ppx-neutral-5 bg-transparent px-3 py-2">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggleHistory}
          aria-label="Toggle chat history"
        >
          <MenuIcon />
        </Button>

        <div className="flex items-center gap-2">
          <Avatar
            imgSrc={config.avatarUrl}
            name={config.assistantName}
            variant="rounded"
            size="24px"
            hideTooltip
          />
          <span className="font-medium text-ppx-foreground">{config.assistantName}</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={startNewConversation}
          aria-label="New chat"
        >
          <NewChatIcon />
        </Button>

        {config.uiMode !== "full" && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </Button>
        )}
      </div>
    </header>
  );
}
