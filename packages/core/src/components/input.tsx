import * as React from "react";
import { cn } from "../utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "min-w-2xs font-medium placeholder:font-light shadow-xs inline-flex border-ppx-neutral-5 bg-ppx-neutral-1 text-ppx-sm text-ppx-foreground transition-[color,box-shadow] outline-none placeholder:text-ppx-sm! placeholder:text-ppx-neutral-12 focus:border-ppx-primary-2 disabled:cursor-not-allowed disabled:border-ppx-neutral-3 disabled:bg-ppx-neutral-3 disabled:text-ppx-neutral-11 disabled:placeholder:text-ppx-neutral-11 aria-invalid:border-ppx-red-4 aria-invalid:bg-ppx-red-1 aria-invalid:ring-ppx-red-2",
  {
    variants: {
      size: {
        default: "h-input p-input rounded-input border focus:border-[1.5px]",
        sm: "h-input-s p-input-s rounded-input-s border focus:border-[1.5px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function Input({
  className,
  size,
  invalid,
  ...props
}: React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & { invalid?: boolean }) {
  return (
    <input
      data-slot="input"
      className={cn(
        inputVariants({ size }),
        props.type === "number" && "no-arrow-spin",
        className,
      )}
      aria-invalid={invalid}
      {...props}
    />
  );
}

export { Input };
