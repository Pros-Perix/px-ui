import { Select } from "@px-ui/core";

export function SelectDisabledDemo() {
  return (
    <Select.Root value="apple" disabled>
      <Select.Trigger>
        <Select.Value placeholder="Select a fruit" />
      </Select.Trigger>
      <Select.Content>
        <Select.List>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="orange">Orange</Select.Item>
        </Select.List>
      </Select.Content>
    </Select.Root>
  );
}
