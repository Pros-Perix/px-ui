import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors disabled:pointer-events-none disabled:cursor-not-allowed shrink-0 [&_svg]:shrink-0 outline-none",
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
          "shadow-xs not-disabled:hover:bg-ppx-green-1 not-disabled:active:bg-ppx-green-2/50 disabled:text-ppx-green-2 disabled:border-ppx-green-2 border border-ppx-green-5 text-ppx-green-5",
        ghost:
          "not-disabled:hover:bg-ppx-gray-2 not-disabled:active:bg-ppx-gray-3 not-disabled:hover:text-black text-ppx-gray-12 disabled:opacity-70",
        link: "text-ppx-gray-12 underline-offset-4 underline cursor-pointer not-disabled:hover:bg-ppx-gray-2 not-disabled:active:bg-ppx-gray-3 disabled:opacity-70",
      },
      size: {
        default: "px-5 py-3 text-ppx-base font-medium rounded-ppx-m",
        sm: "gap-1.5 px-4 py-2 text-ppx-sm font-medium rounded-ppx-s",
        lg: "px-6 py-4 text-ppx-base font-bold rounded-ppx-l",
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
