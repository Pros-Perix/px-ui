import { Checkbox } from "@px-ui/core";

export function CheckboxDisabledDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-unchecked" disabled />
        <label
          htmlFor="disabled-unchecked"
          className="text-ppx-sm cursor-pointer"
        >
          Disabled unchecked
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <label
          htmlFor="disabled-checked"
          className="text-ppx-sm cursor-pointer"
        >
          Disabled checked
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="disabled-indeterminate"
          disabled
          indeterminate
          defaultChecked
        />
        <label
          htmlFor="disabled-indeterminate"
          className="text-ppx-sm cursor-pointer"
        >
          Disabled indeterminate
        </label>
      </div>
    </div>
  );
}
