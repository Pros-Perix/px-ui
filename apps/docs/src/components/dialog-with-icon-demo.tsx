import { Dialog, Button } from "@px-ui/core";

export function DialogWithIconDemo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={(props) => <Button {...props}>Share Document</Button>} />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.HeaderIcon>
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
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" x2="12" y1="2" y2="15" />
            </svg>
          </Dialog.HeaderIcon>
          <Dialog.HeaderContent>
            <Dialog.Title>Share this document</Dialog.Title>
            <Dialog.Description>
              Anyone with the link will be able to view this document.
            </Dialog.Description>
          </Dialog.HeaderContent>
        </Dialog.Header>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value="https://example.com/document/abc123"
              className="flex-1 rounded-ppx-s border border-ppx-neutral-5 px-3 py-2 text-ppx-sm"
            />
            <Button variant="outline">Copy</Button>
          </div>
        </div>
        <Dialog.Footer>
          <Dialog.Close render={(props) => <Button {...props}>Done</Button>} />
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
