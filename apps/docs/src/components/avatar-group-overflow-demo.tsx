import { AvatarGroup } from "@px-ui/core";

export function AvatarGroupOverflowDemo() {
  const avatars = [
    { name: "Alice Johnson", imgSrc: null, size: "40px", variant: "rounded" as const },
    { name: "Bob Smith", imgSrc: null, size: "40px", variant: "rounded" as const },
    { name: "Carol Williams", imgSrc: null, size: "40px", variant: "rounded" as const },
    { name: "David Brown", imgSrc: null, size: "40px", variant: "rounded" as const },
    { name: "Eve Martinez", imgSrc: null, size: "40px", variant: "rounded" as const },
    { name: "Frank Davis", imgSrc: null, size: "40px", variant: "rounded" as const },
    { name: "Grace Wilson", imgSrc: null, size: "40px", variant: "rounded" as const },
    { name: "Henry Taylor", imgSrc: null, size: "40px", variant: "rounded" as const },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <AvatarGroup avatars={avatars} max={4} />
        <span className="text-ppx-neutral-11 text-xs">
          Max 4 avatars (hover +N to see all)
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <AvatarGroup avatars={avatars} max={6} />
        <span className="text-ppx-neutral-11 text-xs">Max 6 avatars</span>
      </div>
    </div>
  );
}
