import { Avatar } from "@px-ui/core";

export function AvatarSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar
          imgSrc="https://github.com/shadcn.png"
          name="John Doe"
          size="32px"
          variant="rounded"
        />
        <span className="text-ppx-neutral-11 text-xs">32px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          imgSrc="https://github.com/shadcn.png"
          name="John Doe"
          size="40px"
          variant="rounded"
        />
        <span className="text-ppx-neutral-11 text-xs">40px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          imgSrc="https://github.com/shadcn.png"
          name="John Doe"
          size="48px"
          variant="rounded"
        />
        <span className="text-ppx-neutral-11 text-xs">48px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          imgSrc="https://github.com/shadcn.png"
          name="John Doe"
          size="64px"
          variant="rounded"
        />
        <span className="text-ppx-neutral-11 text-xs">64px</span>
      </div>
    </div>
  );
}
