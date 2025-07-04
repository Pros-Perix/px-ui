import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";

import { cn } from "../utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckbox.Root>) {
  return (
    <BaseCheckbox.Root
      data-slot="checkbox"
      className={cn(
        "peer bg-input focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:text-destructive aria-invalid:focus:ring-destructive/50 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-[indeterminate]:text-foreground flex size-4 items-center justify-center rounded-[4px] border transition-colors duration-150 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <BaseCheckbox.Indicator
        data-slot="checkbox-indicator"
        className="block data-[unchecked]:hidden"
      >
        {props.indeterminate ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5"
          >
            <path d="M5 12h14" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}

export { Checkbox };
