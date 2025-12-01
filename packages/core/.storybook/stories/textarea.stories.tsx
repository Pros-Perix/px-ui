import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../../src/components/textarea";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: "Components/textarea",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Textarea> = {
  args: {
    placeholder: "Enter your email",
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    invalid: {
      control: "boolean",
    },
  },
};
