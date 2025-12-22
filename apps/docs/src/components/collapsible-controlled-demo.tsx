import * as React from "react";
import { Collapsible, Button } from "@px-ui/core";

export function CollapsibleControlledDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => setOpen(!open)}>
          {open ? "Collapse" : "Expand"}
        </Button>
        <span className="text-ppx-sm text-gray-500">
          Panel is {open ? "open" : "closed"}
        </span>
      </div>
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger className="text-ppx-sm">
          <Collapsible.ToggleIcon />
          <span>Click here or use button above</span>
        </Collapsible.Trigger>
        <Collapsible.Panel>
          <div className="mt-2 text-ppx-sm text-gray-600">
            <p>
              This collapsible is controlled externally. You can toggle it using
              the button above or by clicking the trigger.
            </p>
          </div>
        </Collapsible.Panel>
      </Collapsible.Root>
    </div>
  );
}
