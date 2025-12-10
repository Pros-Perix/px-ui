import * as React from "react";
import { cn } from "@px-ui/core";

interface PreviewProps {
  children: React.ReactNode;
  className?: string;
}

export function Preview({ children, className }: PreviewProps) {
  return (
    <div
      className={cn(
        "not-prose flex min-h-[150px] items-center justify-center rounded-lg border border-ppx-neutral-3 bg-ppx-neutral-1 p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

interface PreviewStackProps {
  children: React.ReactNode;
  className?: string;
  direction?: "row" | "column";
}

export function PreviewStack({
  children,
  className,
  direction = "row",
}: PreviewStackProps) {
  return (
    <Preview
      className={cn(
        direction === "row" ? "flex-row flex-wrap gap-4" : "flex-col gap-4",
        className
      )}
    >
      {children}
    </Preview>
  );
}
