import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "../../src/components/dialog";
import { Button } from "../../src/components/button";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: "Components/dialog",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

export const Default: StoryObj<typeof Dialog> = {
  args: {
    children: (
      <>
        <DialogTrigger render={<Button>Open Dialog</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <div></div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Close</Button>} />
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </>
    ),
  },
};
