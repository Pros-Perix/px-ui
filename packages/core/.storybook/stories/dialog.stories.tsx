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
            <Dialog.Title>Dialog Title</Dialog.Title>
            <Dialog.Description>Dialog Description</Dialog.Description>
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
