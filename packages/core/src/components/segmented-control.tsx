import * as React from "react";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const segmentedControlItemVariants = cva(
  "relative flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer rounded-full whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ppx-primary-5 focus-visible:ring-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-ppx-neutral-11 data-checked:bg-ppx-primary-5 data-checked:text-white data-checked:shadow-sm hover:text-ppx-neutral-12",
      },
      size: {
        default: "min-h-10 px-6",
        sm: "min-h-8 px-4 text-xs",
        lg: "min-h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Root({
  className,
  ...props
}: React.ComponentProps<typeof BaseRadioGroup>) {
  return (
    <BaseRadioGroup
      data-slot="segmented-control"
      className={cn(
        "bg-ppx-neutral-3 inline-flex items-center rounded-full p-1",
        className,
      )}
      {...props}
    />
  );
}

export function Item({
  children,
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Radio.Root> &
  VariantProps<typeof segmentedControlItemVariants> & {
    children: React.ReactNode;
  }) {
  return (
    <Radio.Root
      data-slot="segmented-control-item"
      className={cn(segmentedControlItemVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Radio.Root>
  );
}
