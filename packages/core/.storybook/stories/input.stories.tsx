import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../../src/components/input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Components/input",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Input> = {
  argTypes: {
    disabled: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["default", "sm"],
    },
    invalid: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
};
