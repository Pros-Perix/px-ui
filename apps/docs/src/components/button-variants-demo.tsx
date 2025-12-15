import { Button } from "@px-ui/core";

export function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Button variant="default">Default</Button>
        <span className="text-ppx-neutral-11 text-xs">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button variant="primary">Primary</Button>
        <span className="text-ppx-neutral-11 text-xs">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button variant="destructive">Destructive</Button>
        <span className="text-ppx-neutral-11 text-xs">Destructive</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button variant="outline">Outline</Button>
        <span className="text-ppx-neutral-11 text-xs">Outline</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button variant="primary-outline">Primary Outline</Button>
        <span className="text-ppx-neutral-11 text-xs">Primary Outline</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button variant="ghost">Ghost</Button>
        <span className="text-ppx-neutral-11 text-xs">Ghost</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button variant="link">Link</Button>
        <span className="text-ppx-neutral-11 text-xs">Link</span>
      </div>
    </div>
  );
}
