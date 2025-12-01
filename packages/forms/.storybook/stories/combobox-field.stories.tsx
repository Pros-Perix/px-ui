import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ComboboxField } from "../../src/components/combobox-field";
import { defineLoadOptions, type InferOption } from "@px-ui/core";
import { QueryClient, QueryClientContext } from "@tanstack/react-query";

const meta: Meta<typeof ComboboxField> = {
  component: ComboboxField,
  title: "Forms/ComboboxField",
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => {
      const [queryClient] = React.useState(() => new QueryClient());

      return (
        <QueryClientContext.Provider value={queryClient}>
          <Story />
        </QueryClientContext.Provider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof ComboboxField>;

// Data
const posts = [
  { label: "Understanding React Hooks", value: "post-1" },
  { label: "Getting Started with TypeScript", value: "post-2" },
  { label: "CSS Grid Layout Tutorial", value: "post-3" },
  { label: "JavaScript ES6 Features", value: "post-4" },
  { label: "Building REST APIs with Node.js", value: "post-5" },
  { label: "React Performance Optimization", value: "post-6" },
  { label: "Introduction to GraphQL", value: "post-7" },
  { label: "State Management with Redux", value: "post-8" },
  { label: "Web Accessibility Guidelines", value: "post-9" },
  { label: "Testing React Applications", value: "post-10" },
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
  { id: 6, name: "Diana Prince", email: "diana@example.com" },
  { id: 7, name: "Ethan Hunt", email: "ethan@example.com" },
  { id: 8, name: "Fiona Green", email: "fiona@example.com" },
];

// Stories
export const Default: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<
      (typeof posts)[number] | undefined
    >(undefined);

    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">
          Select a post (searchable)
        </label>
        <ComboboxField
          items={posts}
          value={selected}
          onValueChange={setSelected}
          placeholder="Search posts..."
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
        <label className="text-sm font-medium mb-2 block">
          Select User (custom rendering)
        </label>
        <ComboboxField
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
          placeholder="Search users..."
        />
        {selected && (
          <div className="mt-2 text-sm text-ppx-muted-foreground">
            Selected: {selected.name}
          </div>
        )}
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
          Select Multiple Users (chips)
        </label>
        <ComboboxField
          items={users}
          value={selected}
          onValueChange={setSelected}
          multiple
          renderLabel={(users) => `${users.length} users selected`}
          renderOption={(user) => user.name}
          renderChip={(user) => user.name}
          isItemEqualToValue={(a, b) => a.id === b.id}
          placeholder="Search and select users..."
        />
        <div className="mt-2 text-sm text-ppx-muted-foreground">
          Selected: {selected.length} user(s)
        </div>
      </div>
    );
  },
};

export const WithSearchInPopup: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<
      (typeof posts)[number] | undefined
    >(undefined);

    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">
          Regular Trigger with Search in Popup (Single)
        </label>
        <ComboboxField
          items={posts}
          value={selected}
          onValueChange={setSelected}
          searchInPopup
          placeholder="Select post"
        />
        <div className="mt-2 text-sm text-ppx-muted-foreground">
          Uses regular Trigger (button-like) with search inside popup
        </div>
      </div>
    );
  },
};

export const WithSearchInPopupMultiple: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<User[]>([]);

    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">
          Regular Trigger with Search in Popup (Multiple - Default)
        </label>
        <ComboboxField
          items={users}
          value={selected}
          onValueChange={setSelected}
          multiple
          searchInPopup
          renderOption={(user) => user.name}
          isItemEqualToValue={(a, b) => a.id === b.id}
          placeholder="Select users"
        />
        <div className="mt-2 text-sm text-ppx-muted-foreground">
          Default: Shows "{selected.length} selected" in trigger
        </div>
      </div>
    );
  },
};

export const WithSearchInPopupMultipleCustom: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<User[]>([]);

    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">
          Regular Trigger with Search in Popup (Multiple - Custom Render)
        </label>
        <ComboboxField
          items={users}
          value={selected}
          onValueChange={setSelected}
          multiple
          searchInPopup
          renderLabel={(users) => (
            <div className="gap-2 flex items-center">
              <span className="font-medium">{users.length} users:</span>
              <span className="truncate">
                {users.map((u) => u.name).join(", ")}
              </span>
            </div>
          )}
          renderOption={(user) => user.name}
          isItemEqualToValue={(a, b) => a.id === b.id}
          placeholder="Select users"
        />
        <div className="mt-2 text-sm text-ppx-muted-foreground">
          Custom: Shows "X users: Name1, Name2, ..."
        </div>
      </div>
    );
  },
};

