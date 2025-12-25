import * as React from "react";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";

import { cn } from "../utils";
import { cva, type VariantProps } from "class-variance-authority";

export function Group({
  className,
  ...props
}: React.ComponentProps<typeof BaseRadioGroup>) {
  return (
    <BaseRadioGroup
      data-slot="radio-group"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

const radioVariants = cva(
  "relative inline-flex bg-ppx-background aria-invalid:border-ppx-red-5 aspect-square shrink-0 rounded-full border border-ppx-neutral-10 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] data-disabled:cursor-not-allowed data-disabled:opacity-50 items-center justify-center",
  {
    variants: {
      variant: {
        default: "data-checked:border-ppx-primary-5 text-ppx-primary-5",
      },
      size: {
        default: "size-5",
        sm: "size-4",
        lg: "size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface RadioGroupItemProps
  extends React.ComponentProps<typeof Radio.Root>,
    VariantProps<typeof radioVariants> {}

export function Item({
  className,
  variant,
  size,
  ...props
}: RadioGroupItemProps) {
  return (
    <Radio.Root
      data-slot="radio-group-item"
      className={cn(radioVariants({ variant, size, className }))}
      {...props}
    >
      <Radio.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            size === "sm" && "size-2",
            size === undefined || size === "default" ? "size-3" : "",
            size === "lg" && "size-3.5",
          )}
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </Radio.Indicator>
    </Radio.Root>
  );
}
