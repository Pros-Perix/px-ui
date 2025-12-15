import { Progress } from "@px-ui/core";

export function ProgressSizesDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Progress.Root value={40}>
          <Progress.Track size="sm">
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
        <span className="text-ppx-neutral-11 text-xs">Small</span>
      </div>

      <div className="flex flex-col gap-2">
        <Progress.Root value={60}>
          <Progress.Track size="default">
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
        <span className="text-ppx-neutral-11 text-xs">Default</span>
      </div>

      <div className="flex flex-col gap-2">
        <Progress.Root value={80}>
          <Progress.Track size="lg">
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
        <span className="text-ppx-neutral-11 text-xs">Large</span>
      </div>
    </div>
  );
}
