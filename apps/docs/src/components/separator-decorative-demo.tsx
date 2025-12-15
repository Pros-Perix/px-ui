import { Separator } from "@px-ui/core";

export function SeparatorDecorativeDemo() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <p className="text-ppx-sm mb-2">Semantic separator (default)</p>
        <div className="space-y-1">
          <p className="text-ppx-xs text-ppx-neutral-11">Section A</p>
        </div>
        <Separator orientation="horizontal" className="my-4" />
        <div className="space-y-1">
          <p className="text-ppx-xs text-ppx-neutral-11">Section B</p>
        </div>
      </div>

      <div>
        <p className="text-ppx-sm mb-2">Decorative separator</p>
        <div className="space-y-1">
          <p className="text-ppx-xs text-ppx-neutral-11">Purely visual</p>
        </div>
        <Separator
          orientation="horizontal"
          decorative
          className="my-4"
        />
        <div className="space-y-1">
          <p className="text-ppx-xs text-ppx-neutral-11">
            Not announced by screen readers
          </p>
        </div>
      </div>
    </div>
  );
}
