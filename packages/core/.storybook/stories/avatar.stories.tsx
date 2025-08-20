import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../../src/components/avatar";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Components/Avatar",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Avatar> = {
  args: {
    imgSrc: "https://github.com/shadcn.png",
    name: "John Doe",
    size: "40px",
    // variant: "rounded",
    // hideTooltip: true,
  },
};
