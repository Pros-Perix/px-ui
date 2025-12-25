import { ComboboxField } from "@px-ui/forms";
import { useState } from "react";

export default function ComboboxFieldBasicDemo() {
  const [value, setValue] = useState<string | null>(null);

  const items = [
    { id: "apple", label: "Apple" },
    { id: "banana", label: "Banana" },
    { id: "orange", label: "Orange" },
    { id: "mango", label: "Mango" },
    { id: "grape", label: "Grape" },
    { id: "strawberry", label: "Strawberry" },
    { id: "watermelon", label: "Watermelon" },
    { id: "pineapple", label: "Pineapple" },
  ];

  return (
    <div className="w-full max-w-xs">
      <ComboboxField
        items={items}
        value={value}
        onValueChange={setValue}
        renderOption={(opt) => opt}
        renderLabel={(opt) => opt}
        placeholder="Search for a fruit..."
      />
    </div>
  );
}
