import { Avatar } from "@px-ui/core";

const XANDI_AVATAR_URL = "https://prosperix.ai/assets/xandi-avatar-CbNInruf.png";

export interface XWelcomeProps {
  message: string;
}

export function XWelcome({ message }: XWelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <Avatar
        imgSrc={XANDI_AVATAR_URL}
        name="Xandi"
        variant="rounded"
        size="80px"
        hideTooltip
      />
      <h2 className="text-ppx-xl font-semibold text-ppx-foreground">
        {message}
      </h2>
    </div>
  );
}
