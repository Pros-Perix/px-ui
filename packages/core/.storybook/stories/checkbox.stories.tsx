import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../../src/components/checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Components/checkbox",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Checkbox> = {
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "primary"],
    },
  },
};
