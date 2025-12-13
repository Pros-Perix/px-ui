import { Avatar } from "@px-ui/core";

export function AvatarInitialsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar name="John Doe" size="48px" variant="rounded" />
      <Avatar name="Jane Smith" size="48px" variant="rounded" />
      <Avatar name="Robert Johnson" size="48px" variant="rounded" />
      <Avatar name="Emily Davis" size="48px" variant="rounded" />
      <Avatar name="Michael Wilson" size="48px" variant="rounded" />
    </div>
  );
}
