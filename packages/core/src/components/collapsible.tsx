import * as React from "react";
import { Collapsible as BaseCollapsible } from "@base-ui/react";

import { cn } from "../utils";
import ChevronDownIcon from "../icons/chevron-down-icon";

export function Root({
  className,
  ...props
}: React.ComponentProps<typeof BaseCollapsible.Root>) {
  return (
    <BaseCollapsible.Root
      data-slot="collapsible"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

export function Trigger(
  props: React.ComponentProps<typeof BaseCollapsible.Trigger>,
) {
  return (
    <BaseCollapsible.Trigger
      data-slot="collapsible-trigger"
      {...props}
      className={cn("group flex items-center gap-2", props.className)}
    />
  );
}

export function Panel({
  className,
  ...props
}: React.ComponentProps<typeof BaseCollapsible.Panel>) {
  return (
    <BaseCollapsible.Panel
      data-slot="collapsible-content"
      className={cn(
        "flex h-[var(--collapsible-panel-height)] w-full flex-col overflow-hidden transition-all duration-150 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0 [&[hidden]:not([hidden='until-found'])]:hidden",
        className,
      )}
      {...props}
    />
  );
}

export function ToggleIcon() {
  return (
    <ChevronDownIcon className="rotate-270 group-data-[panel-open]:rotate-360 transition-all ease-out" />
  );
}
