import { Separator } from "@px-ui/core";

export function SeparatorHorizontalDemo() {
  return (
    <div className="w-full max-w-md">
      <div className="space-y-1">
        <h4 className="text-ppx-sm font-medium">Profile Settings</h4>
        <p className="text-ppx-neutral-11 text-ppx-xs">
          Manage your account preferences
        </p>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-ppx-sm">
        <div>Account</div>
        <Separator orientation="vertical" />
        <div>Privacy</div>
        <Separator orientation="vertical" />
        <div>Security</div>
      </div>
    </div>
  );
}
