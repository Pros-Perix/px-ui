import { Spinner, Button } from "@px-ui/core";

export function SpinnerLoadingDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center rounded-lg border border-ppx-neutral-5 bg-ppx-neutral-1 p-8">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="medium" />
          <span className="text-ppx-sm text-ppx-neutral-11">
            Loading content...
          </span>
        </div>
      </div>

      <Button disabled>
        <Spinner size="small" />
        Loading...
      </Button>
    </div>
  );
}
