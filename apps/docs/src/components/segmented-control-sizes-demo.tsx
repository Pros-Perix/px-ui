import { SegmentedControl } from "@px-ui/core";

export function SegmentedControlSizesDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <SegmentedControl.Root defaultValue="list">
          <SegmentedControl.Item value="list" size="sm">
            List
          </SegmentedControl.Item>
          <SegmentedControl.Item value="grid" size="sm">
            Grid
          </SegmentedControl.Item>
          <SegmentedControl.Item value="cards" size="sm">
            Cards
          </SegmentedControl.Item>
        </SegmentedControl.Root>
        <span className="text-ppx-neutral-11 text-xs">Small</span>
      </div>

      <div className="flex flex-col gap-2">
        <SegmentedControl.Root defaultValue="list">
          <SegmentedControl.Item value="list" size="default">
            List
          </SegmentedControl.Item>
          <SegmentedControl.Item value="grid" size="default">
            Grid
          </SegmentedControl.Item>
          <SegmentedControl.Item value="cards" size="default">
            Cards
          </SegmentedControl.Item>
        </SegmentedControl.Root>
        <span className="text-ppx-neutral-11 text-xs">Default</span>
      </div>

      <div className="flex flex-col gap-2">
        <SegmentedControl.Root defaultValue="list">
          <SegmentedControl.Item value="list" size="lg">
            List
          </SegmentedControl.Item>
          <SegmentedControl.Item value="grid" size="lg">
            Grid
          </SegmentedControl.Item>
          <SegmentedControl.Item value="cards" size="lg">
            Cards
          </SegmentedControl.Item>
        </SegmentedControl.Root>
        <span className="text-ppx-neutral-11 text-xs">Large</span>
      </div>
    </div>
  );
}
