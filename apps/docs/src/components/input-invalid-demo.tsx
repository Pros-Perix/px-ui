import { Input } from "@px-ui/core";

export function InputInvalidDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Input placeholder="Valid input" />
        <span className="text-ppx-neutral-11 text-xs">Normal state</span>
      </div>
      <div className="flex flex-col gap-2">
        <Input invalid placeholder="Invalid input" />
        <span className="text-ppx-neutral-11 text-xs">
          Invalid state with error styling
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Input disabled placeholder="Disabled input" />
        <span className="text-ppx-neutral-11 text-xs">Disabled state</span>
      </div>
    </div>
  );
}
