import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "../../src";
import React, { useState, useEffect } from "react";

const sizes = ["default", "sm", "lg"] as const;

const meta: Meta = {
  title: "Components/Progress",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A composable progress component that allows flexible positioning of labels and values.",
      },
    },
  },
};

export default meta;

export const Basic: StoryObj = {
  render: () => (
    <Progress.Root value={75} max={100}>
      <div className="flex items-center justify-between mb-2">
        <Progress.Label>Progress</Progress.Label>
        <Progress.Value />
      </div>
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
    </Progress.Root>
  ),
};

export const LabelInsideTrack: StoryObj = {
  render: () => (
    <Progress.Root value={60} max={100}>
      <Progress.Track className="relative">
        <Progress.Indicator />
        <div className="absolute inset-0 flex items-center justify-center">
          <Progress.Label className="text-white font-medium">60% Complete</Progress.Label>
        </div>
      </Progress.Track>
    </Progress.Root>
  ),
};

export const VerticalStack: StoryObj = {
  render: () => (
    <Progress.Root value={42} max={100}>
      <div className="text-center mb-2">
        <Progress.Label className="block">Upload Progress</Progress.Label>
        <Progress.Value className="block text-2xl font-bold mt-1" />
      </div>
      <Progress.Track size="lg">
        <Progress.Indicator />
      </Progress.Track>
    </Progress.Root>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="space-y-4">
      {sizes.map((size) => (
        <Progress.Root key={size} value={75} max={100}>
          <div className="flex items-center justify-between mb-2">
            <Progress.Label>Size: {size}</Progress.Label>
            <Progress.Value />
          </div>
          <Progress.Track size={size as "default" | "sm" | "lg"}>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      ))}
    </div>
  ),
};

function AnimatedProgress() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <Progress.Root value={value} max={100}>
      <div className="flex items-center justify-between mb-2">
        <Progress.Label>Animated Progress</Progress.Label>
        <Progress.Value />
      </div>
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
    </Progress.Root>
  );
}

export const Animated: StoryObj = {
  render: () => <AnimatedProgress />,
};

export const WithPercentage: StoryObj = {
  render: () => (
    <Progress.Root value={42} max={100} format={{ style: "percent", minimumFractionDigits: 0 }}>
      <div className="flex items-center justify-between mb-2">
        <Progress.Label>Completion</Progress.Label>
        <Progress.Value />
      </div>
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
    </Progress.Root>
  ),
};

export const RichTextLabel: StoryObj = {
  render: () => (
    <Progress.Root value={37} max={100}>
      <div className="flex items-center justify-between mb-2">
        <Progress.Label>
          <span className="font-bold">37</span> of <span className="font-bold">100</span> jobs processed
        </Progress.Label>
        <Progress.Value />
      </div>
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
    </Progress.Root>
  ),
};