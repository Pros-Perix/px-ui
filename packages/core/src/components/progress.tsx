import * as React from "react";
import { cn } from "../utils";
import { cva, VariantProps } from "class-variance-authority";
import { Progress } from "@base-ui-components/react/progress";

const progressTrackVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-ppx-neutral-3",
  {
    variants: {
      size: {
        default: "h-2",
        sm: "h-1.5",
        lg: "h-3",
      },
      variant: {
        default: "bg-ppx-neutral-3",
        success: "bg-ppx-neutral-3",
        warning: "bg-ppx-neutral-3",
        error: "bg-ppx-neutral-3",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
);

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-ppx-primary-b-5",
        success: "bg-ppx-green-5",
        warning: "bg-ppx-yellow-5",
        error: "bg-ppx-red-5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const progressLabelVariants = cva(
  "text-ppx-sm font-medium text-ppx-foreground mb-2 block",
  {
    variants: {
      showValue: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      showValue: true,
    },
  },
);

const progressValueVariants = cva(
  "text-ppx-sm font-medium text-ppx-muted-foreground",
  {
    variants: {
      position: {
        inline: "ml-2",
        bottom: "block mt-1",
      },
    },
    defaultVariants: {
      position: "inline",
    },
  },
);

export interface ProgressBarProps extends VariantProps<typeof progressTrackVariants> {
  /**
   * The current value of the progress bar (0 to max).
   */
  value: number;
  /**
   * The maximum value of the progress bar.
   * @default 100
   */
  max?: number;
  /**
   * The minimum value of the progress bar.
   * @default 0
   */
  min?: number;
  /**
   * An accessible label for the progress bar.
   */
  label?: string;
  /**
   * Whether to show the current value as text.
   * @default true
   */
  showValue?: boolean;
  /**
   * Position of the value text relative to the progress bar.
   * @default "inline"
   */
  valuePosition?: "inline" | "bottom";
  /**
   * Additional class name for the root element.
   */
  className?: string;
  /**
   * Whether the progress bar is indeterminate (animated loading state).
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Format options for the value display.
   */
  formatOptions?: Intl.NumberFormatOptions;
}

export function ProgressBar({
  value,
  max = 100,
  min = 0,
  label,
  showValue = true,
  valuePosition = "inline",
  size,
  variant,
  className,
  indeterminate = false,
  formatOptions,
  ...props
}: ProgressBarProps) {
  const progressValue = indeterminate ? null : Math.max(min, Math.min(max, value));

  return (
    <div className={cn("w-full", className)} {...props}>
      <Progress.Root
        value={progressValue}
        max={max}
        min={min}
        format={formatOptions}
      >
        {label && (
          <Progress.Label className={cn(progressLabelVariants({ showValue }))}>
            {label}
            {showValue && valuePosition === "inline" && !indeterminate && (
              <Progress.Value
                className={cn(progressValueVariants({ position: "inline" }))}
              />
            )}
          </Progress.Label>
        )}

        <Progress.Track className={cn(progressTrackVariants({ size, variant }))}>
          <Progress.Indicator
            className={cn(progressIndicatorVariants({ variant }))}
          />
        </Progress.Track>

        {showValue && valuePosition === "bottom" && !indeterminate && (
          <Progress.Value
            className={cn(progressValueVariants({ position: "bottom" }))}
          />
        )}
      </Progress.Root>
    </div>
  );
}
