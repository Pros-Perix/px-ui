import { Menu } from "@px-ui/core";

export function MenuWithGroupsDemo() {
  return (
    <Menu.Root>
      <Menu.Trigger>Options</Menu.Trigger>
      <Menu.Content>
        <Menu.Group>
          <Menu.GroupLabel>Editing</Menu.GroupLabel>
          <Menu.Item>Cut</Menu.Item>
          <Menu.Item>Copy</Menu.Item>
          <Menu.Item>Paste</Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Group>
          <Menu.GroupLabel>View</Menu.GroupLabel>
          <Menu.Item>Zoom In</Menu.Item>
          <Menu.Item>Zoom Out</Menu.Item>
          <Menu.Item>Reset Zoom</Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  );
}
