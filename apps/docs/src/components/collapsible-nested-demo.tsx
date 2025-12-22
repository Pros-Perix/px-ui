import { Collapsible } from "@px-ui/core";

export function CollapsibleNestedDemo() {
  return (
    <div className="w-full max-w-md">
      <Collapsible.Root defaultOpen>
        <Collapsible.Trigger className="group flex items-center gap-2 text-ppx-sm font-medium text-gray-900 hover:text-gray-700">
          <Collapsible.ToggleIcon />
          <span>Documentation</span>
        </Collapsible.Trigger>
        <Collapsible.Panel>
          <div className="ml-5 mt-2 flex flex-col gap-2">
            <Collapsible.Root>
              <Collapsible.Trigger className="group flex items-center gap-2 text-ppx-sm font-medium text-gray-700 hover:text-gray-900">
                <Collapsible.ToggleIcon />
                <span>Getting Started</span>
              </Collapsible.Trigger>
              <Collapsible.Panel>
                <div className="ml-5 mt-1 flex flex-col gap-1 text-ppx-sm text-gray-600">
                  <p>Introduction</p>
                  <p>Installation</p>
                  <p>Quick Start</p>
                </div>
              </Collapsible.Panel>
            </Collapsible.Root>
            <Collapsible.Root>
              <Collapsible.Trigger className="group flex items-center gap-2 text-ppx-sm font-medium text-gray-700 hover:text-gray-900">
                <Collapsible.ToggleIcon />
                <span>Components</span>
              </Collapsible.Trigger>
              <Collapsible.Panel>
                <div className="ml-5 mt-1 flex flex-col gap-1 text-ppx-sm text-gray-600">
                  <p>Button</p>
                  <p>Input</p>
                  <p>Dialog</p>
                </div>
              </Collapsible.Panel>
            </Collapsible.Root>
          </div>
        </Collapsible.Panel>
      </Collapsible.Root>
    </div>
  );
}
