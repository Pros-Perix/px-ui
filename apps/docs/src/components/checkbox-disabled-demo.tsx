import { Checkbox, Label } from "@px-ui/core";

export function CheckboxDisabledDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked">Disabled unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked">Disabled checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="disabled-indeterminate"
          disabled
          indeterminate
          defaultChecked
        />
        <Label htmlFor="disabled-indeterminate">Disabled indeterminate</Label>
      </div>
    </div>
  );
}
