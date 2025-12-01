import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as Tooltip from "../../src/components/tooltip";
import { Button } from "../../src/components/button";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip.Root,
  title: "Components/Tooltip",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Tooltip.Root> = {
  render: () => <TooltipDemo />,
};

export const CustomTrigger: StoryObj<typeof Tooltip.Root> = {
  render: () => <CustomTriggerDemo />,
};

function TooltipDemo() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>Hover me</Tooltip.Trigger>
      <Tooltip.Content>Tooltip content</Tooltip.Content>
    </Tooltip.Root>
  );
}

function CustomTriggerDemo() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger render={<Button>Add Job</Button>} />
      <Tooltip.Content>Add a new job to your account.</Tooltip.Content>
    </Tooltip.Root>
  );
}
