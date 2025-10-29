import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";
import { Button as ButtonComponent } from "./button";

const inputGroupVariants = cva(
  "group/input-group relative flex items-center border border-ppx-neutral-5 bg-ppx-neutral-1 outline-transparent has-[[data-slot=input-group-control]:focus-visible]:outline-2 has-[[data-slot=input-group-control]:focus-visible]:-outline-offset-1 has-[[data-slot=input-group-control]:focus-visible]:bg-white has-[[data-slot=input-group-control]:focus-visible]:outline-ppx-primary-2 has-[[data-slot][aria-invalid=true]]:outline-ppx-red-4 has-[[data-slot][aria-invalid=true]]:outline has-[[data-slot][aria-invalid=true]]:-outline-offset-1 has-[[data-slot][aria-invalid=true]]:bg-ppx-red-1 has-[[data-slot=input-group-control]:disabled]:*:cursor-not-allowed has-[[data-slot=input-group-control]:disabled]:border-ppx-neutral-3 has-[[data-slot=input-group-control]:disabled]:bg-ppx-neutral-3 has-[[data-slot=input-group-control]:disabled]:text-ppx-neutral-11 has-[>[data-align=inline-start]]:[&>input]:pl-2 has-[>[data-align=inline-end]]:[&>input]:pr-2",
  {
    variants: {
      size: {
        default: "h-input rounded-input",
        sm: "h-input-s rounded-input-s",
      },
      widthVariant: {
        enforced: "min-w-input w-[var(--min-width-input)]",
        fit: "min-w-0 w-fit",
        full: "min-w-0 w-full",
      },
    },
    defaultVariants: {
      size: "default",
      widthVariant: "enforced",
    },
  },
);

export function Root({
  className,
  size,
  disabled,
  widthVariant,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupVariants> & { disabled?: boolean }) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(inputGroupVariants({ size, widthVariant }), className)}
      data-disabled={disabled}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "text-ppx-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem]",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

export function Addon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva(
  "text-ppx-sm shadow-none flex gap-2 items-center",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 px-2 rounded-input [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
        sm: "h-8 px-2.5 gap-1.5 rounded-input has-[>svg]:px-2.5",
        "icon-xs": "size-6 rounded-input p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  },
);

export function Button({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof ButtonComponent>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <ButtonComponent
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

export function Text({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 flex items-center text-ppx-muted-foreground [&_svg]:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

export function Input({
  className,
  invalid,
  ...props
}: React.ComponentProps<"input"> & { invalid?: boolean }) {
  return (
    <input
      data-slot="input-group-control"
      aria-invalid={invalid}
      className={cn(
        "font-medium min-w-0 flex-1 rounded-none border-0 bg-transparent p-input text-ppx-sm text-ppx-foreground placeholder:font-sans-light placeholder:text-ppx-sm placeholder:text-ppx-neutral-12 focus:outline-none disabled:placeholder:text-ppx-neutral-11",
        props.type === "number" && "no-arrow-spin",
        className,
      )}
      {...props}
    />
  );
}
