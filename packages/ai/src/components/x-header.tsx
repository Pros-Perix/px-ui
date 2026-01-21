import { Avatar, Button } from "@px-ui/core";

import { CloseIcon, MenuIcon, NewChatIcon } from "../assets/icons";
import { XANDI_AVATAR_URL } from "../constants";

export interface XHeaderProps {
  title?: string;
  onClose?: () => void;
  onNewChat?: () => void;
  onToggleHistory?: () => void;
}

export function XHeader({
  title = "Xandi",
  onClose,
  onNewChat,
  onToggleHistory,
}: XHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-ppx-neutral-5 bg-ppx-neutral-2 px-3 py-2">
      {/* Left section - Menu & Title */}
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
            imgSrc={XANDI_AVATAR_URL}
            name="Xandi"
            variant="rounded"
            size="24px"
            hideTooltip
          />
          <span className="font-medium text-ppx-foreground">{title}</span>
        </div>
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onNewChat}
          aria-label="New chat"
        >
          <NewChatIcon />
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </Button>
      </div>
    </header>
  );
}
