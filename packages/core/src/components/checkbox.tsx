import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";

import { cn } from "../utils";
import { cva, VariantProps } from "class-variance-authority";

const checkboxVariants = cva(
  "peer aria-invalid:border-ppx-destructive aria-invalid:text-shadow-ppx-destructive-foreground flex items-center justify-center rounded-sm border transition-colors duration-150 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white data-checked:bg-ppx-green-5 data-[indeterminate]:bg-ppx-green-5 data-checked:text-white data-[indeterminate]:text-white  border-ppx-gray-10 data-checked:border-ppx-green-5 data-[indeterminate]:border-ppx-green-5",
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
  }
);

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckbox.Root> &
  VariantProps<typeof checkboxVariants>) {
  return (
    <BaseCheckbox.Root
      data-slot="checkbox"
      className={cn(
        checkboxVariants({
          variant: props.variant,
          size: props.size,
        }),
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
