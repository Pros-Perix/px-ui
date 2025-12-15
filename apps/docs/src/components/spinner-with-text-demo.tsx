import { Spinner } from "@px-ui/core";

export function SpinnerWithTextDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Spinner size="small" />
        <span className="text-ppx-sm">Loading...</span>
      </div>
      <div className="flex items-center gap-2">
        <Spinner size="medium" />
        <span className="text-ppx-sm">Processing your request...</span>
      </div>
      <div className="flex items-center gap-3">
        <Spinner size="large" />
        <span className="text-ppx-base">Please wait</span>
      </div>
    </div>
  );
}
