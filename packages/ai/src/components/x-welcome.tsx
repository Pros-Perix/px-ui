import { Avatar } from "@px-ui/core";

import { SparklesIcon } from "../assets/icons";
import { useXandi } from "../context/xandi-context";

export interface XWelcomeProps {
  message: string;
}

export function XWelcome({ message }: XWelcomeProps) {
  const { config } = useXandi();

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-b from-ppx-green-4 via-ppx-green-5/50 to-transparent" />
        <div className="relative rounded-full bg-ppx-neutral-18 p-1">
          <Avatar
            imgSrc={config.avatarUrl}
            name={config.assistantName}
            variant="rounded"
            size="120px"
            hideTooltip
          />
        </div>

        <div className="absolute -bottom-2 left-1/2">
          <div className="flex h-6 w-6 animate-[pulse-zoom_2s_ease-in-out_infinite] items-center justify-center rounded-full bg-ppx-green-5">
            <SparklesIcon className="text-white" />
          </div>
        </div>
      </div>

      <h2 className="text-ppx-xl font-semibold text-ppx-foreground">
        {message}
      </h2>
    </div>
  );
}
