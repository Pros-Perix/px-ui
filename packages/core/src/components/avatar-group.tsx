import { cn } from "../utils";
import { Avatar } from "./avatar";
import * as Popover from "./popover";

export interface AvatarGroupProps {
  avatars: React.ComponentProps<typeof Avatar>[];
  max?: number;
  className?: string;
}

export function AvatarGroup({ max = 4, avatars, className }: AvatarGroupProps) {
  const hasOverflow = avatars.length > max;
  const overflowAvatars = avatars.slice(max);

  return (
    <div
      className={cn("flex items-center", className)}
      data-slot="avatar-group"
    >
      {avatars.map((avatar, index) => (
        <div
          key={avatar.name}
          className="relative"
          style={{
            marginLeft:
              index > 0 ? `-${parseInt(avatar.size ?? "100px") * 0.25}px` : "0",
            zIndex: avatars.length - index,
          }}
        >
          <Avatar {...avatar} className="ring-white ring-2" />
        </div>
      ))}

      {hasOverflow && (
        <div
          className="relative"
          style={{
            marginLeft: `-${parseInt(avatars[0].size ?? "100px") * 0.25}px`,
            zIndex: 0,
          }}
        >
          <Popover.Root openOnHover>
            <Popover.Trigger>
              <div
                className={cn(
                  "font-medium flex cursor-pointer items-center justify-center bg-ppx-gray-3 text-ppx-gray-18 transition-colors hover:bg-ppx-gray-4",
                  avatars[0].variant === "rounded"
                    ? "rounded-full"
                    : "rounded-ppx-s",
                )}
                style={{
                  width: avatars[0].size ?? "100px",
                  height: avatars[0].size ?? "100px",
                  fontSize: `${parseInt(avatars[0].size ?? "100px") * 0.3}px`,
                }}
              >
                +{overflowAvatars.length}
              </div>
            </Popover.Trigger>

            <Popover.Content className="w-80 bg-white">
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {overflowAvatars.map((avatar) => (
                  <div
                    key={avatar.name}
                    className="gap-3 p-2 rounded-md flex items-center"
                  >
                    <Avatar {...avatar} size="24px" hideTooltip />
                    <span className="text-sm font-medium text-ppx-gray-18">
                      {avatar.name}
                    </span>
                  </div>
                ))}
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      )}
    </div>
  );
}
