import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../src/components/button";
import { TextInput } from "../../src/components/text-input";
import * as Popover from "../../src/components/popover";

const meta: Meta<typeof Popover.Root> = {
  component: Popover.Root,
  title: "Components/popover",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

export const Default: StoryObj<typeof Popover.Root> = {
  render: () => <PopoverDemo />,
};

function PopoverDemo() {
  const copyToClipboard = () => {
    alert("Copied to clipboard");
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Popover.Root>
      <Popover.Trigger
        render={(props) => (
          <Button {...props} variant="outline">
            Share
          </Button>
        )}
      />
      <Popover.Content className="w-[calc(100vw-4rem)] sm:w-[500px]">
        <Popover.Header>
          <Popover.Title>Share</Popover.Title>
          <Popover.Description>Share this component.</Popover.Description>
        </Popover.Header>
        <div className="mt-2 flex w-full gap-2">
          <TextInput
            inputContainerClassName="w-full"
            value="https://prosperix.com"
            autoFocus={false}
            readOnly
          />
          <Button className="shrink-0" onClick={copyToClipboard}>
            Copy
          </Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
