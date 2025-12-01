import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../src/components/button";
import { Input } from "../../src/components/input";
import * as Popover from "../../src/components/popover";

const meta: Meta<typeof Popover.Root> = {
  component: Popover.Root,
  title: "Components/Popover",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Popover.Root>;

// Default example with share functionality
export const Default: Story = {
  render: () => {
    const copyToClipboard = () => {
      navigator.clipboard.writeText(window.location.href);
    };

    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Popover.Root>
          <Popover.Trigger
            render={(props) => (
              <Button {...props} variant="outline">
                Share
              </Button>
            )}
          />
          <Popover.Content className="sm:w-[500px] w-[calc(100vw-4rem)]">
            <Popover.Header>
              <Popover.Title>Share</Popover.Title>
              <Popover.Description>
                Share this link with others.
              </Popover.Description>
            </Popover.Header>
            <div className="mt-2 gap-2 flex w-full">
              <Input
                value="https://prosperix.com"
                autoFocus={false}
                readOnly
                widthVariant="full"
              />
              <Button className="shrink-0" onClick={copyToClipboard}>
                Copy
              </Button>
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>
    );
  },
};

// Simple info popover
export const SimpleInfo: Story = {
  render: () => (
    <div className="flex min-h-[300px] items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              More Info
            </Button>
          )}
        />
        <Popover.Content className="w-80">
          <Popover.Header>
            <Popover.Title>Information</Popover.Title>
            <Popover.Description>
              This is a simple popover with informational content.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

// With footer actions
export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger
            render={(props) => (
              <Button {...props} variant="outline">
                Delete Item
              </Button>
            )}
          />
          <Popover.Content className="w-80">
            <Popover.Header>
              <Popover.Title>Delete confirmation</Popover.Title>
              <Popover.Description>
                Are you sure you want to delete this item? This action cannot be
                undone.
              </Popover.Description>
            </Popover.Header>
            <Popover.Footer className="mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setOpen(false);
                  alert("Item deleted");
                }}
              >
                Delete
              </Button>
            </Popover.Footer>
          </Popover.Content>
        </Popover.Root>
      </div>
    );
  },
};

// With close button
export const WithCloseButton: Story = {
  render: () => (
    <div className="flex min-h-[300px] items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              Open Settings
            </Button>
          )}
        />
        <Popover.Content className="w-96">
          <div className="gap-4 flex items-start justify-between">
            <Popover.Header>
              <Popover.Title>Settings</Popover.Title>
              <Popover.Description>
                Configure your preferences here.
              </Popover.Description>
            </Popover.Header>
            <Popover.CloseIconButton />
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Email notifications</label>
              <p className="text-sm text-ppx-muted-foreground">
                Receive email updates about your account.
              </p>
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

// Without arrow
export const WithoutArrow: Story = {
  render: () => (
    <div className="flex min-h-[300px] items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              No Arrow
            </Button>
          )}
        />
        <Popover.Content arrow={false} className="w-80">
          <Popover.Header>
            <Popover.Title>Without Arrow</Popover.Title>
            <Popover.Description>
              This popover doesn't have an arrow pointer.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

// Different positions - Top
export const PositionTop: Story = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              Open Above
            </Button>
          )}
        />
        <Popover.Content positionerProps={{ side: "top" }} className="w-80">
          <Popover.Header>
            <Popover.Title>Top Position</Popover.Title>
            <Popover.Description>
              This popover opens above the trigger.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

// Different positions - Left
export const PositionLeft: Story = {
  render: () => (
    <div className="flex min-h-[300px] items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              Open Left
            </Button>
          )}
        />
        <Popover.Content positionerProps={{ side: "left" }} className="w-80">
          <Popover.Header>
            <Popover.Title>Left Position</Popover.Title>
            <Popover.Description>
              This popover opens to the left of the trigger.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

// Different positions - Right
export const PositionRight: Story = {
  render: () => (
    <div className="flex min-h-[300px] items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              Open Right
            </Button>
          )}
        />
        <Popover.Content positionerProps={{ side: "right" }} className="w-80">
          <Popover.Header>
            <Popover.Title>Right Position</Popover.Title>
            <Popover.Description>
              This popover opens to the right of the trigger.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

// Alignment variations
export const AlignmentStart: Story = {
  render: () => (
    <div className="flex min-h-[300px] items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              Align Start
            </Button>
          )}
        />
        <Popover.Content positionerProps={{ align: "start" }} className="w-80">
          <Popover.Header>
            <Popover.Title>Start Alignment</Popover.Title>
            <Popover.Description>
              This popover is aligned to the start of the trigger.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

export const AlignmentEnd: Story = {
  render: () => (
    <div className="flex min-h-[300px] items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              Align End
            </Button>
          )}
        />
        <Popover.Content positionerProps={{ align: "end" }} className="w-80">
          <Popover.Header>
            <Popover.Title>End Alignment</Popover.Title>
            <Popover.Description>
              This popover is aligned to the end of the trigger.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

