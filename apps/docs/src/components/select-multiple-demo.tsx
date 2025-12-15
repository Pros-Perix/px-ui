import { Select } from "@px-ui/core";
import { useState } from "react";

export function SelectMultipleDemo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Select.Root multiple value={value} onValueChange={setValue}>
      <Select.Trigger>
        <Select.MultiSelectedValue selectedValue={value} maxItems={2} />
        <Select.Value placeholder="Select technologies" />
      </Select.Trigger>
      <Select.Content>
        <Select.List>
          <Select.MultiItem value="react">React</Select.MultiItem>
          <Select.MultiItem value="vue">Vue</Select.MultiItem>
          <Select.MultiItem value="angular">Angular</Select.MultiItem>
          <Select.MultiItem value="svelte">Svelte</Select.MultiItem>
          <Select.MultiItem value="solid">Solid</Select.MultiItem>
        </Select.List>
      </Select.Content>
    </Select.Root>
  );
}
