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

export const Root = Progress.Root;

export function Track({
  className,
  size,
  children,
  ...props
}: React.ComponentProps<typeof Progress.Track> &
  VariantProps<typeof progressTrackVariants>) {
  return (
    <Progress.Track
      className={cn(progressTrackVariants({ size }), className)}
      {...props}
    >
      {children}
    </Progress.Track>
  );
}

export function Indicator({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Indicator>) {
  return (
    <Progress.Indicator
      className={cn(progressIndicatorVariants(), className)}
      {...props}
    />
  );
}

export function Label({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Label>) {
  return (
    <Progress.Label
      className={cn(progressLabelVariants(), className)}
      {...props}
    />
  );
}

export function Value({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Value>) {
  return (
    <Progress.Value
      className={cn(progressValueVariants(), className)}
      {...props}
    />
  );
}

