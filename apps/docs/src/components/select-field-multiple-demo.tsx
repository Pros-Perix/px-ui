import { SelectField } from "@px-ui/forms";
import { useState } from "react";

export default function SelectFieldMultipleDemo() {
  const [value, setValue] = useState<string[]>([]);

  const items = [
    { id: "react", label: "React" },
    { id: "vue", label: "Vue" },
    { id: "angular", label: "Angular" },
    { id: "svelte", label: "Svelte" },
    { id: "solid", label: "Solid" },
  ];

  return (
    <div className="w-full max-w-xs">
      <SelectField
        items={items}
        value={value}
        onValueChange={setValue}
        multiple
        placeholder="Select frameworks"
      />
    </div>
  );
}
