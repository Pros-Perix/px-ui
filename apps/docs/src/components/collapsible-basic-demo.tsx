import { Collapsible } from "@px-ui/core";

export function CollapsibleBasicDemo() {
  return (
    <Collapsible.Root className="w-md mx-auto">
      <Collapsible.Trigger className="text-ppx-sm">
        <Collapsible.ToggleIcon />
        <span>Show more details</span>
      </Collapsible.Trigger>
      <Collapsible.Panel>
        <div className="text-ppx-sm mt-2">
          <p>
            This is the collapsible content that can be expanded or collapsed.
            Click the trigger above to toggle visibility.
          </p>
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
