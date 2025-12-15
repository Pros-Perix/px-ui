import { Combobox } from "@px-ui/core";
import { useState } from "react";

const users = [
  { value: "1", label: "John Doe" },
  { value: "2", label: "Jane Smith" },
  { value: "3", label: "Bob Johnson" },
  { value: "4", label: "Alice Williams" },
  { value: "5", label: "Charlie Brown" },
];

export function ComboboxWithSearchDemo() {
  const [value, setValue] = useState<any>(null);

  return (
    <Combobox.Root value={value} onValueChange={setValue}>
      <Combobox.Trigger>
        <Combobox.Value placeholder="Select a user" />
      </Combobox.Trigger>
      <Combobox.Content>
        <Combobox.Search placeholder="Search users..." />
        <Combobox.List>
          {users.map((user) => (
            <Combobox.Item key={user.value} value={user}>
              {user.label}
            </Combobox.Item>
          ))}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}
