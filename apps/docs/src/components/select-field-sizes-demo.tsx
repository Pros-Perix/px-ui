import { SelectField } from "@px-ui/forms";
import { useState } from "react";

export default function SelectFieldSizesDemo() {
  const [smallValue, setSmallValue] = useState<string | null>(null);
  const [mediumValue, setMediumValue] = useState<string | null>(null);
  const [largeValue, setLargeValue] = useState<string | null>(null);

  const items = [
    { id: "sm", label: "Small" },
    { id: "md", label: "Medium" },
    { id: "lg", label: "Large" },
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
        value={mediumValue}
        onValueChange={setMediumValue}
        placeholder="Medium size (default)"
        size="md"
      />
      <SelectField
        items={items}
        value={largeValue}
        onValueChange={setLargeValue}
        placeholder="Large size"
        size="lg"
      />
    </div>
  );
}
