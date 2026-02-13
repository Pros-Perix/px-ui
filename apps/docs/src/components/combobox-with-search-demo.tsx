import { Combobox } from "@px-ui/core";
import { useState } from "react";

interface User {
  value: string;
  label: string;
}

const users: User[] = [
  { value: "1", label: "John Doe" },
  { value: "2", label: "Jane Smith" },
  { value: "3", label: "Bob Johnson" },
  { value: "4", label: "Alice Williams" },
  { value: "5", label: "Charlie Brown" },
];

export function ComboboxWithSearchDemo() {
  const [value, setValue] = useState<User | null>(null);

  return (
    <Combobox.Root
      items={users}
      value={value}
      onValueChange={setValue}
      isItemEqualToValue={(item, selected) => item.value === selected.value}
      itemToStringLabel={(item) => item.label}
    >
      <Combobox.Trigger>
        <Combobox.Value placeholder="Select a user" />
      </Combobox.Trigger>
      <Combobox.Content>
        <Combobox.Search placeholder="Search users..." />
        <Combobox.List>
          {(user: User) => (
            <Combobox.Item key={user.value} value={user}>
              {user.label}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}
