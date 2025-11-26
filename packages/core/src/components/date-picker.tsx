import * as React from "react";
import { format as formatDate } from "date-fns";
import { cn } from "../utils";
import { Calendar } from "./calendar";
import * as Popover from "./popover";
import { triggerVariants } from "../tw-styles/dropdown";
import type { VariantProps } from "class-variance-authority";
import CalenderIcon from "../icons/calendar-icon";
import { OnSelectHandler } from "react-day-picker";

type CalendarProps = React.ComponentProps<typeof Calendar>;

type DatePickerProps = {
  placeholder?: string;
  format?: string;
  trailingIcon?: React.ReactNode;
  invalid?: boolean;

  triggerProps?: VariantProps<typeof triggerVariants> & {
    className?: string;
    disabled?: boolean;
  };

  renderTriggerContent?: React.ReactNode;

  popoverRootProps?: Omit<
    React.ComponentProps<typeof Popover.Root>,
    "children"
  >;
  popoverContentProps?: React.ComponentProps<typeof Popover.Content>;
} & CalendarProps;

export function DatePicker({
  triggerProps,
  placeholder = "Pick a date",
  format = "yyyy-MM-dd",
  invalid,
  trailingIcon,
  renderTriggerContent,

  popoverRootProps,
  popoverContentProps,

  ...calendarProps
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect: OnSelectHandler<Date> = (...args) => {
    (calendarProps as Record<string, any>).onSelect(...args);
    !calendarProps.mode || (calendarProps.mode === "single" && setOpen(false));
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen} {...popoverRootProps}>
      <Popover.Trigger
        disabled={triggerProps?.disabled}
        className={cn(
          triggerVariants({
            size: triggerProps?.size,
            widthVariant: triggerProps?.widthVariant,
          }),
          "gap-2.5",
          triggerProps?.className,
        )}
        aria-invalid={invalid}
        aria-label="Open date picker"
      >
        {renderFormattedDate(calendarProps, format) || placeholder}

        {trailingIcon ?? (
          <CalenderIcon
            className={cn(
              "size-5 shrink-0 text-ppx-foreground",
              triggerProps?.disabled && "opacity-50",
            )}
          />
        )}
      </Popover.Trigger>
      <Popover.Content
        className={cn("p-0", popoverContentProps?.className)}
        {...popoverContentProps}
      >
        {/* @ts-expect-error */}
        <Calendar {...calendarProps} onSelect={handleSelect} />
      </Popover.Content>
    </Popover.Root>
  );
}

function renderFormattedDate(calendarProps: CalendarProps, format: string) {
  if (calendarProps.mode === "single" && calendarProps.selected) {
    return formatDate(calendarProps.selected, format);
  }

  if (calendarProps.mode === "range" && calendarProps.selected?.from) {
    let formattedDate = formatDate(calendarProps.selected.from, format);

    if (
      calendarProps.selected.to &&
      calendarProps.selected.from !== calendarProps.selected.to
    ) {
      formattedDate = `${formattedDate} - ${formatDate(calendarProps.selected.to, format)}`;
    }

    return formattedDate;
  }

  if (calendarProps.mode === "multiple" && calendarProps.selected?.length) {
    return calendarProps.selected
      .map((date) => formatDate(date, format))
      .join(", ");
  }

  return "";
}
