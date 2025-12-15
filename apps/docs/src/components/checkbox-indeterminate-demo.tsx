import { Checkbox } from "@px-ui/core";

export function CheckboxIndeterminateDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="unchecked" />
        <label htmlFor="unchecked" className="text-ppx-sm cursor-pointer">
          Unchecked state
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="indeterminate" indeterminate defaultChecked />
        <label
          htmlFor="indeterminate"
          className="text-ppx-sm cursor-pointer"
        >
          Indeterminate state (mixed selection)
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checked" defaultChecked />
        <label htmlFor="checked" className="text-ppx-sm cursor-pointer">
          Checked state
        </label>
      </div>
    </div>
  );
}
