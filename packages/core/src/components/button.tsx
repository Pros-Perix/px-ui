import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors disabled:cursor-not-allowed shrink-0 [&_svg]:shrink-0 outline-none rounded-ppx-s font-medium focus-visible:ring-3 focus-visible:ring-ppx-neutral-17/30",
  {
    variants: {
      variant: {
        default:
          "bg-ppx-neutral-11 text-white shadow-xs not-disabled:hover:bg-ppx-neutral-10 not-disabled:active:bg-ppx-neutral-11 disabled:bg-ppx-neutral-6",
        primary:
          "bg-ppx-primary-5 text-white shadow-xs not-disabled:hover:bg-ppx-primary-4 not-disabled:active:bg-ppx-primary-5 disabled:bg-ppx-primary-2 disabled:text-ppx-neutral-8",
        destructive:
          "bg-ppx-red-5 text-white shadow-xs hover:bg-ppx-red-4 not-disabled:active:bg-ppx-red-5 disabled:bg-ppx-red-2 disabled:text-ppx-neutral-13",
        outline:
          "shadow-xs not-disabled:hover:bg-ppx-neutral-2 not-disabled:active:bg-ppx-neutral-3 disabled:border-ppx-neutral-7 border border-ppx-neutral-11 text-ppx-neutral-11 disabled:text-ppx-neutral-7",
        "primary-outline":
          "shadow-xs not-disabled:hover:bg-ppx-primary-1 not-disabled:active:bg-ppx-primary-2/50 disabled:text-ppx-primary-2 disabled:border-ppx-primary-2 border border-ppx-primary-5 text-ppx-primary-5",
        ghost:
          "not-disabled:hover:bg-ppx-neutral-2 not-disabled:active:bg-ppx-neutral-3 not-disabled:hover:text-black text-ppx-neutral-12 disabled:opacity-70",
        link: "text-ppx-neutral-12 underline-offset-4 underline cursor-pointer not-disabled:hover:bg-ppx-neutral-2 not-disabled:active:bg-ppx-neutral-3 disabled:opacity-70",
      },
      size: {
        default: "px-4 py-2 h-10 has-[>svg]:px-3 text-ppx-base",
        sm: "gap-1.5 px-3 has-[>svg]:px-2.5 h-8 text-ppx-sm",
        lg: "px-6 h-12 text-ppx-base font-sans-sb has-[>svg]:px-4",
        "icon-sm": "size-8",
        icon: "size-10 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
