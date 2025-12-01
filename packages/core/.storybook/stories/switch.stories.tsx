import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../../src/components/switch";

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: "Components/switch",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Switch> = {};
