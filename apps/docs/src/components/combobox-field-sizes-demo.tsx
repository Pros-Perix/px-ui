import { ComboboxField } from "@px-ui/forms";
import { useState } from "react";

interface Size {
  id: string;
  label: string;
}

export default function ComboboxFieldSizesDemo() {
  const [defaultValue, setDefaultValue] = useState<Size | null>(null);
  const [smallValue, setSmallValue] = useState<Size | null>(null);

  const items: Size[] = [
    { id: "xs", label: "Extra Small" },
    { id: "sm", label: "Small" },
    { id: "md", label: "Medium" },
    { id: "lg", label: "Large" },
    { id: "xl", label: "Extra Large" },
  ];

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <ComboboxField
        items={items}
        value={defaultValue}
        onValueChange={setDefaultValue}
        placeholder="Default size"
        size="default"
      />
      <ComboboxField
        items={items}
        value={smallValue}
        onValueChange={setSmallValue}
        placeholder="Small size"
        size="sm"
      />
    </div>
  );
}
