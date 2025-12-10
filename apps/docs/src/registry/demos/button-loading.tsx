import { Button, Spinner } from "@px-ui/core";

export function ButtonLoadingDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button disabled>
        <Spinner size="small" />
        Loading...
      </Button>
      <Button variant="primary" disabled>
        <Spinner size="small" />
        Saving...
      </Button>
    </div>
  );
}

export const ButtonLoadingDemoSource = `import { Button, Spinner } from "@px-ui/core";

export function ButtonLoadingDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button disabled>
        <Spinner size="small" />
        Loading...
      </Button>
      <Button variant="primary" disabled>
        <Spinner size="small" />
        Saving...
      </Button>
    </div>
  );
}`;
