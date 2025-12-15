import { SelectField } from "@px-ui/forms";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function SelectFieldCustomRenderDemo() {
  const [value, setValue] = useState<User | null>(null);

  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor" },
  ];

  return (
    <div className="w-full max-w-sm">
      <SelectField
        items={users}
        value={value}
        onValueChange={setValue}
        placeholder="Select a user"
        renderLabel={(user) => user.name}
        renderOption={(user) => (
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-sm text-gray-11">{user.email}</span>
          </div>
        )}
      />
    </div>
  );
}
