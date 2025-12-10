import { Label, Input } from "@px-ui/core";

export function LabelDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  );
}

export const LabelDemoSource = `import { Label, Input } from "@px-ui/core";

export function LabelDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  );
}`;
