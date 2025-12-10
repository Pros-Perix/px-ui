import { Avatar } from "@px-ui/core";

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar
        imgSrc="https://github.com/shadcn.png"
        name="John Doe"
        size="40px"
        variant="rounded"
      />
      <Avatar name="Jane Smith" size="40px" variant="rounded" />
      <Avatar name="Acme Inc" size="40px" variant="squared" />
    </div>
  );
}

export const AvatarDemoSource = `import { Avatar } from "@px-ui/core";

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar
        imgSrc="https://github.com/shadcn.png"
        name="John Doe"
        size="40px"
        variant="rounded"
      />
      <Avatar name="Jane Smith" size="40px" variant="rounded" />
      <Avatar name="Acme Inc" size="40px" variant="squared" />
    </div>
  );
}`;
