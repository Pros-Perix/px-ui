import { Spinner } from "@px-ui/core";

export function SpinnerDemo() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
    </div>
  );
}

export const SpinnerDemoSource = `import { Spinner } from "@px-ui/core";

export function SpinnerDemo() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
    </div>
  );
}`;