// Form example
export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Submitted: ${name}, ${email}`);
      setOpen(false);
      setName("");
      setEmail("");
    };

    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger
            render={(props) => (
              <Button {...props} variant="outline">
                Add Contact
              </Button>
            )}
          />
          <Popover.Content className="w-96">
            <Popover.Header>
              <Popover.Title>Add Contact</Popover.Title>
              <Popover.Description>
                Enter the contact details below.
              </Popover.Description>
            </Popover.Header>
            <form onSubmit={handleSubmit}>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <Popover.Footer className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Contact</Button>
              </Popover.Footer>
            </form>
          </Popover.Content>
        </Popover.Root>
      </div>
    );
  },
};

// Controlled popover
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="gap-4 flex flex-col items-center">
          <div className="text-sm text-ppx-muted-foreground">
            Status: {open ? "Open" : "Closed"}
          </div>
          <div className="gap-2 flex">
            <Button variant="outline" onClick={() => setOpen(!open)}>
              Toggle Programmatically
            </Button>
            <Popover.Root open={open} onOpenChange={setOpen}>
              <Popover.Trigger
                render={(props) => (
                  <Button {...props} variant="outline">
                    Controlled Trigger
                  </Button>
                )}
              />
              <Popover.Content className="w-80">
                <Popover.Header>
                  <Popover.Title>Controlled Popover</Popover.Title>
                  <Popover.Description>
                    This popover's open state is controlled externally.
                  </Popover.Description>
                </Popover.Header>
                <Popover.Footer className="mt-4">
                  <Button onClick={() => setOpen(false)}>Close</Button>
                </Popover.Footer>
              </Popover.Content>
            </Popover.Root>
          </div>
        </div>
      </div>
    );
  },
};

// Custom styled content
export const CustomStyling: Story = {
  render: () => (
    <div className="flex min-h-[300px] items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              Custom Style
            </Button>
          )}
        />
        <Popover.Content
          popupProps={{
            className:
              "bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200",
          }}
          className="w-80"
        >
          <Popover.Header>
            <Popover.Title className="text-purple-900">
              Custom Styling
            </Popover.Title>
            <Popover.Description className="text-purple-700">
              This popover has custom colors and styling applied.
            </Popover.Description>
          </Popover.Header>
          <div className="mt-3 p-3 bg-white/50 rounded-lg">
            <p className="text-sm text-purple-800">
              You can customize the appearance using className props.
            </p>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

// Rich content example
export const RichContent: Story = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              User Profile
            </Button>
          )}
        />
        <Popover.Content className="w-96">
          <div className="gap-3 flex items-start">
            <div className="w-12 h-12 from-purple-400 to-pink-400 text-white font-semibold flex items-center justify-center rounded-full bg-gradient-to-br">
              JD
            </div>
            <div className="min-w-0 flex-1">
              <Popover.Title>John Doe</Popover.Title>
              <Popover.Description>Senior Developer</Popover.Description>
              <div className="mt-3 space-y-2 text-sm">
                <div className="gap-2 flex items-center text-ppx-muted-foreground">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  john.doe@company.com
                </div>
                <div className="gap-2 flex items-center text-ppx-muted-foreground">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  San Francisco, CA
                </div>
              </div>
              <div className="mt-4 gap-2 flex">
                <Button size="sm" className="flex-1">
                  Message
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

// Multiple popovers
export const MultiplePopovers: Story = {
  render: () => (
    <div className="gap-4 flex min-h-[300px] items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              Popover 1
            </Button>
          )}
        />
        <Popover.Content className="w-64">
          <Popover.Header>
            <Popover.Title>First Popover</Popover.Title>
            <Popover.Description>
              This is the first popover.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover.Root>

      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              Popover 2
            </Button>
          )}
        />
        <Popover.Content className="w-64">
          <Popover.Header>
            <Popover.Title>Second Popover</Popover.Title>
            <Popover.Description>
              This is the second popover.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover.Root>

      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              Popover 3
            </Button>
          )}
        />
        <Popover.Content className="w-64">
          <Popover.Header>
            <Popover.Title>Third Popover</Popover.Title>
            <Popover.Description>
              This is the third popover.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

// Wide content
export const WideContent: Story = {
  render: () => (
    <div className="flex min-h-[300px] items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              Wide Popover
            </Button>
          )}
        />
        <Popover.Content className="w-[600px] max-w-[calc(100vw-2rem)]">
          <Popover.Header>
            <Popover.Title>Wide Content Popover</Popover.Title>
            <Popover.Description>
              This popover has a wider content area for more information.
            </Popover.Description>
          </Popover.Header>
          <div className="mt-4 gap-4 grid grid-cols-3">
            <div className="p-3 rounded-lg bg-ppx-neutral-3">
              <div className="font-medium mb-1">Column 1</div>
              <p className="text-sm text-ppx-muted-foreground">
                Content in the first column
              </p>
            </div>
            <div className="p-3 rounded-lg bg-ppx-neutral-3">
              <div className="font-medium mb-1">Column 2</div>
              <p className="text-sm text-ppx-muted-foreground">
                Content in the second column
              </p>
            </div>
            <div className="p-3 rounded-lg bg-ppx-neutral-3">
              <div className="font-medium mb-1">Column 3</div>
              <p className="text-sm text-ppx-muted-foreground">
                Content in the third column
              </p>
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

// Nested example (uncommon but possible)
export const NestedPopover: Story = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          render={(props) => (
            <Button {...props} variant="outline">
              Open Parent
            </Button>
          )}
        />
        <Popover.Content className="w-80">
          <Popover.Header>
            <Popover.Title>Parent Popover</Popover.Title>
            <Popover.Description>
              This popover contains another popover trigger.
            </Popover.Description>
          </Popover.Header>
          <div className="mt-4">
            <Popover.Root>
              <Popover.Trigger
                render={(props) => (
                  <Button {...props} variant="outline" size="sm">
                    Open Nested
                  </Button>
                )}
              />
              <Popover.Content className="w-64">
                <Popover.Header>
                  <Popover.Title>Nested Popover</Popover.Title>
                  <Popover.Description>
                    This is a nested popover inside the parent.
                  </Popover.Description>
                </Popover.Header>
              </Popover.Content>
            </Popover.Root>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};
