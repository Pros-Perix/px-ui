import { ComboboxField } from "@px-ui/forms";
import { useState } from "react";

export default function ComboboxFieldMultipleDemo() {
  const [value, setValue] = useState<string[]>([]);

  const items = [
    { id: "react", label: "React" },
    { id: "vue", label: "Vue" },
    { id: "angular", label: "Angular" },
    { id: "svelte", label: "Svelte" },
    { id: "solid", label: "Solid" },
    { id: "next", label: "Next.js" },
    { id: "nuxt", label: "Nuxt" },
    { id: "remix", label: "Remix" },
  ];

  return (
    <div className="w-full max-w-md">
      <ComboboxField
        items={items}
        value={value}
        onValueChange={setValue}
        multiple
        placeholder="Search frameworks..."
      />
    </div>
  );
}
