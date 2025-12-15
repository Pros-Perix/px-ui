import { Dialog, Button } from "@px-ui/core";

export function DialogConfirmationDemo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={(props) => <Button {...props} variant="destructive">Delete Account</Button>} />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.HeaderIcon className="bg-red-100 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </Dialog.HeaderIcon>
          <Dialog.HeaderContent>
            <Dialog.Title>Delete Account</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to delete your account? This action cannot be undone.
            </Dialog.Description>
          </Dialog.HeaderContent>
        </Dialog.Header>
        <div className="flex flex-col gap-4">
          <p className="text-ppx-sm text-ppx-muted-foreground">
            All your data, projects, and settings will be permanently removed.
          </p>
        </div>
        <Dialog.Footer>
          <Dialog.Close render={(props) => <Button {...props} variant="outline">Cancel</Button>} />
          <Button variant="destructive">Delete Account</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
