import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../../src/components/input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Components/Input",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "The size of the input",
    },
    widthVariant: {
      control: "select",
      options: ["enforced", "full"],
      description: "Width behavior of the input",
    },
    invalid: {
      control: "boolean",
      description: "Whether the input is in an invalid state",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
      description: "The type of input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Hello World",
    placeholder: "Enter text...",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Small input",
  },
};

export const FullWidth: Story = {
  args: {
    widthVariant: "full",
    placeholder: "Full width input",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const DisabledWithValue: Story = {
  args: {
    disabled: true,
    defaultValue: "Disabled with value",
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    placeholder: "Invalid input",
  },
};

export const InvalidWithValue: Story = {
  args: {
    invalid: true,
    defaultValue: "invalid@example",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter email address",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter number",
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

export const Telephone: Story = {
  args: {
    type: "tel",
    placeholder: "+1 (555) 000-0000",
  },
};

export const URL: Story = {
  args: {
    type: "url",
    placeholder: "https://example.com",
  },
};

export const SmallFullWidth: Story = {
  args: {
    size: "sm",
    widthVariant: "full",
    placeholder: "Small + Full width",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input placeholder="Default state" />
      <Input placeholder="With value" defaultValue="Sample text" />
      <Input placeholder="Small size" size="sm" />
      <Input placeholder="Disabled" disabled />
      <Input placeholder="Invalid" invalid />
      <Input placeholder="Invalid with value" invalid defaultValue="error@test" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
    </div>
  ),
};
