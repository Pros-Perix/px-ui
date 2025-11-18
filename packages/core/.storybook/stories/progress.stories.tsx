import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "../../src/components/progress";
import React, { useState, useEffect } from "react";

const sizes = ["default", "sm", "lg"] as const;
const variants = ["default", "success", "warning", "error"] as const;

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: "Components/progress",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: sizes,
    },
    variant: {
      control: "select",
      options: variants,
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    max: {
      control: { type: "number", min: 1, max: 1000 },
    },
    showValue: {
      control: "boolean",
    },
    valuePosition: {
      control: "select",
      options: ["inline", "bottom"],
    },
    indeterminate: {
      control: "boolean",
    },
  },
};

export default meta;

export const Default: StoryObj<typeof ProgressBar> = {
  args: {
    value: 65,
    label: "Progress",
    showValue: true,
  },
};

export const WithoutLabel: StoryObj<typeof ProgressBar> = {
  args: {
    value: 45,
    showValue: true,
    valuePosition: "bottom",
  },
};

export const Sizes: StoryObj<typeof ProgressBar> = {
  args: {
    value: 75,
    label: "Progress",
    showValue: true,
  },
  render: (args) => (
    <div className="space-y-4">
      {sizes.map((size) => (
        <div key={size}>
          <ProgressBar {...args} size={size} label={`Size: ${size}`} />
        </div>
      ))}
    </div>
  ),
};

export const Variants: StoryObj<typeof ProgressBar> = {
  args: {
    value: 80,
    label: "Progress",
    showValue: true,
  },
  render: (args) => (
    <div className="space-y-4">
      {variants.map((variant) => (
        <div key={variant}>
          <ProgressBar {...args} variant={variant} label={`Variant: ${variant}`} />
        </div>
      ))}
    </div>
  ),
};

export const ValuePositions: StoryObj<typeof ProgressBar> = {
  args: {
    value: 60,
    label: "Progress",
    showValue: true,
  },
  render: (args) => (
    <div className="space-y-6">
      <ProgressBar {...args} valuePosition="inline" label="Inline value" />
      <ProgressBar {...args} valuePosition="bottom" label="Bottom value" />
    </div>
  ),
};

export const Indeterminate: StoryObj<typeof ProgressBar> = {
  args: {
    indeterminate: true,
    label: "Loading...",
  },
};

function AnimatedProgressBar({ ...args }: React.ComponentProps<typeof ProgressBar>) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return <ProgressBar {...args} value={value} />;
}

export const Animated: StoryObj<typeof ProgressBar> = {
  args: {
    label: "Animated Progress",
    showValue: true,
  },
  render: (args) => <AnimatedProgressBar {...args} />,
};

export const CustomRange: StoryObj<typeof ProgressBar> = {
  args: {
    value: 750,
    max: 1000,
    min: 500,
    label: "Custom Range (500-1000)",
    showValue: true,
  },
};

export const WithPercentage: StoryObj<typeof ProgressBar> = {
  args: {
    value: 42,
    max: 100,
    label: "Completion",
    showValue: true,
    formatOptions: {
      style: "percent",
      minimumFractionDigits: 0,
    },
  },
};

export const WithoutValueDisplay: StoryObj<typeof ProgressBar> = {
  args: {
    value: 85,
    label: "Silent Progress",
    showValue: false,
  },
};

export const MultipleProgressBars: StoryObj<typeof ProgressBar> = {
  args: {
    showValue: true,
  },
  render: (args) => (
    <div className="space-y-4 max-w-md">
      <ProgressBar {...args} value={25} label="Task 1" variant="default" />
      <ProgressBar {...args} value={50} label="Task 2" variant="success" />
      <ProgressBar {...args} value={75} label="Task 3" variant="warning" />
      <ProgressBar {...args} value={100} label="Task 4" variant="error" />
    </div>
  ),
};
