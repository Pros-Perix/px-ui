import { Popover, Button } from "@px-ui/core";

export function PopoverBasicDemo() {
  return (
    <Popover.Root>
      <Popover.Trigger render={(props) => <Button {...props}>Open Popover</Button>} />
      <Popover.Content>
        <Popover.Header>
          <Popover.Title>Quick Actions</Popover.Title>
          <Popover.Description>
            Choose an action to perform
          </Popover.Description>
        </Popover.Header>
        <div className="flex flex-col gap-2 pt-4">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          <Button variant="outline" size="sm">
            Edit Settings
          </Button>
          <Button variant="outline" size="sm">
            Download Report
          </Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
