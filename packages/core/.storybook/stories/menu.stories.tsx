import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as Menu from "../../src/components/menu";
import { Button } from "../../src/components/button";
import ChevronDownIcon from "../../src/icons/chevron-down-icon";

const meta: Meta<typeof Menu> = {
  component: ExampleMenu,
  title: "Components/Menu",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

export const Default: StoryObj<typeof Menu> = {
  render: () => <ExampleMenu />,
};

function ExampleMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger>File</Menu.Trigger>
      <Menu.Content>
        <Menu.Item onClick={() => console.log("New File")}>New File</Menu.Item>
        <Menu.Item onClick={() => console.log("New Window")}>
          New Window
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item onClick={() => console.log("Open File")}>
          Open File
        </Menu.Item>
        <Menu.Item onClick={() => console.log("Open Folder")}>
          Open Folder
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item onClick={() => console.log("Save")}>Save</Menu.Item>
        <Menu.Item onClick={() => console.log("Save As")}>Save As...</Menu.Item>
        <Menu.Separator />
        <Menu.Item onClick={() => console.log("Exit")}>Exit</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}

export function ActionsMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Content>
        <Menu.Item onClick={() => alert("Edit clicked")}>Edit</Menu.Item>
        <Menu.Item onClick={() => alert("Duplicate clicked")}>
          Duplicate
        </Menu.Item>
        <Menu.Item onClick={() => alert("Archive clicked")}>Archive</Menu.Item>
        <Menu.Separator />
        <Menu.Item onClick={() => alert("Delete clicked")}>Delete</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}

export function WithMultipleSections() {
  return (
    <Menu.Root>
      <Menu.Trigger>View</Menu.Trigger>
      <Menu.Content>
        <Menu.Item onClick={() => console.log("Toggle Sidebar")}>
          Toggle Sidebar
        </Menu.Item>
        <Menu.Item onClick={() => console.log("Toggle Minimap")}>
          Toggle Minimap
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item onClick={() => console.log("Zoom In")}>Zoom In</Menu.Item>
        <Menu.Item onClick={() => console.log("Zoom Out")}>Zoom Out</Menu.Item>
        <Menu.Item onClick={() => console.log("Reset Zoom")}>
          Reset Zoom
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item onClick={() => console.log("Full Screen")}>
          Full Screen
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}

export function WithRadioGroup() {
  const [sortBy, setSortBy] = React.useState("date");

  return (
    <Menu.Root>
      <Menu.Trigger>Sort by: {sortBy}</Menu.Trigger>
      <Menu.Content>
        <Menu.RadioGroup value={sortBy} onValueChange={setSortBy}>
          <Menu.RadioItem value="date">Date Modified</Menu.RadioItem>
          <Menu.RadioItem value="name">Name</Menu.RadioItem>
          <Menu.RadioItem value="size">Size</Menu.RadioItem>
          <Menu.RadioItem value="type">Type</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

export function WithGroups() {
  const [theme, setTheme] = React.useState("light");

  return (
    <Menu.Root>
      <Menu.Trigger>Preferences</Menu.Trigger>
      <Menu.Content>
        <Menu.Group>
          <Menu.GroupLabel>Theme</Menu.GroupLabel>
          <Menu.RadioGroup value={theme} onValueChange={setTheme}>
            <Menu.RadioItem value="light">Light</Menu.RadioItem>
            <Menu.RadioItem value="dark">Dark</Menu.RadioItem>
            <Menu.RadioItem value="system">System</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Group>

        <Menu.Separator />

        <Menu.Group>
          <Menu.GroupLabel>Actions</Menu.GroupLabel>
          <Menu.Item onClick={() => console.log("Reset Settings")}>
            Reset Settings
          </Menu.Item>
          <Menu.Item onClick={() => console.log("Export Settings")}>
            Export Settings
          </Menu.Item>
          <Menu.Item onClick={() => console.log("Import Settings")}>
            Import Settings
          </Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  );
}

export function ComplexExample() {
  const [view, setView] = React.useState("grid");
  const [sortBy, setSortBy] = React.useState("date");

  return (
    <Menu.Root>
      <Menu.Trigger>View Options</Menu.Trigger>
      <Menu.Content>
        <Menu.Group>
          <Menu.GroupLabel>Layout</Menu.GroupLabel>
          <Menu.RadioGroup value={view} onValueChange={setView}>
            <Menu.RadioItem value="grid">Grid View</Menu.RadioItem>
            <Menu.RadioItem value="list">List View</Menu.RadioItem>
            <Menu.RadioItem value="compact">Compact View</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Group>

        <Menu.Separator />

        <Menu.Group>
          <Menu.GroupLabel>Sort By</Menu.GroupLabel>
          <Menu.RadioGroup value={sortBy} onValueChange={setSortBy}>
            <Menu.RadioItem value="date">Date Modified</Menu.RadioItem>
            <Menu.RadioItem value="name">Name</Menu.RadioItem>
            <Menu.RadioItem value="size">File Size</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Group>

        <Menu.Separator />

        <Menu.Item onClick={() => console.log("Refresh")}>Refresh</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}

export function CustomTrigger() {
  const [view, setView] = React.useState("grid");
  const [sortBy, setSortBy] = React.useState("date");

  return (
    <Menu.Root>
      <Menu.BaseTrigger render={<Button>View options</Button>} />
      <Menu.Content>
        <Menu.Group>
          <Menu.GroupLabel>Layout</Menu.GroupLabel>
          <Menu.RadioGroup value={view} onValueChange={setView}>
            <Menu.RadioItem value="grid">Grid View</Menu.RadioItem>
            <Menu.RadioItem value="list">List View</Menu.RadioItem>
            <Menu.RadioItem value="compact">Compact View</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Group>

        <Menu.Separator />

        <Menu.Group>
          <Menu.GroupLabel>Sort By</Menu.GroupLabel>
          <Menu.RadioGroup value={sortBy} onValueChange={setSortBy}>
            <Menu.RadioItem value="date">Date Modified</Menu.RadioItem>
            <Menu.RadioItem value="name">Name</Menu.RadioItem>
            <Menu.RadioItem value="size">File Size</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Group>

        <Menu.Separator />

        <Menu.Item onClick={() => console.log("Refresh")}>Refresh</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}

export function GroupWithIcons() {
  const [selected, setSelected] = React.useState("closed");

  return (
    <Menu.Root>
      <Menu.Trigger className="bg-ppx-primary-b-5 text-ppx-background hover:bg-ppx-primary-b-4! data-popup-open:bg-ppx-primary-b-5">
        Bulk Action
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Group>
          <Menu.GroupLabel>Change status</Menu.GroupLabel>
          <Menu.RadioGroup value={selected} onValueChange={setSelected}>
            <Menu.RadioItem disabled value="open">
              Open
            </Menu.RadioItem>
            <Menu.RadioItem value="on-hold">On Hold</Menu.RadioItem>
            <Menu.RadioItem value="closed">Close</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Group>

        <Menu.Separator />

        <Menu.Group>
          <Menu.GroupLabel>Action</Menu.GroupLabel>
          <Menu.Item>Re-open</Menu.Item>
          <Menu.Item>Post Announcement</Menu.Item>
          <Menu.Item>Send Note</Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  );
}
