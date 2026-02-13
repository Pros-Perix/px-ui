import { Combobox } from "@px-ui/core";
import { useState } from "react";

interface Language {
  value: string;
  label: string;
}

const languages: Language[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
];

export function ComboboxMultipleDemo() {
  const [value, setValue] = useState<Language[]>([]);

  return (
    <Combobox.Root
      items={languages}
      multiple
      value={value}
      onValueChange={setValue}
      isItemEqualToValue={(item, selected) => item.value === selected.value}
      itemToStringLabel={(item) => item.label}
    >
      <Combobox.ChipsTrigger placeholder="Select languages">
        {(item: Language) => (
          <Combobox.Chip key={item.value}>{item.label}</Combobox.Chip>
        )}
      </Combobox.ChipsTrigger>
      <Combobox.Content>
        <Combobox.List>
          {(language: Language) => (
            <Combobox.MultiItem key={language.value} value={language}>
              {language.label}
            </Combobox.MultiItem>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}
