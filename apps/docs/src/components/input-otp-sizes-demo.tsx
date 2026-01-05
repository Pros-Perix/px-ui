import { OtpInput } from "@px-ui/core";

export function OtpInputSizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <OtpInput size="sm" length={6} />
        <span className="text-ppx-neutral-11 text-xs">Small</span>
      </div>
      <div className="flex flex-col gap-2">
        <OtpInput size="default" length={6} />
        <span className="text-ppx-neutral-11 text-xs">Default</span>
      </div>
    </div>
  );
}

