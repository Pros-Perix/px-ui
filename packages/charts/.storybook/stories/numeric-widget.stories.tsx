import type { Meta, StoryObj } from "@storybook/react";
import { NumericWidget } from "../../src/components/numeric-widget";

const meta: Meta<typeof NumericWidget> = {
  title: "Charts/NumericWidget",
  component: NumericWidget,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NumericWidget>;

export const Default: Story = {
  args: {
    label: "Total Users",
    value: 3238,
  },
};

export const WithUpwardTrend: Story = {
  args: {
    label: "Active Candidates",
    value: 679,
    trend: {
      value: 12.5,
      direction: "up",
    },
  },
};

export const WithDownwardTrend: Story = {
  args: {
    label: "Open Issues",
    value: 42,
    trend: {
      value: 8.3,
      direction: "down",
    },
  },
};

export const WithCTA: Story = {
  args: {
    label: "Sourced Candidates",
    value: 3238,
    ctaLabel: "View Details",
    onCtaClick: () => alert("CTA clicked!"),
  },
};

export const WithTrendAndCTA: Story = {
  args: {
    label: "Revenue",
    value: "$45,231",
    trend: {
      value: 15.3,
      direction: "up",
    },
    ctaLabel: "View Report",
    onCtaClick: () => alert("View report clicked!"),
  },
};

export const WithCustomFormat: Story = {
  args: {
    label: "Conversion Rate",
    value: 0.1234,
    formatValue: (val) => `${(Number(val) * 100).toFixed(1)}%`,
    trend: {
      value: 3.2,
      direction: "up",
    },
  },
};

export const LargeNumber: Story = {
  args: {
    label: "Total Downloads",
    value: 1234567,
    formatValue: (val) => Number(val).toLocaleString(),
    ctaLabel: "View Analytics",
    onCtaClick: () => alert("View analytics clicked!"),
  },
};
