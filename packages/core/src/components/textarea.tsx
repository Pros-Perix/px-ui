import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "../utils";

const textareaVariants = cva(
  "font-medium shadow-xs border-ppx-neutral-5 bg-ppx-neutral-1 text-ppx-sm text-ppx-foreground outline-transparent focus:-outline-offset-1 focus:outline-2 placeholder:text-ppx-sm placeholder:text-ppx-neutral-12 focus:not-aria-invalid:outline-ppx-primary-focus focus:not-aria-invalid:bg-ppx-background disabled:cursor-not-allowed disabled:border-ppx-neutral-3 disabled:bg-ppx-neutral-3 disabled:text-ppx-neutral-11 disabled:placeholder:text-ppx-neutral-11 aria-invalid:outline-ppx-red-4 aria-invalid:bg-ppx-red-1 aria-invalid:outline aria-invalid:-outline-offset-1 placeholder:font-sans-light p-input border",
  {
    variants: {
      size: {
        default: "min-h-16 rounded-input",
        sm: "min-h-12 rounded-input-s",
      },
      widthVariant: {
        enforced: "min-w-input w-[var(--min-width-input)]",
        full: "min-w-0 w-full",
      },
    },
    defaultVariants: {
      size: "default",
      widthVariant: "full",
    },
  },
);

export interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {
  invalid?: boolean;
}

function Textarea({
  className,
  size,
  invalid,
  widthVariant,
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ size, widthVariant }), className)}
      aria-invalid={invalid}
      {...props}
    />
  );
}

export { Textarea };
