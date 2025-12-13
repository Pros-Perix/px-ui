import { Avatar } from "@px-ui/core";

export function AvatarVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar
          imgSrc="https://github.com/shadcn.png"
          name="Acme Inc"
          size="48px"
          variant="squared"
        />
        <span className="text-ppx-neutral-11 text-xs">Squared</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          imgSrc="https://github.com/shadcn.png"
          name="John Doe"
          size="48px"
          variant="rounded"
        />
        <span className="text-ppx-neutral-11 text-xs">Rounded</span>
      </div>
    </div>
  );
}
