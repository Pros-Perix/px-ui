import { Popover, Button } from "@px-ui/core";

export function PopoverPositionsDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Popover.Root>
        <Popover.Trigger render={(props) => <Button {...props} variant="outline">Top</Button>} />
        <Popover.Content positionerProps={{ side: "top" }}>
          <p className="text-ppx-sm">Popover positioned on top</p>
        </Popover.Content>
      </Popover.Root>

      <Popover.Root>
        <Popover.Trigger render={(props) => <Button {...props} variant="outline">Bottom</Button>} />
        <Popover.Content positionerProps={{ side: "bottom" }}>
          <p className="text-ppx-sm">Popover positioned on bottom</p>
        </Popover.Content>
      </Popover.Root>

      <Popover.Root>
        <Popover.Trigger render={(props) => <Button {...props} variant="outline">Left</Button>} />
        <Popover.Content positionerProps={{ side: "left" }}>
          <p className="text-ppx-sm">Popover positioned on left</p>
        </Popover.Content>
      </Popover.Root>

      <Popover.Root>
        <Popover.Trigger render={(props) => <Button {...props} variant="outline">Right</Button>} />
        <Popover.Content positionerProps={{ side: "right" }}>
          <p className="text-ppx-sm">Popover positioned on right</p>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
