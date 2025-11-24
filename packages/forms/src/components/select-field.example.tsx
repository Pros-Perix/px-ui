/**
 * Example usage of SelectField component demonstrating type inference
 */
import * as React from "react";
import { SelectField } from "./select-field";

// Example 1: Simple array of objects with label/value
const fonts = [
  { label: "Sans-serif", value: "sans" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "mono" },
] as const;

export function SimpleSelectExample() {
  const [selected, setSelected] = React.useState<
    (typeof fonts)[number] | undefined
  >(undefined);

  return (
    <SelectField
      items={fonts}
      value={selected}
      // ✅ Type inference: option is inferred as { label: string, value: string }
      onValueChange={(option) => {
        console.log(option?.label); // TypeScript knows about .label
        console.log(option?.value); // TypeScript knows about .value
        setSelected(option);
      }}
      placeholder="Select a font"
    />
  );
}

// Example 2: Custom objects with renderLabel and renderOption
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", avatar: "avatar1.jpg" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", avatar: "avatar2.jpg" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", avatar: "avatar3.jpg" },
];

export function CustomObjectExample() {
  const [selected, setSelected] = React.useState<User | undefined>(undefined);

  return (
    <SelectField
      items={users}
      value={selected}
      // ✅ Type inference: user is inferred as User
      onValueChange={(user) => {
        console.log(user?.name); // TypeScript knows about .name
        console.log(user?.email); // TypeScript knows about .email
        setSelected(user);
      }}
      // ✅ Type inference: user parameter is inferred as User
      renderLabel={(user) => user.name}
      renderOption={(user) => (
        <div className="flex items-center gap-2">
          <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
          <div>
            <div>{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      )}
      isItemEqualToValue={(a, b) => a.id === b.id}
      placeholder="Select a user"
    />
  );
}

// Example 3: Multiple selection
export function MultiSelectExample() {
  const [selected, setSelected] = React.useState<User[]>([]);

  return (
    <SelectField
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
      renderLabel={(user) => user.name}
      renderOption={(user) => user.name}
      isItemEqualToValue={(a, b) => a.id === b.id}
      placeholder="Select users"
    />
  );
}

// Example 4: Auto-detection of label property
const simpleItems = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
];

export function AutoLabelExample() {
  const [selected, setSelected] = React.useState<
    (typeof simpleItems)[number] | undefined
  >(undefined);

  return (
    <SelectField
      items={simpleItems}
      value={selected}
      onValueChange={setSelected}
      placeholder="Select an option"
      // No renderLabel or renderOption needed - will use .label automatically
    />
  );
}

// Example 5: With size and width variants
export function StyledSelectExample() {
  const [selected, setSelected] = React.useState<
    (typeof fonts)[number] | undefined
  >(undefined);

  return (
    <SelectField
      items={fonts}
      value={selected}
      onValueChange={setSelected}
      placeholder="Select a font"
      size="sm"
      widthVariant="full"
      contentWidthVariant="fit"
      invalid={false}
    />
  );
}
