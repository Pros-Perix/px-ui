import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../../src/components/avatar";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Components/Avatar",
  tags: ["autodocs"],
};

export default meta;

export const ClientAvatar: StoryObj<typeof Avatar> = {
  args: {
    imgSrc: "https://github.com/shadcn.png",
    name: "Acme Inc",
    size: "40px",
  },
};

export const UserAvatar: StoryObj<typeof Avatar> = {
  args: {
    imgSrc: "https://github.com/shadcn.png",
    name: "John Doe",
    size: "40px",
    variant: "rounded",
  },
};

export const NameOnlyAvatar: StoryObj<typeof Avatar> = {
  args: {
    name: "John Doe",
    size: "40px",
    variant: "rounded",
  },
};

export const CustomSizeAvatar: StoryObj<typeof Avatar> = {
  args: {
    imgSrc: "https://github.com/shadcn.png",
    name: "John Doe",
    size: "60px",
    variant: "rounded",
  },
};
