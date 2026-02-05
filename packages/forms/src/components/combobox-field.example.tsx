/**
 * Example usage of ComboboxField component demonstrating type inference
 */
import * as React from "react";
import { ComboboxField } from "./combobox-field";

// Example 1: Simple searchable combobox
const posts = [
  { label: "Understanding React Hooks", value: "post-1" },
  { label: "Getting Started with TypeScript", value: "post-2" },
  { label: "CSS Grid Layout Tutorial", value: "post-3" },
] as const;

export function SimpleComboboxExample() {
  const [selected, setSelected] = React.useState<
    (typeof posts)[number] | null
  >(null);

  return (
    <ComboboxField<(typeof posts)[number]>
      items={posts}
      value={selected}
      // ✅ Type inference: value is inferred as { label: string, value: string } | undefined
      onValueChange={(value) => {
        console.log(value?.label); // TypeScript knows about .label
        console.log(value?.value); // TypeScript knows about .value
        setSelected(value);
      }}
      placeholder="Search posts..."
    />
  );
}

// Example 2: Custom objects with type inference
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

export function CustomObjectExample() {
  const [selected, setSelected] = React.useState<User | null>(null);

  return (
    <ComboboxField
      items={users}
      value={selected}
      // ✅ Type inference: user is inferred as User | undefined
      onValueChange={(user) => {
        console.log(user?.name); // TypeScript knows about .name
        console.log(user?.email); // TypeScript knows about .email
        setSelected(user);
      }}
      // ✅ Type inference: user parameter is inferred as User
      renderLabel={(user) => user.name}
      renderOption={(user) => (
        <div>
          <div>{user.name}</div>
          <div className="text-sm">{user.email}</div>
        </div>
      )}
      isItemEqualToValue={(a, b) => a.id === b.id}
      placeholder="Search users..."
    />
  );
}

// Example 3: Multiple selection with chips
export function MultiSelectExample() {
  const [selected, setSelected] = React.useState<User[]>([]);

  return (
    <ComboboxField
      items={users}
      value={selected}
      multiple
      // ✅ Type inference: selectedUsers is inferred as User[]
      onValueChange={(selectedUsers) => {
        console.log(selectedUsers.length); // TypeScript knows it's an array
        selectedUsers.forEach((user) => {
          console.log(user.name); // TypeScript knows about .name
        });
        setSelected(selectedUsers);
      }}
      // ✅ Type inference: renderLabel receives User[] for multiple
      renderLabel={(users) => `${users.length} selected`}
      renderOption={(user) => user.name}
      renderChip={(user) => user.name}
      isItemEqualToValue={(a, b) => a.id === b.id}
      placeholder="Search and select users..."
    />
  );
}

// Example 4: With search in popup
export function SearchInPopupExample() {
  const [selected, setSelected] = React.useState<
    (typeof posts)[number] | null
  >(null);

  return (
    <ComboboxField<(typeof posts)[number]>
      items={posts}
      value={selected}
      onValueChange={setSelected}
      searchInPopup
      placeholder="Select post"
    />
  );
}

// Example 5: Size and width variants
export function StyledComboboxExample() {
  const [selected, setSelected] = React.useState<
    (typeof posts)[number] | null
  >(null);

  return (
    <ComboboxField<(typeof posts)[number]>
      items={posts}
      value={selected}
      onValueChange={setSelected}
      size="sm"
      widthVariant="full"
      contentWidthVariant="fit"
      placeholder="Search posts..."
    />
  );
}

// Example 6: Invalid/error state
export function InvalidExample() {
  const [selected, setSelected] = React.useState<User | null>(null);

  return (
    <div>
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
      {!selected && <p>This field is required</p>}
    </div>
  );
}

// Example 7: Disabled state
export function DisabledExample() {
  return (
    <ComboboxField
      items={posts}
      value={posts[0]}
      disabled
      placeholder="Search posts..."
    />
  );
}
