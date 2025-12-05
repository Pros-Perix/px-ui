import type { Meta, StoryObj } from "@storybook/react";
import { BarChart } from "../../src/components/bar-chart";

const meta: Meta<typeof BarChart> = {
  title: "Charts/BarChart",
  component: BarChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BarChart>;

const sampleData = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 200 },
  { day: "Wed", value: 150 },
  { day: "Thu", value: 80 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 110 },
  { day: "Sun", value: 130 },
];

export const Default: Story = {
  args: {
    data: sampleData,
    xKey: "day",
    yKey: "value",
    height: 300,
  },
};

export const WithTitle: Story = {
  args: {
    data: sampleData,
    xKey: "day",
    yKey: "value",
    title: "Weekly Sales",
    height: 300,
  },
};

export const Horizontal: Story = {
  args: {
    data: sampleData,
    xKey: "day",
    yKey: "value",
    title: "Weekly Sales (Horizontal)",
    horizontal: true,
    height: 300,
  },
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 20 }, (_, i) => ({
      month: `Month ${i + 1}`,
      revenue: Math.floor(Math.random() * 1000) + 500,
    })),
    xKey: "month",
    yKey: "revenue",
    title: "Monthly Revenue",
    height: 400,
  },
};

export const CustomHeight: Story = {
  args: {
    data: sampleData,
    xKey: "day",
    yKey: "value",
    title: "Custom Height (500px)",
    height: 500,
  },
};
