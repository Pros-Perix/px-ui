import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "../../src/components/progress";
import React, { useState, useEffect } from "react";

const sizes = ["default", "sm", "lg"] as const;

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: "Components/Progress",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: sizes,
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

export const RichTextLabel: StoryObj<typeof ProgressBar> = {
  args: {
    value: 37,
    label: (
      <>
        <span className="font-bold text-black">37</span> of{" "}
        <span className="font-bold text-black">100</span> jobs processed
      </>
    ),
  },
};