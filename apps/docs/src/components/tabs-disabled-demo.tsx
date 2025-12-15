import { Tabs } from "@px-ui/core";

export function TabsDisabledDemo() {
  return (
    <Tabs.Root defaultValue="available">
      <Tabs.List>
        <Tabs.Trigger value="available">Available</Tabs.Trigger>
        <Tabs.Trigger value="coming-soon" disabled>
          Coming Soon
        </Tabs.Trigger>
        <Tabs.Trigger value="maintenance" disabled>
          Maintenance
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="available">
        <div className="p-4">
          <p className="text-ppx-sm">This feature is currently available.</p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="coming-soon">
        <div className="p-4">
          <p className="text-ppx-sm">This feature is coming soon.</p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="maintenance">
        <div className="p-4">
          <p className="text-ppx-sm">This feature is under maintenance.</p>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
