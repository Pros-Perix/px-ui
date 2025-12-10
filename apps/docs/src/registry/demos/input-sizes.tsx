import { Input } from "@px-ui/core";

export function InputSizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Input size="default" placeholder="Default size" />
      <Input size="sm" placeholder="Small size" />
    </div>
  );
}

export const InputSizesDemoSource = `import { Input } from "@px-ui/core";

export function InputSizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Input size="default" placeholder="Default size" />
      <Input size="sm" placeholder="Small size" />
    </div>
  );
}`;
