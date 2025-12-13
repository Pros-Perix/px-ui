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
        "not-prose border-ppx-neutral-4 flex min-h-[150px] items-center justify-center rounded-lg border p-6",
        className,
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
        className,
      )}
    >
      {children}
    </Preview>
  );
}

interface CodeBlockProps {
  children: React.ReactNode;
  maxHeight?: number;
}

export function CodeBlock({ children, maxHeight = 300 }: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [needsExpand, setNeedsExpand] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setNeedsExpand(height > maxHeight);
    }
  }, [maxHeight, children]);

  return (
    <div className="not-prose relative">
      <div
        ref={contentRef}
        className={cn(
          "overflow-hidden transition-all duration-200",
          !isExpanded && needsExpand && "relative",
        )}
        style={{
          maxHeight: isExpanded || !needsExpand ? "none" : `${maxHeight}px`,
        }}
      >
        {children}
        {!isExpanded && needsExpand && (
          <div className="from-ppx-neutral-4 pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t to-transparent" />
        )}
      </div>
      {needsExpand && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="border-ppx-neutral-3 bg-ppx-neutral-1 text-ppx-neutral-11 hover:bg-ppx-neutral-2 hover:text-ppx-neutral-12 mt-2 w-full rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