export const SmallSize: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<
      (typeof posts)[number] | undefined
    >(undefined);

    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">Small Size</label>
        <ComboboxField
          items={posts}
          value={selected}
          onValueChange={setSelected}
          size="sm"
          placeholder="Search posts..."
        />
      </div>
    );
  },
};

export const FullWidth: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<
      (typeof posts)[number] | undefined
    >(undefined);

    return (
      <div className="max-w-2xl w-full">
        <label className="text-sm font-medium mb-2 block">Full Width</label>
        <ComboboxField
          items={posts}
          value={selected}
          onValueChange={setSelected}
          widthVariant="full"
          placeholder="Search posts..."
        />
      </div>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<User | undefined>(undefined);

    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">Required Field</label>
        <ComboboxField
          items={users}
          value={selected}
          onValueChange={setSelected}
          invalid={!selected}
          renderLabel={(user) => user.name}
          renderOption={(user) => user.name}
          isItemEqualToValue={(a, b) => a.id === b.id}
          placeholder="Search users... (required)"
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
          Disabled Combobox
        </label>
        <ComboboxField
          items={posts}
          value={posts[0]}
          disabled
          placeholder="Search posts..."
        />
      </div>
    );
  },
};

// Async loading example
const loadUserOptions = defineLoadOptions({
  cacheKey: ["users"],
  loader: async ({ page, search }) => {
    const perPage = 20;
    await new Promise((resolve) => setTimeout(resolve, 300));
    const res = await fetch(
      `https://dummyjson.com/users${search ? "/search" : ""}?limit=${perPage}&skip=${(page - 1) * perPage}${search ? `&q=${search}` : ""}`,
    );
    const data = (await res.json()) as {
      users: Array<{
        id: number;
        firstName: string;
        lastName: string;
        image: string;
        email: string;
      }>;
      total: number;
    };

    return {
      data: {
        options: data.users,
        hasMore: data.total > page * perPage,
      },
      error: null,
    };
  },
});

export const AsyncLoading: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<
      InferOption<typeof loadUserOptions> | undefined
    >(undefined);

    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">
          Async Loading (type to search)
        </label>
        <ComboboxField
          loadOptions={loadUserOptions}
          value={selected}
          onValueChange={setSelected}
          renderLabel={(user) => `${user.firstName} ${user.lastName}`}
          renderOption={(user) => (
            <div className="gap-2 flex items-center">
              <img
                src={user.image}
                alt={user.firstName}
                className="w-6 h-6 rounded-full"
              />
              <div>
                <div className="font-medium">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-sm text-ppx-muted-foreground">
                  {user.email}
                </div>
              </div>
            </div>
          )}
          isItemEqualToValue={(a, b) => a.id === b.id}
          placeholder="Search users..."
        />
        {selected && (
          <div className="mt-2 text-sm text-ppx-muted-foreground">
            Selected: {selected.firstName} {selected.lastName}
          </div>
        )}
      </div>
    );
  },
};

export const AsyncLoadingMultiple: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<
      Array<InferOption<typeof loadUserOptions>>
    >([]);

    return (
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">
          Async Loading Multiple (with chips)
        </label>
        <ComboboxField
          loadOptions={loadUserOptions}
          value={selected}
          onValueChange={setSelected}
          multiple
          renderLabel={(users) => `${users.length} users selected`}
          renderOption={(user) => (
            <div className="gap-2 flex items-center">
              <img
                src={user.image}
                alt={user.firstName}
                className="w-6 h-6 rounded-full"
              />
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
          )}
          renderChip={(user) => (
            <>
              <img
                src={user.image}
                alt={user.firstName}
                className="w-4 h-4 rounded-full"
              />
              <span>
                {user.firstName} {user.lastName}
              </span>
            </>
          )}
          isItemEqualToValue={(a, b) => a.id === b.id}
          placeholder="Search and select users..."
        />
        <div className="mt-2 text-sm text-ppx-muted-foreground">
          Selected: {selected.length} user(s)
        </div>
      </div>
    );
  },
};
