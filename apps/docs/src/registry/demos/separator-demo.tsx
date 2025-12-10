import { Separator } from "@px-ui/core";

export function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">PX-UI</h4>
        <p className="text-sm text-ppx-muted-foreground">
          A modern React component library.
        </p>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>GitHub</span>
      </div>
    </div>
  );
}

export const SeparatorDemoSource = `import { Separator } from "@px-ui/core";

export function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">PX-UI</h4>
        <p className="text-sm text-ppx-muted-foreground">
          A modern React component library.
        </p>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>GitHub</span>
      </div>
    </div>
  );
}`;
