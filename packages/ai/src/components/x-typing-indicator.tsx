import { Avatar } from "@px-ui/core";

import { useXandi } from "../context/xandi-context";

export function XTypingIndicator() {
  const { config } = useXandi();

  return (
    <div className="flex items-center gap-4">
      <div className="animate-[popUp_0.3s_ease-out_forwards]">
        <Avatar
          imgSrc={config.avatarUrl}
          name={config.assistantName}
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
