import { Switch } from "@px-ui/core";

export function SwitchWithLabelsDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch id="airplane" />
        <label htmlFor="airplane" className="text-ppx-sm cursor-pointer">
          Airplane mode
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="wifi" defaultChecked />
        <label htmlFor="wifi" className="text-ppx-sm cursor-pointer">
          Wi-Fi
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="bluetooth" defaultChecked />
        <label htmlFor="bluetooth" className="text-ppx-sm cursor-pointer">
          Bluetooth
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="location" />
        <label htmlFor="location" className="text-ppx-sm cursor-pointer">
          Location services
        </label>
      </div>
    </div>
  );
}
