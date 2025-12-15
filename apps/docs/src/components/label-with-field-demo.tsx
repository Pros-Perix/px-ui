import { Label, Input, Checkbox, Switch } from "@px-ui/core";

export function LabelWithFieldDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="Enter your username" />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>

      <div className="flex items-center gap-2">
        <Switch id="newsletter" />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
    </div>
  );
}
