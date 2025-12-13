import { Avatar } from "@px-ui/core";

export function AvatarWithBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="relative">
        <Avatar
          imgSrc="https://github.com/shadcn.png"
          name="John Doe"
          size="48px"
          variant="rounded"
        />
        <div className="bg-ppx-green-5 border-ppx-neutral-1 absolute bottom-0 right-0 size-3 rounded-full border-2" />
      </div>

      <div className="relative">
        <Avatar
          imgSrc="https://github.com/shadcn.png"
          name="Jane Smith"
          size="48px"
          variant="rounded"
        />
        <div className="bg-ppx-yellow-5 border-ppx-neutral-1 absolute bottom-0 right-0 size-3 rounded-full border-2" />
      </div>

      <div className="relative">
        <Avatar
          imgSrc="https://github.com/shadcn.png"
          name="Bob Wilson"
          size="48px"
          variant="rounded"
        />
        <div className="bg-ppx-neutral-8 border-ppx-neutral-1 absolute bottom-0 right-0 size-3 rounded-full border-2" />
      </div>
    </div>
  );
}
