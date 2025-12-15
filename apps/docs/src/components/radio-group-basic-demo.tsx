import { RadioGroup } from "@px-ui/core";

export function RadioGroupBasicDemo() {
  return (
    <RadioGroup.Group defaultValue="comfortable">
      <div className="flex items-center gap-2">
        <RadioGroup.Item value="default" id="default" />
        <label htmlFor="default" className="text-ppx-sm cursor-pointer">
          Default
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroup.Item value="comfortable" id="comfortable" />
        <label htmlFor="comfortable" className="text-ppx-sm cursor-pointer">
          Comfortable
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroup.Item value="compact" id="compact" />
        <label htmlFor="compact" className="text-ppx-sm cursor-pointer">
          Compact
        </label>
      </div>
    </RadioGroup.Group>
  );
}
