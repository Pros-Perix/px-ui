import { Progress } from "@px-ui/core";

export function ProgressBasicDemo() {
  return (
    <Progress.Root value={65} className="w-full max-w-md">
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
    </Progress.Root>
  );
}
