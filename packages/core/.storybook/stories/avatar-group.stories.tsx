import type { Meta, StoryObj } from "@storybook/react";
import { AvatarGroup } from "../../src/components/avatar-group";

const meta: Meta<typeof AvatarGroup> = {
  component: AvatarGroup,
  title: "Components/AvatarGroup",
  tags: ["autodocs"],
  argTypes: {
    max: {
      control: { type: "number", min: 1, max: 10, step: 1 },
      description:
        "Maximum number of avatars to display before showing overflow",
    },
    avatars: {
      control: { type: "object" },
      description: "Array of avatar props",
    },
  },
};

export default meta;

// Sample user data for stories
const sampleUsers = [
  {
    id: "1",
    name: "John Doe",
    imgSrc: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Jane Smith",
    imgSrc: "https://avatars.githubusercontent.com/u/124599?v=4",
  },
  {
    id: "3",
    name: "Bob Johnson",
    imgSrc: "https://avatars.githubusercontent.com/u/1?v=4",
  },
  {
    id: "4",
    name: "Alice Wilson",
    imgSrc: "https://avatars.githubusercontent.com/u/2?v=4",
  },
  {
    id: "5",
    name: "Charlie Brown",
    imgSrc: "https://avatars.githubusercontent.com/u/3?v=4",
  },
  {
    id: "6",
    name: "Diana Prince",
    imgSrc: "https://avatars.githubusercontent.com/u/4?v=4",
  },
  {
    id: "7",
    name: "Ethan Hunt",
    imgSrc: "https://avatars.githubusercontent.com/u/5?v=4",
  },
  {
    id: "8",
    name: "Fiona Green",
    imgSrc: "https://avatars.githubusercontent.com/u/6?v=4",
  },
  {
    id: "9",
    name: "George Lucas",
    imgSrc: "https://avatars.githubusercontent.com/u/7?v=4",
  },
  {
    id: "10",
    name: "Hannah Montana",
    imgSrc: "https://avatars.githubusercontent.com/u/8?v=4",
  },
];

const usersWithoutImages = [
  { id: "1", name: "John Doe", imgSrc: "https://github.com/shadcn.png" },
  { id: "2", name: "Jane Smith", imgSrc: "https://github.com/shadcn.png" },
  { id: "3", name: "Bob Johnson", imgSrc: "https://github.com/shadcn.png" },
  { id: "4", name: "Alice Wilson", imgSrc: "https://github.com/shadcn.png" },
  { id: "5", name: "Charlie Brown", imgSrc: "https://github.com/shadcn.png" },
  { id: "6", name: "Diana Prince", imgSrc: "https://github.com/shadcn.png" },
  { id: "7", name: "Ethan Hunt", imgSrc: "https://github.com/shadcn.png" },
];

export const Default: StoryObj<typeof AvatarGroup> = {
  args: {
    avatars: sampleUsers.slice(0, 6).map((user) => ({
      name: user.name,
      imgSrc: user.imgSrc,
      variant: "rounded",
    })),
    max: 4,
  },
};

export const WithOverflow: StoryObj<typeof AvatarGroup> = {
  args: {
    avatars: sampleUsers.map((user) => ({
      name: user.name,
      imgSrc: user.imgSrc,
    })),
    max: 3,
  },
};

export const LargeGroup: StoryObj<typeof AvatarGroup> = {
  args: {
    avatars: sampleUsers.map((user) => ({
      name: user.name,
      imgSrc: user.imgSrc,
    })),
    max: 5,
  },
};

export const SmallAvatars: StoryObj<typeof AvatarGroup> = {
  args: {
    avatars: sampleUsers.slice(0, 8).map((user) => ({
      name: user.name,
      imgSrc: user.imgSrc,
    })),
    max: 6,
  },
};

export const LargeAvatars: StoryObj<typeof AvatarGroup> = {
  args: {
    avatars: sampleUsers.slice(0, 5).map((user) => ({
      name: user.name,
      imgSrc: user.imgSrc,
    })),
    max: 3,
  },
};

export const NoImages: StoryObj<typeof AvatarGroup> = {
  args: {
    avatars: usersWithoutImages.map((user) => ({
      name: user.name,
      variant: "rounded",
    })),
    max: 4,
  },
};

export const NoOverflow: StoryObj<typeof AvatarGroup> = {
  args: {
    avatars: sampleUsers.slice(0, 3).map((user) => ({
      name: user.name,
      imgSrc: user.imgSrc,
    })),
    max: 5,
  },
};

export const SingleUser: StoryObj<typeof AvatarGroup> = {
  args: {
    avatars: [sampleUsers[0]].map((user) => ({
      name: user.name,
      imgSrc: user.imgSrc,
    })),
    max: 4,
  },
};

export const ManyUsers: StoryObj<typeof AvatarGroup> = {
  args: {
    avatars: sampleUsers.map((user) => ({
      name: user.name,
      imgSrc: user.imgSrc,
    })),
    max: 4,
  },
};
