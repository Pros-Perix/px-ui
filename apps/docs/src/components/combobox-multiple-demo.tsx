import { Combobox } from "@px-ui/core";
import { useState } from "react";

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
];

export function ComboboxMultipleDemo() {
  const [value, setValue] = useState<any[]>([]);

  return (
    <Combobox.Root multiple value={value} onValueChange={setValue}>
      <Combobox.ChipsTrigger placeholder="Select languages">
        {(item: any) => (
          <Combobox.Chip key={item.value}>
            {item.label}
          </Combobox.Chip>
        )}
      </Combobox.ChipsTrigger>
      <Combobox.Content>
        <Combobox.List>
          {languages.map((language) => (
            <Combobox.MultiItem key={language.value} value={language}>
              {language.label}
            </Combobox.MultiItem>
          ))}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}
