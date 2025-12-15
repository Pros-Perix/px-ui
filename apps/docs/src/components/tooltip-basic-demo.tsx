import { Tooltip, Button } from "@px-ui/core";

export function TooltipBasicDemo() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button variant="outline">Hover me</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>This is a helpful tooltip</p>
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
