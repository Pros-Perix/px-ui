import { Avatar } from "@px-ui/core";

import { SparklesIcon } from "../assets/icons";
import { XANDI_AVATAR_URL } from "../constants";

export interface XWelcomeProps {
  message: string;
}

export function XWelcome({ message }: XWelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        {/* Gradient border ring */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-b from-ppx-green-4 via-ppx-green-5/50 to-transparent" />
        
        {/* Avatar container */}
        <div className="relative rounded-full bg-ppx-neutral-18 p-1">
          <Avatar
            imgSrc={XANDI_AVATAR_URL}
            name="Xandi"
            variant="rounded"
            size="120px"
            hideTooltip
          />
        </div>

        {/* Sparkles icon with pulse-zoom animation */}
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
