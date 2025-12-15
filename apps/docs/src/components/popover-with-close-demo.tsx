import { Popover, Button } from "@px-ui/core";

export function PopoverWithCloseDemo() {
  return (
    <Popover.Root>
      <Popover.Trigger render={(props) => <Button {...props}>Show Info</Button>} />
      <Popover.Content>
        <div className="flex items-start justify-between gap-4">
          <Popover.Header>
            <Popover.Title>Information</Popover.Title>
            <Popover.Description>
              This is some helpful information about your account.
            </Popover.Description>
          </Popover.Header>
          <Popover.CloseIconButton />
        </div>
        <div className="pt-4">
          <p className="text-ppx-sm text-ppx-muted-foreground">
            Your account is currently active and all features are available.
          </p>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
