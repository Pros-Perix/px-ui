import * as React from "react";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";

import { cn } from "../utils";

function Root({
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

function Trigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseCollapsible.Trigger>) {
  return (
    <BaseCollapsible.Trigger
      data-slot="collapsible-trigger"
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-ppx-s px-3 py-2 text-left text-ppx-neutral-18 transition-colors hover:bg-ppx-neutral-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ppx-primary-b-5",
        className,
      )}
      {...props}
    />
  );
}

function Panel({
  className,
  ...props
}: React.ComponentProps<typeof BaseCollapsible.Panel>) {
  return (
    <BaseCollapsible.Panel
      data-slot="collapsible-content"
      className={cn("w-full data-[state=closed]:hidden", className)}
      {...props}
    />
  );
}

const Collapsible = Object.assign(Root, {
  Root,
  Trigger,
  Panel,
});

export { Collapsible, Trigger as CollapsibleTrigger, Panel as CollapsibleContent };


