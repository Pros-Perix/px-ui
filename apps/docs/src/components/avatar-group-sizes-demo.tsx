import { AvatarGroup } from "@px-ui/core";

export function AvatarGroupSizesDemo() {
  const createAvatars = (size: string) => [
    { name: "Alice Johnson", imgSrc: null, size, variant: "rounded" as const },
    { name: "Bob Smith", imgSrc: null, size, variant: "rounded" as const },
    { name: "Carol Williams", imgSrc: null, size, variant: "rounded" as const },
    { name: "David Brown", imgSrc: null, size, variant: "rounded" as const },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <AvatarGroup avatars={createAvatars("32px")} />
        <span className="text-ppx-neutral-11 text-xs">Small (32px)</span>
      </div>
      <div className="flex flex-col gap-2">
        <AvatarGroup avatars={createAvatars("40px")} />
        <span className="text-ppx-neutral-11 text-xs">Default (40px)</span>
      </div>
      <div className="flex flex-col gap-2">
        <AvatarGroup avatars={createAvatars("48px")} />
        <span className="text-ppx-neutral-11 text-xs">Large (48px)</span>
      </div>
    </div>
  );
}
