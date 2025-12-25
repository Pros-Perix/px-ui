import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";

import { cn } from "../utils";

function Switch({
  className,
  size,
  ...props
}: React.ComponentProps<typeof BaseSwitch.Root> & {
  size?: "sm" | "lg" | "default";
}) {
  return (
    <BaseSwitch.Root
      data-slot="switch"
      className={cn(
        "shadow-xs focus-visible:ring-3 focus-visible:ring-ppx-neutral-17/30 data-checked:bg-ppx-primary-5 data-unchecked:bg-ppx-neutral-4 data-disabled:cursor-not-allowed data-disabled:opacity-50 peer inline-flex shrink-0 items-center rounded-full border border-transparent outline-none transition-all",
        size === "sm" && "h-4 w-8",
        size === undefined || size === "default" ? "h-5 w-10" : "",
        size === "lg" && "h-6 w-12",
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-ppx-neutral-1 pointer-events-none block rounded-full ring-0 transition-transform duration-300 ease-in-out",
          size === "sm" && "data-checked:translate-x-[calc(100%+2px)] size-3.5",
          size === undefined || size === "default"
            ? "data-checked:translate-x-[calc(100%+5px)] data-unchecked:translate-x-px size-4"
            : "",
          size === "lg" &&
            "data-checked:translate-x-[calc(100%+5px)] data-unchecked:translate-x-px size-5",
        )}
      />
    </BaseSwitch.Root>
  );
}

export { Switch };
