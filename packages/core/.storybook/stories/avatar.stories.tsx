import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../src/components/avatar";
import * as React from "react";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Components/avatar",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Avatar> = {
  args: {
    children: (
      <>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </>
    ),
  },
};
