import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SelectField } from "../../src/components/select-field";

const meta: Meta<typeof SelectField> = {
  component: SelectField,
  title: "Forms/SelectField",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SelectField>;

// Data
const fonts = [
  { label: "Sans-serif", value: "sans" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "mono" },
  { label: "Cursive", value: "cursive" },
];

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  { id: 4, name: "Alice Williams", email: "alice@example.com" },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com" },
];

// Stories
export const Default: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<
      (typeof fonts)[number] | undefined
    >(undefined);

    return (
      <div className="w-80">
        <SelectField
          items={fonts}
          value={selected}
          onValueChange={setSelected}
          placeholder="Select a font"
        />
      </div>
    );
  },
};

export const WithAutoDetection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<
      (typeof fonts)[number] | undefined
    >(undefined);

    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">
          Font Family (auto-detects label)
        </label>
        <SelectField
          items={fonts}
          value={selected}
          onValueChange={setSelected}
          placeholder="Select a font"
        />
      </div>
    );
  },
};

export const WithCustomRendering: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<User | undefined>(undefined);

    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">Select User</label>
        <SelectField
          items={users}
          value={selected}
          onValueChange={setSelected}
          renderLabel={(user) => user.name}
          renderOption={(user) => (
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-ppx-muted-foreground">
                {user.email}
              </div>
            </div>
          )}
          isItemEqualToValue={(a, b) => a.id === b.id}
          placeholder="Select a user"
        />
      </div>
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<User[]>([]);

    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">
          Select Multiple Users
        </label>
        <SelectField
          items={users}
          value={selected}
          onValueChange={setSelected}
          multiple
          renderLabel={(user) => user.name}
          renderOption={(user) => user.name}
          isItemEqualToValue={(a, b) => a.id === b.id}
          placeholder="Select users"
        />
        <div className="mt-2 text-sm text-ppx-muted-foreground">
          Selected: {selected.length} user(s)
        </div>
      </div>
    );
  },
};

export const SmallSize: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<
      (typeof fonts)[number] | undefined
    >(undefined);

    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">Small Select</label>
        <SelectField
          items={fonts}
          // value={selected}
          // onValueChange={setSelected}
          size="sm"
          placeholder="Select a font"
        />
      </div>
    );
  },
};

export const FullWidth: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<
      (typeof fonts)[number] | undefined
    >(undefined);

    return (
      <div className="max-w-2xl w-full">
        <label className="text-sm font-medium mb-2 block">
          Full Width Select
        </label>
        <SelectField
          items={fonts}
          value={selected}
          onValueChange={setSelected}
          widthVariant="full"
          placeholder="Select a font"
        />
      </div>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<
      (typeof fonts)[number] | undefined
    >(undefined);

    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">Required Field</label>
        <SelectField
          items={fonts}
          value={selected}
          onValueChange={setSelected}
          invalid={!selected}
          placeholder="Select a font (required)"
        />
        {!selected && (
          <p className="mt-1 text-sm text-red-600">This field is required</p>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">
          Disabled Select
        </label>
        <SelectField
          items={fonts}
          value={fonts[0]}
          disabled
          placeholder="Select a font"
        />
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => {
    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">
          Uncontrolled Select
        </label>
        <SelectField
          items={fonts}
          placeholder="Select a font"
          name="font-select"
        />
      </div>
    );
  },
};
