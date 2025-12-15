import { Input } from "@px-ui/core";

export function InputSizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Input size="sm" placeholder="Small input" />
        <span className="text-ppx-neutral-11 text-xs">Small</span>
      </div>
      <div className="flex flex-col gap-2">
        <Input size="default" placeholder="Default input" />
        <span className="text-ppx-neutral-11 text-xs">Default</span>
      </div>
    </div>
  );
}
