import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as Tabs from "../../src/components/tabs";

const meta: Meta = {
  component: TabsDemo,
  title: "Components/tabs",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  args: {},
};

function TabsDemo() {
  return (
    <div className="space-y-10">
      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger value="comments">Comments</Tabs.Trigger>
          <Tabs.Trigger value="events">Events</Tabs.Trigger>
          <Tabs.Trigger value="timeline">Timeline</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="comments">
          <p>Comments</p>
        </Tabs.Content>
        <Tabs.Content value="events">
          <p>Events</p>
        </Tabs.Content>
        <Tabs.Content value="timeline">
          <p>Timeline</p>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
