import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-ppx-gray-11 text-white shadow-xs not-disabled:hover:bg-ppx-gray-10 not-disabled:active:bg-ppx-gray-11 disabled:bg-ppx-gray-6",
        primary:
          "bg-ppx-green-5 text-white shadow-xs not-disabled:hover:bg-ppx-green-4 not-disabled:active:bg-ppx-green-5 disabled:bg-ppx-green-2 disabled:text-ppx-gray-8",
        destructive:
          "bg-ppx-red-5 text-white shadow-xs hover:bg-ppx-red-4 not-disabled:active:bg-ppx-red-5 disabled:bg-ppx-red-2 disabled:text-ppx-gray-8",
        outline:
          "shadow-xs not-disabled:hover:text-ppx-green-4 not-disabled:hover:border-ppx-green-4 not-disabled:active:text-ppx-green-5 not-disabled:active:border-ppx-green-5 disabled:text-ppx-green-2 disabled:border-ppx-green-2 border border-ppx-green-5 text-ppx-green-5",
        secondary:
          "bg-ppx-secondary text-ppx-secondary-foreground shadow-xs hover:bg-ppx-secondary/80",
        ghost:
          "hover:bg-ppx-accent hover:text-ppx-accent-foreground dark:hover:bg-ppx-accent/50",
        link: "text-ppx-gray-12 underline-offset-4 hover:underline",
      },
      size: {
        default: "px-5 py-3 text-[0.8125rem] leading-4",
        sm: "rounded-md gap-1.5 px-4 py-2 text-base leading-5",
        lg: "rounded-md px-6 py-4 text-base leading-5",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export type Variant = VariantProps<typeof buttonVariants>["variant"];
export type Size = VariantProps<typeof buttonVariants>["size"];

export { Button, buttonVariants };
