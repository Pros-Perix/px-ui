import { RadioGroup } from "@px-ui/core";

export function RadioGroupSizesDemo() {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup.Group defaultValue="sm">
        <div className="flex items-center gap-2">
          <RadioGroup.Item value="sm" id="size-sm" size="sm" />
          <label htmlFor="size-sm" className="text-ppx-sm cursor-pointer">
            Small
          </label>
        </div>
      </RadioGroup.Group>

      <RadioGroup.Group defaultValue="default">
        <div className="flex items-center gap-2">
          <RadioGroup.Item value="default" id="size-default" size="default" />
          <label htmlFor="size-default" className="text-ppx-sm cursor-pointer">
            Default
          </label>
        </div>
      </RadioGroup.Group>

      <RadioGroup.Group defaultValue="lg">
        <div className="flex items-center gap-2">
          <RadioGroup.Item value="lg" id="size-lg" size="lg" />
          <label htmlFor="size-lg" className="text-ppx-sm cursor-pointer">
            Large
          </label>
        </div>
      </RadioGroup.Group>
    </div>
  );
}
