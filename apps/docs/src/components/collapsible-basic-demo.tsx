import * as React from "react";
import { Collapsible } from "@px-ui/core";

export function CollapsibleBasicDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[360px] rounded-ppx-m border border-ppx-neutral-6 bg-ppx-background shadow-sm"
    >
      <Collapsible.Trigger className="flex w-full items-center justify-between gap-3 px-4 py-3">
        <div className="text-left">
          <p className="text-ppx-sm font-semibold text-ppx-neutral-18">
            PX-UI components
          </p>
        </div>
        <ChevronIcon
          className={`size-4 text-ppx-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </Collapsible.Trigger>
      <Collapsible.Panel className="border-t border-ppx-neutral-6">
        <div className="flex flex-col gap-2 px-4 py-3 text-ppx-sm">
          <div className="rounded-ppx-s border border-ppx-neutral-6 bg-ppx-neutral-1 px-4 py-2 font-mono">
            primitives
          </div>
          <div className="rounded-ppx-s border border-ppx-neutral-6 bg-ppx-neutral-5 px-4 py-2 font-mono">
            colors
          </div>
          <div className="rounded-ppx-s border border-ppx-neutral-11 bg-ppx-primary-b-5 px-4 py-2 font-mono">
            react
          </div>
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

export function ChevronIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M3.5 9L7.5 5L3.5 1" stroke="currentColor" />
    </svg>
  );
}