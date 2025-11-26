import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui-components/react/switch";

import { cn } from "../utils";

function Switch({
  className,
  size,
  ...props
}: React.ComponentProps<typeof BaseSwitch.Root> & {
  size?: "sm" | "lg";
}) {
  return (
    <BaseSwitch.Root
      data-slot="switch"
      className={cn(
        "peer shadow-xs inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-3 focus-visible:ring-ppx-neutral-17/30 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-ppx-primary-5 data-unchecked:bg-ppx-neutral-4",
        size === "sm" && "h-4 w-8",
        size === undefined && "h-5 w-10",
        size === "lg" && "h-6 w-12",
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        data-slot="switch-thumb"
        className={cn(
          "ease-in-out pointer-events-none block rounded-full bg-ppx-neutral-1 ring-0 transition-transform duration-300",
          size === "sm" && "size-3.5 data-checked:translate-x-[calc(100%+2px)]",
          size === undefined &&
            "size-4 data-checked:translate-x-[calc(100%+5px)] data-unchecked:translate-x-px",
          size === "lg" &&
            "size-5 data-checked:translate-x-[calc(100%+5px)] data-unchecked:translate-x-px",
        )}
      />
    </BaseSwitch.Root>
  );
}

export { Switch };
