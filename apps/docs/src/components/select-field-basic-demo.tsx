import { SelectField } from "@px-ui/forms";
import { useState } from "react";

export default function SelectFieldBasicDemo() {
  const [value, setValue] = useState<string | null>(null);

  const items = [
    { id: "apple", label: "Apple" },
    { id: "banana", label: "Banana" },
    { id: "orange", label: "Orange" },
    { id: "mango", label: "Mango" },
    { id: "grape", label: "Grape" },
  ];

  return (
    <div className="w-full max-w-xs">
      <SelectField
        items={items}
        value={value}
        onValueChange={setValue}
        placeholder="Select a fruit"
      />
    </div>
  );
}
