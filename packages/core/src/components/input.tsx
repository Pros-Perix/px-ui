import * as React from "react";
import { cn } from "../utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "font-medium shadow-xs inline-flex border-ppx-neutral-5 bg-ppx-neutral-1 text-ppx-sm text-ppx-foreground outline-transparent focus:-outline-offset-1 focus:outline-2 placeholder:text-ppx-sm placeholder:text-ppx-neutral-12 focus:not-aria-invalid:outline-ppx-primary-focus focus:not-aria-invalid:not-aria-disabled:bg-ppx-background focus:not-aria-invalid:bg-white disabled:cursor-not-allowed disabled:border-ppx-neutral-3 disabled:bg-ppx-neutral-3 disabled:text-ppx-neutral-11 disabled:placeholder:text-ppx-neutral-11 aria-invalid:outline-ppx-red-4 aria-invalid:bg-ppx-red-1 aria-invalid:outline aria-invalid:-outline-offset-1 placeholder:font-sans-light p-input border",
  {
    variants: {
      size: {
        default: "h-input rounded-input",
        sm: "h-input-s rounded-input-s",
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

interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  invalid?: boolean;
}

function Input({
  className,
  size,
  invalid,
  widthVariant,
  ...props
}: InputProps) {
  return (
    <input
      data-slot="input"
      className={cn(
        inputVariants({ size, widthVariant }),
        props.type === "number" && "no-arrow-spin",
        className,
      )}
      aria-invalid={invalid}
      {...props}
    />
  );
}

export { Input };
