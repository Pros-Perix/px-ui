import { ComboboxField } from "@px-ui/forms";
import { useState } from "react";

export default function ComboboxFieldSearchPopupDemo() {
  const [value, setValue] = useState<string[]>([]);

  const items = [
    { id: "typescript", label: "TypeScript" },
    { id: "javascript", label: "JavaScript" },
    { id: "python", label: "Python" },
    { id: "java", label: "Java" },
    { id: "go", label: "Go" },
    { id: "rust", label: "Rust" },
    { id: "cpp", label: "C++" },
    { id: "ruby", label: "Ruby" },
  ];

  return (
    <div className="w-full max-w-xs">
      <ComboboxField
        items={items}
        value={value}
        onValueChange={setValue}
        multiple
        searchInPopup
        placeholder="Select languages"
      />
    </div>
  );
}
