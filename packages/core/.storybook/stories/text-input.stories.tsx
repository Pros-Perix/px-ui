import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "../../src/components/text-input";

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: "Components/text-input",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof TextInput> = {
  args: {
    placeholder: "Enter your email",
    inputContainerClassName: "w-[300px]!",
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
};
