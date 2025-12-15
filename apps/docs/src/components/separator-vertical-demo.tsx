import { Separator } from "@px-ui/core";

export function SeparatorVerticalDemo() {
  return (
    <div className="flex h-20 items-center space-x-4">
      <div className="text-ppx-sm">Profile</div>
      <Separator orientation="vertical" />
      <div className="text-ppx-sm">Settings</div>
      <Separator orientation="vertical" />
      <div className="text-ppx-sm">Help</div>
      <Separator orientation="vertical" />
      <div className="text-ppx-sm">Logout</div>
    </div>
  );
}
