/**
 * Type inference test for SelectField
 * This file demonstrates that type inference works correctly
 */
import * as React from "react";
import { SelectField } from "./select-field";

// Test 1: Inference from items with label/value structure
const fonts = [
  { label: "Sans-serif", value: "sans" },
  { label: "Serif", value: "serif" },
] as const;

function Test1() {
  const [selected, setSelected] = React.useState<
    (typeof fonts)[number] | undefined
  >(undefined);

  return (
    <SelectField
      items={fonts}
      value={selected}
      // ✅ onValueChange correctly infers:
      // (value: { label: string, value: string } | undefined) => void
      // NOT (value: string | undefined) => void
      onValueChange={(value) => {
        // @ts-expect-error - should error because value is NOT a string
        const x: string = value;

        // ✅ should work - value is the full object
        const y: { label: string; value: string } | undefined = value;

        console.log(value?.label); // ✅ TypeScript knows about .label
        console.log(value?.value); // ✅ TypeScript knows about .value
      }}
    />
  );
}

// Test 2: Inference from custom objects
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "John", email: "john@example.com" },
];

function Test2() {
  const [selected, setSelected] = React.useState<User | undefined>(undefined);

  return (
    <SelectField
      items={users}
      value={selected}
      // ✅ onValueChange correctly infers: (value: User | undefined) => void
      onValueChange={(value) => {
        // @ts-expect-error - should error because value is NOT a string
        const x: string = value;

        // ✅ should work - value is User
        const y: User | undefined = value;

        console.log(value?.id); // ✅ TypeScript knows about .id
        console.log(value?.name); // ✅ TypeScript knows about .name
        console.log(value?.email); // ✅ TypeScript knows about .email
      }}
      // ✅ renderLabel correctly infers: (item: User) => ReactNode
      renderLabel={(user) => {
        // @ts-expect-error - should error because user is NOT a string
        const x: string = user;

        // ✅ should work - user is User
        const y: User = user;

        return user.name; // ✅ TypeScript knows about .name
      }}
    />
  );
}

// Test 3: Multiple selection inference
function Test3() {
  const [selected, setSelected] = React.useState<User[]>([]);

  return (
    <SelectField
      items={users}
      value={selected}
      multiple
      // ✅ onValueChange correctly infers: (value: User[]) => void
      onValueChange={(value) => {
        // @ts-expect-error - should error because value is NOT User | undefined
        const x: User | undefined = value;

        // ✅ should work - value is User[]
        const y: User[] = value;

        console.log(value.length); // ✅ TypeScript knows it's an array
        value.forEach((user) => {
          console.log(user.name); // ✅ TypeScript knows user is User
        });
      }}
    />
  );
}

export { Test1, Test2, Test3 };
