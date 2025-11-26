import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as Dialog from "../../src/components/dialog";
import { Button } from "../../src/components/button";

const meta: Meta<typeof Dialog.Root> = {
  component: Dialog.Root,
  title: "Components/Dialog",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          "A modal dialog component that overlays the main content. Supports nested dialogs, custom headers with icons, and flexible content layouts.",
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Dialog.Root> = {
  args: {
    children: (
      <>
        <Dialog.Trigger render={<Button>Open Dialog</Button>} />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.HeaderIcon>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2L12.5 8.5L19 9.5L14.5 14L15.5 20.5L10 17.5L4.5 20.5L5.5 14L1 9.5L7.5 8.5L10 2Z" />
              </svg>
            </Dialog.HeaderIcon>
            <Dialog.HeaderContent>
              <Dialog.Title>Publish Job Opening</Dialog.Title>
              <Dialog.Description>
                You are about to publish this job opening to the public. This
                action will make it visible to all users.
              </Dialog.Description>
            </Dialog.HeaderContent>
          </Dialog.Header>
          <div className="space-y-4">
            <p className="text-sm text-ppx-muted-foreground">
              Once published, the job opening will appear in search results and
              candidates will be able to apply. You can unpublish it at any
              time from the job settings.
            </p>
          </div>
          <Dialog.Footer>
            <Dialog.Close render={<Button variant="outline">Cancel</Button>} />
            <Button>Publish</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </>
    ),
  },
};

export const WithoutHeaderIcon: StoryObj<typeof Dialog.Root> = {
  args: {
    children: (
      <>
        <Dialog.Trigger render={<Button>Open Dialog</Button>} />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.HeaderContent>
              <Dialog.Title>Account Settings</Dialog.Title>
              <Dialog.Description>
                Make changes to your account settings here.
              </Dialog.Description>
            </Dialog.HeaderContent>
          </Dialog.Header>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Name</label>
              <input
                type="text"
                className="w-full rounded-md border border-ppx-neutral-5 bg-ppx-background px-3 py-2 text-sm"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full rounded-md border border-ppx-neutral-5 bg-ppx-background px-3 py-2 text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <Dialog.Footer>
            <Dialog.Close render={<Button variant="outline">Cancel</Button>} />
            <Button>Save Changes</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </>
    ),
  },
};

export const ConfirmationDialog: StoryObj<typeof Dialog.Root> = {
  args: {
    children: (
      <>
        <Dialog.Trigger render={<Button variant="destructive">Delete</Button>} />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.HeaderIcon>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" />
              </svg>
            </Dialog.HeaderIcon>
            <Dialog.HeaderContent>
              <Dialog.Title>Delete Account</Dialog.Title>
              <Dialog.Description>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </Dialog.Description>
            </Dialog.HeaderContent>
          </Dialog.Header>
          <div className="space-y-4">
            <p className="text-sm text-ppx-muted-foreground">
              All of your data will be permanently removed from our servers. This
              includes your profile, posts, and all associated information.
            </p>
          </div>
          <Dialog.Footer>
            <Dialog.Close render={<Button variant="outline">Cancel</Button>} />
            <Button variant="destructive">Delete Account</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </>
    ),
  },
};

export const AlertDialog: StoryObj<typeof Dialog.Root> = {
  args: {
    children: (
      <>
        <Dialog.Trigger render={<Button>Show Alert</Button>} />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.HeaderIcon>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2L11.8 7.2L17 9L11.8 10.8L10 16L8.2 10.8L3 9L8.2 7.2L10 2Z" />
              </svg>
            </Dialog.HeaderIcon>
            <Dialog.HeaderContent>
              <Dialog.Title>Success!</Dialog.Title>
              <Dialog.Description>
                Your changes have been saved successfully.
              </Dialog.Description>
            </Dialog.HeaderContent>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close render={<Button>Continue</Button>} />
          </Dialog.Footer>
        </Dialog.Content>
      </>
    ),
  },
};

export const WithForm: StoryObj<typeof Dialog.Root> = {
  args: {
    children: (
      <>
        <Dialog.Trigger render={<Button>Create New Project</Button>} />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.HeaderIcon>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 5V15M5 10H15" />
              </svg>
            </Dialog.HeaderIcon>
            <Dialog.HeaderContent>
              <Dialog.Title>Create New Project</Dialog.Title>
              <Dialog.Description>
                Fill in the details below to create a new project.
              </Dialog.Description>
            </Dialog.HeaderContent>
          </Dialog.Header>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Name</label>
              <input
                type="text"
                className="w-full rounded-md border border-ppx-neutral-5 bg-ppx-background px-3 py-2 text-sm"
                placeholder="Enter project name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full rounded-md border border-ppx-neutral-5 bg-ppx-background px-3 py-2 text-sm"
                placeholder="Enter project description"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Type</label>
              <select className="w-full rounded-md border border-ppx-neutral-5 bg-ppx-background px-3 py-2 text-sm">
                <option>Web Application</option>
                <option>Mobile Application</option>
                <option>Desktop Application</option>
                <option>API Service</option>
              </select>
            </div>
          </form>
          <Dialog.Footer>
            <Dialog.Close render={<Button variant="outline">Cancel</Button>} />
            <Button>Create Project</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </>
    ),
  },
};

export const LongContent: StoryObj<typeof Dialog.Root> = {
  args: {
    children: (
      <>
        <Dialog.Trigger render={<Button>View Terms</Button>} />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.HeaderContent>
              <Dialog.Title>Terms and Conditions</Dialog.Title>
              <Dialog.Description>
                Please read and accept our terms and conditions.
              </Dialog.Description>
            </Dialog.HeaderContent>
          </Dialog.Header>
          <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2">
            <div className="space-y-2">
              <h3 className="font-medium">1. Introduction</h3>
              <p className="text-sm text-ppx-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">2. User Responsibilities</h3>
              <p className="text-sm text-ppx-muted-foreground">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">3. Privacy Policy</h3>
              <p className="text-sm text-ppx-muted-foreground">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae vitae
                dicta sunt explicabo.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">4. Data Collection</h3>
              <p className="text-sm text-ppx-muted-foreground">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">5. Termination</h3>
              <p className="text-sm text-ppx-muted-foreground">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi
                tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem.
              </p>
            </div>
          </div>
          <Dialog.Footer>
            <Dialog.Close render={<Button variant="outline">Decline</Button>} />
            <Button>Accept</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </>
    ),
  },
};

export const NestedDialogs: StoryObj<typeof Dialog.Root> = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger render={<Button>Open First Dialog</Button>} />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.HeaderContent>
            <Dialog.Title>First Dialog</Dialog.Title>
            <Dialog.Description>
              This dialog contains another dialog inside it.
            </Dialog.Description>
          </Dialog.HeaderContent>
        </Dialog.Header>
        <div className="space-y-4">
          <p className="text-sm text-ppx-muted-foreground">
            Click the button below to open a nested dialog. Notice how the nested
            dialog scales down slightly.
          </p>
          <Dialog.Root>
            <Dialog.Trigger render={<Button>Open Nested Dialog</Button>} />
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.HeaderContent>
                  <Dialog.Title>Nested Dialog</Dialog.Title>
                  <Dialog.Description>
                    This is a nested dialog inside another dialog.
                  </Dialog.Description>
                </Dialog.HeaderContent>
              </Dialog.Header>
              <div className="space-y-4">
                <p className="text-sm text-ppx-muted-foreground">
                  The component automatically handles nested dialogs with proper
                  scaling and z-index management.
                </p>
              </div>
              <Dialog.Footer>
                <Dialog.Close render={<Button>Close Nested</Button>} />
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </div>
        <Dialog.Footer>
          <Dialog.Close render={<Button variant="outline">Close</Button>} />
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
};

