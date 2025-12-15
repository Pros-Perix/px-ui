import { Checkbox } from "@px-ui/core";

export function CheckboxBasicDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <label htmlFor="terms" className="text-ppx-sm cursor-pointer">
        Accept terms and conditions
      </label>
    </div>
  );
}
