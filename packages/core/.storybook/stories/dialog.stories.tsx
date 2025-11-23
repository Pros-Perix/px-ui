import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as Dialog from "../../src/components/dialog";
import { Button } from "../../src/components/button";

const meta: Meta<typeof Dialog.Root> = {
  component: Dialog.Root,
  title: "Components/dialog",
  tags: ["autodocs"],
  argTypes: {},
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
                <path d="M10 0L12.5 7.5L20 7.5L14 12L16 20L10 15L4 20L6 12L0 7.5L7.5 7.5L10 0Z" />
              </svg>
            </Dialog.HeaderIcon>
            <Dialog.HeaderContent>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>
                You are about to open this job to public, are you sure?
              </Dialog.Description>
            </Dialog.HeaderContent>
          </Dialog.Header>
          <div>
            <p>Dialog Content</p>
          </div>
          <Dialog.Footer>
            <Dialog.Close render={<Button variant="outline">Close</Button>} />
            <Button>Save changes</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </>
    ),
  },
};
