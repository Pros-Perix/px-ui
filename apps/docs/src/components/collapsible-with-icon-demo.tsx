import { Collapsible } from "@px-ui/core";

export function CollapsibleWithIconDemo() {
  return (
    <div className="w-full max-w-md">
      <Collapsible.Root className="rounded-ppx-s border p-3">
        <Collapsible.Trigger className="text-ppx-sm justify-between">
          <span>Advanced Settings</span>
          <Collapsible.ToggleIcon />
        </Collapsible.Trigger>
        <Collapsible.Panel>
          <div className="pt-3">
            <div className="text-ppx-sm flex flex-col gap-3 text-gray-600">
              <div className="flex justify-between">
                <span>Enable notifications</span>
                <span className="text-gray-900">On</span>
              </div>
              <div className="flex justify-between">
                <span>Auto-save drafts</span>
                <span className="text-gray-900">Every 5 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Theme preference</span>
                <span className="text-gray-900">System</span>
              </div>
            </div>
          </div>
        </Collapsible.Panel>
      </Collapsible.Root>
    </div>
  );
}
