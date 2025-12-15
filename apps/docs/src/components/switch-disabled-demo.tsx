import { Switch } from "@px-ui/core";

export function SwitchDisabledDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch id="disabled-off" disabled />
        <label htmlFor="disabled-off" className="text-ppx-sm cursor-pointer">
          Disabled (off)
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <label htmlFor="disabled-on" className="text-ppx-sm cursor-pointer">
          Disabled (on)
        </label>
      </div>
    </div>
  );
}
