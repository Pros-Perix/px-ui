import { Button } from "@px-ui/core";

export function ButtonDisabledDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled>Default Disabled</Button>
      <Button variant="primary" disabled>
        Primary Disabled
      </Button>
      <Button variant="destructive" disabled>
        Destructive Disabled
      </Button>
      <Button variant="outline" disabled>
        Outline Disabled
      </Button>
      <Button variant="ghost" disabled>
        Ghost Disabled
      </Button>
    </div>
  );
}
