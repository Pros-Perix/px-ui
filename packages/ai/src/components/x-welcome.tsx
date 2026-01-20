import { Avatar } from "@px-ui/core";

const XANDI_AVATAR_URL = "https://prosperix.ai/assets/xandi-avatar-CbNInruf.png";

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

        {/* Sparkles icon with heartbeat animation */}
        <div className="absolute -bottom-2 left-1/2">
          <div className="flex h-6 w-6 animate-[pulse-zoom_2s_ease-in-out_infinite] items-center justify-center rounded-full bg-ppx-green-5">
            <SparklesIcon />
          </div>
        </div>
      </div>

      <h2 className="text-ppx-xl font-semibold text-ppx-foreground">
        {message}
      </h2>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}