export const CustomWidth: StoryObj<typeof Dialog.Root> = {
  args: {
    children: (
      <>
        <Dialog.Trigger render={<Button>Open Wide Dialog</Button>} />
        <Dialog.Content className="ppx-sm:max-w-3xl">
          <Dialog.Header>
            <Dialog.HeaderContent>
              <Dialog.Title>Custom Width Dialog</Dialog.Title>
              <Dialog.Description>
                This dialog has a custom width using className override.
              </Dialog.Description>
            </Dialog.HeaderContent>
          </Dialog.Header>
          <div className="space-y-4">
            <p className="text-sm text-ppx-muted-foreground">
              You can customize the dialog width by overriding the className on
              the Content component. This example uses ppx-sm:max-w-3xl to make
              it wider than the default.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border border-ppx-neutral-5 p-4">
                <h4 className="mb-2 font-medium">Column 1</h4>
                <p className="text-sm text-ppx-muted-foreground">
                  Content in the first column.
                </p>
              </div>
              <div className="rounded-md border border-ppx-neutral-5 p-4">
                <h4 className="mb-2 font-medium">Column 2</h4>
                <p className="text-sm text-ppx-muted-foreground">
                  Content in the second column.
                </p>
              </div>
            </div>
          </div>
          <Dialog.Footer>
            <Dialog.Close render={<Button variant="outline">Close</Button>} />
            <Button>Confirm</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </>
    ),
  },
};

export const MinimalDialog: StoryObj<typeof Dialog.Root> = {
  args: {
    children: (
      <>
        <Dialog.Trigger render={<Button variant="outline">Quick Action</Button>} />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.HeaderContent>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.HeaderContent>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close render={<Button variant="outline">No</Button>} />
            <Button>Yes</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </>
    ),
  },
};
