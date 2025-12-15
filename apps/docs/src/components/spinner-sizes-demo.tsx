import { Spinner } from "@px-ui/core";

export function SpinnerSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="small" />
        <span className="text-ppx-neutral-11 text-xs">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="medium" />
        <span className="text-ppx-neutral-11 text-xs">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="large" />
        <span className="text-ppx-neutral-11 text-xs">Large</span>
      </div>
    </div>
  );
}
