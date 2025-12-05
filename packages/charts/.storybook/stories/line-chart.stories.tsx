import type { Meta, StoryObj } from "@storybook/react";
import { LineChart } from "../../src/components/line-chart";

const meta: Meta<typeof LineChart> = {
  title: "Charts/LineChart",
  component: LineChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LineChart>;

const sampleData = [
  { date: "Jan 12", value: 150 },
  { date: "Jan 13", value: 230 },
  { date: "Jan 14", value: 224 },
  { date: "Jan 15", value: 218 },
  { date: "Jan 16", value: 135 },
  { date: "Jan 17", value: 147 },
  { date: "Jan 18", value: 260 },
];

export const Default: Story = {
  args: {
    data: sampleData,
    xKey: "date",
    yKey: "value",
    height: 300,
  },
};

export const WithTitle: Story = {
  args: {
    data: sampleData,
    xKey: "date",
    yKey: "value",
    title: "Daily Active Users",
    height: 300,
  },
};

export const Smooth: Story = {
  args: {
    data: sampleData,
    xKey: "date",
    yKey: "value",
    title: "Smooth Line",
    smooth: true,
    height: 300,
  },
};

export const AreaChart: Story = {
  args: {
    data: sampleData,
    xKey: "date",
    yKey: "value",
    title: "Area Chart",
    area: true,
    height: 300,
  },
};

export const SmoothArea: Story = {
  args: {
    data: sampleData,
    xKey: "date",
    yKey: "value",
    title: "Smooth Area Chart",
    smooth: true,
    area: true,
    height: 300,
  },
};

export const WithoutPoints: Story = {
  args: {
    data: sampleData,
    xKey: "date",
    yKey: "value",
    title: "Line Without Points",
    showPoints: false,
    height: 300,
  },
};

export const LongTimeSeries: Story = {
  args: {
    data: Array.from({ length: 30 }, (_, i) => ({
      day: `Day ${i + 1}`,
      visitors: Math.floor(Math.random() * 500) + 200,
    })),
    xKey: "day",
    yKey: "visitors",
    title: "Monthly Visitors",
    smooth: true,
    height: 400,
  },
};
