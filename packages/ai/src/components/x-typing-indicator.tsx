import { Avatar } from "@px-ui/core";

const XANDI_AVATAR_URL = "https://prosperix.ai/assets/xandi-avatar-CbNInruf.png";

export function XTypingIndicator() {
  return (
    <div className="flex items-center gap-4">
      <div className="animate-[popUp_0.3s_ease-out_forwards]">
        <Avatar
          imgSrc={XANDI_AVATAR_URL}
          name="Xandi"
          variant="rounded"
          size="48px"
          hideTooltip
          className="border-2 border-ppx-neutral-4"
        />
      </div>
      <div className="flex animate-[slideIn_0.3s_ease-out_0.2s_forwards] items-center gap-2 rounded-xl bg-ppx-neutral-2 px-[10px] pb-[5px] pt-[10px] opacity-0 shadow-sm">
        <span className="h-[12px] w-[12px] animate-bounce rounded-full bg-ppx-neutral-9 [animation-delay:-0.3s]" />
        <span className="h-[12px] w-[12px] animate-bounce rounded-full bg-ppx-neutral-6 [animation-delay:-0.15s]" />
        <span className="h-[12px] w-[12px] animate-bounce rounded-full bg-ppx-neutral-9" />
      </div>
    </div>
  );
}
