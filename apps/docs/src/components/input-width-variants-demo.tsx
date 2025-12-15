import { Input } from "@px-ui/core";

export function InputWidthVariantsDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Input widthVariant="enforced" placeholder="Enforced width" />
        <span className="text-ppx-neutral-11 text-xs">
          Enforced (min-width with fixed size)
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Input widthVariant="full" placeholder="Full width" />
        <span className="text-ppx-neutral-11 text-xs">Full (100% width)</span>
      </div>
    </div>
  );
}
