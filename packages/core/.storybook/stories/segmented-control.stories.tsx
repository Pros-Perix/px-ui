import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as SegmentedControl from "../../src/components/segmented-control";

const meta: Meta<typeof SegmentedControl.Root> = {
  component: SegmentedControl.Root,
  title: "Components/segmented-control",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof SegmentedControl.Root> = {
  render: () => <SegmentedControlDemo />,
};

export const Sizes: StoryObj<typeof SegmentedControl.Root> = {
  render: () => <SegmentedControlSizesDemo />,
};

export const ThreeOptions: StoryObj<typeof SegmentedControl.Root> = {
  render: () => <SegmentedControlThreeOptionsDemo />,
};

function SegmentedControlDemo() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Distribution Options</h2>
      <SegmentedControl.Root defaultValue="recommended">
        <SegmentedControl.Item value="recommended">
          Recommended Distribution Groups
        </SegmentedControl.Item>
        <SegmentedControl.Item value="specific">
          Select Specific Suppliers
        </SegmentedControl.Item>
      </SegmentedControl.Root>
    </div>
  );
}

function SegmentedControlSizesDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium">Small Size</h3>
        <SegmentedControl.Root defaultValue="option1">
          <SegmentedControl.Item value="option1" size="sm">
            Option 1
          </SegmentedControl.Item>
          <SegmentedControl.Item value="option2" size="sm">
            Option 2
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">Default Size</h3>
        <SegmentedControl.Root defaultValue="option1">
          <SegmentedControl.Item value="option1">
            Option 1
          </SegmentedControl.Item>
          <SegmentedControl.Item value="option2">
            Option 2
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">Large Size</h3>
        <SegmentedControl.Root defaultValue="option1">
          <SegmentedControl.Item value="option1" size="lg">
            Option 1
          </SegmentedControl.Item>
          <SegmentedControl.Item value="option2" size="lg">
            Option 2
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>
    </div>
  );
}

function SegmentedControlThreeOptionsDemo() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">View Mode</h2>
      <SegmentedControl.Root defaultValue="list">
        <SegmentedControl.Item value="list">List</SegmentedControl.Item>
        <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
        <SegmentedControl.Item value="table">Table</SegmentedControl.Item>
      </SegmentedControl.Root>
    </div>
  );
}
