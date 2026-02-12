import { SelectField } from "@px-ui/forms";
import { useState } from "react";

export default function SelectFieldSizesDemo() {
  const [smallValue, setSmallValue] = useState<string | null>(null);
  const [defaultValue, setDefaultValue] = useState<string | null>(null);

  const items = [
    { id: "option1", label: "Option 1" },
    { id: "option2", label: "Option 2" },
    { id: "option3", label: "Option 3" },
  ];

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <SelectField
        items={items}
        value={smallValue}
        onValueChange={setSmallValue}
        placeholder="Small size"
        size="sm"
      />
      <SelectField
        items={items}
        value={defaultValue}
        onValueChange={setDefaultValue}
        placeholder="Default size"
        size="default"
      />
    </div>
  );
}
