import { Popover, Button, Input, Label } from "@px-ui/core";

export function PopoverWithFormDemo() {
  return (
    <Popover.Root>
      <Popover.Trigger render={(props) => <Button {...props}>Update Profile</Button>} />
      <Popover.Content className="w-80">
        <Popover.Header>
          <Popover.Title>Edit Profile</Popover.Title>
          <Popover.Description>
            Update your profile information
          </Popover.Description>
        </Popover.Header>
        <div className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
        </div>
        <Popover.Footer className="pt-4">
          <Popover.Close render={(props) => <Button {...props} variant="outline">Cancel</Button>} />
          <Button>Save Changes</Button>
        </Popover.Footer>
      </Popover.Content>
    </Popover.Root>
  );
}
