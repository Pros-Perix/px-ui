import * as React from 'react';

interface ComponentPreviewProps {
  children: React.ReactNode;
  className?: string;
}

export function ComponentPreview({ children, className }: ComponentPreviewProps) {
  return (
    <div
      className={`
        not-prose my-6 flex min-h-[200px] w-full items-center justify-center
        rounded-lg border border-neutral-200 bg-white p-8
        dark:border-neutral-800 dark:bg-neutral-950
        ${className || ''}
      `.trim()}
    >
      {children}
    </div>
  );
}
