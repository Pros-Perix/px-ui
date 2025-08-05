import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "../../src/components/radio-group";
import { Label } from "../../src/components/label";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: "Components/radio-group",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof RadioGroup> = {
  render: () => <RadioGroupDemo />,
};

function RadioGroupDemo() {
  return (
    <RadioGroup>
      <Label>
        <RadioGroupItem value="basic" size="sm" />
        Basic
      </Label>

      <Label>
        <RadioGroupItem value="standard" />
        Standard
      </Label>

      <Label>
        <RadioGroupItem value="premium" size="lg" />
        Premium
      </Label>
    </RadioGroup>
  );
}
