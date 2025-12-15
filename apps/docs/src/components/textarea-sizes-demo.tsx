import { Textarea } from "@px-ui/core";

export function TextareaSizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Textarea size="sm" placeholder="Small textarea" />
        <span className="text-ppx-neutral-11 text-xs">
          Small (min-height: 3rem)
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Textarea size="default" placeholder="Default textarea" />
        <span className="text-ppx-neutral-11 text-xs">
          Default (min-height: 4rem)
        </span>
      </div>
    </div>
  );
}
