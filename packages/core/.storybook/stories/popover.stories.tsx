import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../src/components/button";
import { TextInput } from "../../src/components/text-input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../src/components/popover";

const meta: Meta<typeof Popover> = {
  component: PopoverDemo,
  title: "Components/popover",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

export const Default: StoryObj<typeof PopoverDemo> = {};

function PopoverDemo() {
  const copyToClipboard = () => {
    alert("Copied to clipboard");
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Popover>
      <PopoverTrigger
        render={(props) => (
          <Button {...props} variant="outline">
            Share
          </Button>
        )}
      />
      <PopoverContent className="w-[calc(100vw-4rem)] sm:w-[500px]">
        <PopoverHeader>
          <PopoverTitle>Share</PopoverTitle>
          <PopoverDescription>Share this component.</PopoverDescription>
        </PopoverHeader>
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
      </PopoverContent>
    </Popover>
  );
}
