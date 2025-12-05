import type { Meta, StoryObj } from "@storybook/react";
import { PieChart } from "../../src/components/pie-chart";

const meta: Meta<typeof PieChart> = {
  title: "Charts/PieChart",
  component: PieChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PieChart>;

const sampleData = [
  { category: "Direct", amount: 335 },
  { category: "Email", amount: 310 },
  { category: "Affiliate", amount: 234 },
  { category: "Search", amount: 135 },
  { category: "Video", amount: 1548 },
];

export const Default: Story = {
  args: {
    data: sampleData,
    nameKey: "category",
    valueKey: "amount",
    height: 400,
  },
};

export const WithTitle: Story = {
  args: {
    data: sampleData,
    nameKey: "category",
    valueKey: "amount",
    title: "Traffic Sources",
    height: 400,
  },
};

export const DonutChart: Story = {
  args: {
    data: sampleData,
    nameKey: "category",
    valueKey: "amount",
    title: "Traffic Sources (Donut)",
    donut: true,
    height: 400,
  },
};

export const WithoutLegend: Story = {
  args: {
    data: sampleData,
    nameKey: "category",
    valueKey: "amount",
    title: "Traffic Sources",
    showLegend: false,
    height: 400,
  },
};

export const SmallDataset: Story = {
  args: {
    data: [
      { status: "Active", count: 150 },
      { status: "Inactive", count: 50 },
    ],
    nameKey: "status",
    valueKey: "count",
    title: "User Status",
    height: 300,
  },
};
