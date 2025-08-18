import type { Meta, StoryObj } from "@storybook/react";
import { Button, Variant, Size } from "../../src/components/button";

const variants: Variant[] = [
  "default",
  "primary",
  "confirmative",
  "outline",
  "ghost",
  "link",
  "destructive",
];

const sizes: Size[] = ["default", "sm", "lg", "icon"];

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    size: {
      control: "select",
      options: sizes,
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Button> = {
  args: {
    children: "Save changes",
  },
};
