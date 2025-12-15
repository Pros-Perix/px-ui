import { Progress } from "@px-ui/core";

export function ProgressWithLabelDemo() {
  return (
    <Progress.Root value={45} className="w-full max-w-md">
      <div className="mb-2 flex items-center justify-between">
        <Progress.Label>Uploading files...</Progress.Label>
        <Progress.Value />
      </div>
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
    </Progress.Root>
  );
}
