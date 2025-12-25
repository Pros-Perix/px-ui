import { Checkbox, Label } from "@px-ui/core";

export function CheckboxBasicDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
