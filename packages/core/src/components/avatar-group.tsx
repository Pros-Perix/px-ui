import React from "react";
import { cn } from "../utils";
import { Avatar, AvatarImpl } from "./avatar";
import * as Popover from "./popover";
import * as Tooltip from "./tooltip";

interface AvatarGroupProps {
  avatars: React.ComponentProps<typeof Avatar>[];
  max?: number;
  className?: string;
}

export function AvatarGroup({ max = 4, avatars, className }: AvatarGroupProps) {
  const hasOverflow = avatars.length > max;
  const overflowAvatars = avatars.slice(max);

  return (
    <Tooltip.BaseProvider>
      <div
        className={cn("flex items-center", className)}
        data-slot="avatar-group"
      >
        {avatars.map((avatar, index) => (
          <React.Fragment key={avatar.name}>
            <Tooltip.BaseRoot>
              <Tooltip.Trigger
                render={(tooltipProps) => (
                  <div
                    className="relative"
                    style={{
                      marginLeft:
                        index > 0
                          ? `-${parseInt(avatar.size ?? "100px") * 0.25}px`
                          : "0",
                      zIndex: avatars.length - index,
                    }}
                    {...tooltipProps}
                  >
                    <AvatarImpl {...avatar} className="ring-2 ring-white" />
                  </div>
                )}
              />
              <Tooltip.Content>{avatar.name}</Tooltip.Content>
            </Tooltip.BaseRoot>
          </React.Fragment>
        ))}

        {hasOverflow && (
          <div
            className="relative"
            style={{
              marginLeft: `-${parseInt(avatars[0].size ?? "100px") * 0.25}px`,
              zIndex: 0,
            }}
          >
            <Popover.Root>
              <Popover.Trigger openOnHover>
                <div
                  className={cn(
                    "bg-ppx-neutral-3 text-ppx-neutral-18 hover:bg-ppx-neutral-4 flex cursor-pointer items-center justify-center font-medium transition-colors",
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

              <Popover.Content
                className="w-80"
                positionerProps={{ align: "start", side: "top" }}
              >
                <div className="max-h-64 space-y-2 overflow-y-auto">
                  {overflowAvatars.map((avatar) => (
                    <div
                      key={avatar.name}
                      className="flex items-center gap-3 rounded-md p-2"
                    >
                      <Avatar {...avatar} size="24px" hideTooltip />
                      <span className="text-ppx-neutral-18 text-sm font-medium">
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
    </Tooltip.BaseProvider>
  );
}
