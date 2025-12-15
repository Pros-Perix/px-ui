import { ComboboxField } from "@px-ui/forms";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

// Simulated API call
const searchUsers = async (query: string): Promise<User[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const allUsers: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
    { id: 4, name: "Alice Brown", email: "alice@example.com" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com" },
    { id: 6, name: "Diana Davis", email: "diana@example.com" },
  ];

  if (!query) return allUsers;

  return allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()),
  );
};

export default function ComboboxFieldAsyncDemo() {
  const [value, setValue] = useState<User | null>(null);

  return (
    <div className="w-full max-w-sm">
      <ComboboxField
        loadOptions={searchUsers}
        value={value}
        onValueChange={setValue}
        placeholder="Search users..."
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
