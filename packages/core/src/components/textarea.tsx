import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "../utils";

const textareaVariants = cva(
  "min-w-input font-medium placeholder:font-light shadow-xs border-ppx-neutral-5 bg-ppx-neutral-1 text-ppx-sm text-ppx-foreground transition-[color,box-shadow,outline] outline-transparent focus:-outline-offset-1 focus:outline-2 placeholder:text-ppx-sm! placeholder:text-ppx-neutral-12 focus:not-aria-invalid:outline-ppx-primary-2 focus:not-aria-invalid:bg-white disabled:cursor-not-allowed disabled:border-ppx-neutral-3 disabled:bg-ppx-neutral-3 disabled:text-ppx-neutral-11 disabled:placeholder:text-ppx-neutral-11 aria-invalid:outline-ppx-red-4 aria-invalid:bg-ppx-red-1 aria-invalid:outline aria-invalid:-outline-offset-1",
  {
    variants: {
      size: {
        default: "min-h-16 p-input rounded-input border focus:border-[1.5px]",
        sm: "min-h-12 p-input-s rounded-input-s border focus:border-[1.5px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function Textarea({
  className,
  size,
  invalid,
  ...props
}: React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants> & { invalid?: boolean }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ size }), className)}
      aria-invalid={invalid}
      {...props}
    />
  );
}

export { Textarea };
