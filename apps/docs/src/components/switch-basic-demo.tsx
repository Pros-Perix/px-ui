import { Switch } from "@px-ui/core";

export function SwitchBasicDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="notifications" />
      <label htmlFor="notifications" className="text-ppx-sm cursor-pointer">
        Enable notifications
      </label>
    </div>
  );
}
