import { Textarea } from "@px-ui/core";

export function TextareaInvalidDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Textarea placeholder="Valid textarea" />
        <span className="text-ppx-neutral-11 text-xs">Normal state</span>
      </div>
      <div className="flex flex-col gap-2">
        <Textarea invalid placeholder="Invalid textarea" />
        <span className="text-ppx-neutral-11 text-xs">
          Invalid state with error styling
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Textarea disabled placeholder="Disabled textarea" />
        <span className="text-ppx-neutral-11 text-xs">Disabled state</span>
      </div>
    </div>
  );
}
