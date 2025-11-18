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
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-300 ease-in-out bg-ppx-primary-b-5",
);

const progressLabelVariants = cva(
  "text-ppx-sm font-medium text-ppx-foreground",
);

const progressValueVariants = cva(
  "text-ppx-sm font-bold text-ppx-primary-b-5 flex-shrink-0",
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
  label?: React.ReactNode;
  /**
   * Whether to show the current value as text.
   * @default true
   */
  showValue?: boolean;
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
  size,
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
        {(label || (showValue && !indeterminate)) && (
          <div className="flex items-center justify-between mb-2">
            {label && (
              <Progress.Label className={cn(progressLabelVariants())}>
                {label}
              </Progress.Label>
            )}

            {showValue && !indeterminate && (
              <Progress.Value
                className={cn(progressValueVariants())}
              />
            )}
          </div>
        )}

        <Progress.Track className={cn(progressTrackVariants({ size }))}>
          <Progress.Indicator
            className={cn(progressIndicatorVariants())}
          />
        </Progress.Track>
      </Progress.Root>
    </div>
  );
}
