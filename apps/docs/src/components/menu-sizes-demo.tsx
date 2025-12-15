import { Menu } from "@px-ui/core";

export function MenuSizesDemo() {
  return (
    <div className="flex items-center gap-4">
      <Menu.Root>
        <Menu.Trigger size="sm">Small Menu</Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Edit</Menu.Item>
          <Menu.Item>Delete</Menu.Item>
        </Menu.Content>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger size="md">Medium Menu</Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Edit</Menu.Item>
          <Menu.Item>Delete</Menu.Item>
        </Menu.Content>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger size="lg">Large Menu</Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Edit</Menu.Item>
          <Menu.Item>Delete</Menu.Item>
        </Menu.Content>
      </Menu.Root>
    </div>
  );
}
