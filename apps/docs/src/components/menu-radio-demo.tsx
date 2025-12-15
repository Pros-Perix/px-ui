import { Menu } from "@px-ui/core";
import { useState } from "react";

export function MenuRadioDemo() {
  const [theme, setTheme] = useState("light");

  return (
    <Menu.Root>
      <Menu.Trigger>Theme: {theme}</Menu.Trigger>
      <Menu.Content>
        <Menu.RadioGroup value={theme} onValueChange={setTheme}>
          <Menu.RadioItem value="light">Light</Menu.RadioItem>
          <Menu.RadioItem value="dark">Dark</Menu.RadioItem>
          <Menu.RadioItem value="system">System</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}
