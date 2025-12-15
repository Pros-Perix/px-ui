import { Tooltip, Button } from "@px-ui/core";

export function TooltipDelayDemo() {
  return (
    <div className="flex items-center gap-4">
      <Tooltip.Root delay={0}>
        <Tooltip.Trigger>
          <Button variant="outline">No delay</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>Appears immediately</p>
        </Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root delay={500}>
        <Tooltip.Trigger>
          <Button variant="outline">500ms delay</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>Appears after 500ms</p>
        </Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root delay={1000}>
        <Tooltip.Trigger>
          <Button variant="outline">1000ms delay</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>Appears after 1 second</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </div>
  );
}
