import { Dialog, Button } from "@px-ui/core";

export function DialogBasicDemo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={(props) => <Button {...props}>Open Dialog</Button>} />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.HeaderContent>
            <Dialog.Title>Account Settings</Dialog.Title>
            <Dialog.Description>
              Make changes to your account settings here.
            </Dialog.Description>
          </Dialog.HeaderContent>
        </Dialog.Header>
        <div className="flex flex-col gap-4">
          <p className="text-ppx-sm">
            Update your profile information, preferences, and account details.
          </p>
        </div>
        <Dialog.Footer>
          <Dialog.Close render={(props) => <Button {...props} variant="outline">Cancel</Button>} />
          <Button>Save Changes</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
