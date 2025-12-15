import { Tooltip, Button } from "@px-ui/core";

export function TooltipPositionsDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button variant="outline">Top</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="top">
          <p>Tooltip on top</p>
        </Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button variant="outline">Bottom</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom">
          <p>Tooltip on bottom</p>
        </Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button variant="outline">Left</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="left">
          <p>Tooltip on left</p>
        </Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button variant="outline">Right</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="right">
          <p>Tooltip on right</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </div>
  );
}
