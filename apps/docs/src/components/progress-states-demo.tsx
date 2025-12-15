import { Progress } from "@px-ui/core";

export function ProgressStatesDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Progress.Root value={0}>
        <div className="mb-2 flex items-center justify-between">
          <Progress.Label>Starting...</Progress.Label>
          <Progress.Value />
        </div>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>

      <Progress.Root value={50}>
        <div className="mb-2 flex items-center justify-between">
          <Progress.Label>In progress</Progress.Label>
          <Progress.Value />
        </div>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>

      <Progress.Root value={100}>
        <div className="mb-2 flex items-center justify-between">
          <Progress.Label>Complete!</Progress.Label>
          <Progress.Value />
        </div>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </div>
  );
}
