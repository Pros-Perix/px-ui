import { Switch } from "@px-ui/core";

export function SwitchSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-2">
        <Switch id="small" size="sm" defaultChecked />
        <label htmlFor="small" className="text-ppx-sm cursor-pointer">
          Small
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="default" defaultChecked />
        <label htmlFor="default" className="text-ppx-sm cursor-pointer">
          Default
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="large" size="lg" defaultChecked />
        <label htmlFor="large" className="text-ppx-sm cursor-pointer">
          Large
        </label>
      </div>
    </div>
  );
}
