import * as React from "react";
import { cn } from "../utils";

// https://www.radix-ui.com/primitives/docs/components/separator
export function Separator({
  className,
  orientation = "vertical",
  decorative = false,
  ...props
}: React.ComponentProps<"div"> & {
  orientation: "horizontal" | "vertical";
  decorative?: boolean;
}) {
  // `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
  const ariaOrientation = orientation === "vertical" ? orientation : undefined;
  const semanticProps = decorative
    ? { role: "none" }
    : { "aria-orientation": ariaOrientation, role: "separator" };

  return (
    <div
      data-orientation={orientation}
      {...semanticProps}
      data-slot="separator"
      className={cn(
        "shrink-0 bg-ppx-neutral-3 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

Separator.displayName = "Separator";
