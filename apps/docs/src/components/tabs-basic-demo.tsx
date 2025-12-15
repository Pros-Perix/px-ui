import { Tabs } from "@px-ui/core";

export function TabsBasicDemo() {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
        <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">
        <div className="p-4">
          <p className="text-ppx-sm">Manage your account settings and preferences.</p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="password">
        <div className="p-4">
          <p className="text-ppx-sm">Change your password and security settings.</p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="notifications">
        <div className="p-4">
          <p className="text-ppx-sm">Configure how you receive notifications.</p>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
