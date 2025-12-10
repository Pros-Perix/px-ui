import { Switch, Label } from "@px-ui/core";

export function SwitchDemo() {
  return (
    <div className="flex items-center gap-3">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  );
}

export const SwitchDemoSource = `import { Switch, Label } from "@px-ui/core";

export function SwitchDemo() {
  return (
    <div className="flex items-center gap-3">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  );
}`;
