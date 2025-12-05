import * as React from "react";
import {
  DayButton,
  DayPicker,
  getDefaultClassNames,
  type DayPickerProps,
} from "react-day-picker";

import { cn } from "../utils";
import { Button, buttonVariants } from "./button";
import ChevronDownIcon from "../icons/chevron-down-icon";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  formatters,
  components,
  ...props
}: DayPickerProps) {
  const defaultClassNames = getDefaultClassNames();
  const buttonVariant = "ghost";

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar bg-ppx-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit min-w-input", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col ppx-md:flex-row relative",
          defaultClassNames.months,
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "w-full flex items-center text-ppx-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative border border-ppx-neutral-5 shadow-xs rounded-ppx-s",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute bg-white inset-0 opacity-0",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-ppx-s pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-ppx-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-ppx-muted-foreground rounded-ppx-s flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday,
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-ppx-muted-foreground",
          defaultClassNames.week_number,
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-ppx-s group/day aspect-square select-none",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-ppx-s"
            : "[&:first-child[data-selected=true]_button]:rounded-l-ppx-s",
          defaultClassNames.day,
        ),
        range_start: cn("rounded-l-ppx-s", defaultClassNames.range_start),
        range_middle: cn(
          "rounded-none bg-ppx-primary-b-1",
          defaultClassNames.range_middle,
        ),
        range_end: cn("rounded-r-ppx-s", defaultClassNames.range_end),
        today: cn(
          "bg-ppx-primary-b-1 text-ppx-foreground rounded-ppx-s data-[selected=true]:rounded-none",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-ppx-muted-foreground aria-selected:text-ppx-muted-foreground",
          defaultClassNames.outside,
        ),
        disabled: cn(
          "text-ppx-muted-foreground opacity-50",
          defaultClassNames.disabled,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronDownIcon
                className={cn("rotate-90", className)}
                {...props}
              />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronDownIcon
                className={cn("rotate-270", className)}
                {...props}
              />
            );
          }

          return <ChevronDownIcon className={cn(className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="size-(--cell-size) flex items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "min-w-(--cell-size) flex aspect-square size-auto w-full flex-col gap-1 font-normal leading-none [&>span]:text-[0.75rem] [&>span]:opacity-70",
        // Focus styles
        "ring-ppx-neutral-3 group-data-[focused=true]/day:ring-ppx-primary-5/50 group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]",
        // Single date selection
        "data-[selected-single=true]:bg-ppx-primary-5 data-[selected-single=true]:hover:bg-ppx-primary-5 data-[selected-single=true]:text-white data-[selected-single=true]:hover:text-white",
        // Range start
        "data-[range-start=true]:rounded-ppx-s data-[range-start=true]:rounded-l-ppx-s data-[range-start=true]:bg-ppx-primary-5 data-[range-start=true]:hover:bg-ppx-primary-5 data-[range-start=true]:text-white",
        // Range end
        "data-[range-end=true]:rounded-ppx-s data-[range-end=true]:rounded-r-ppx-s data-[range-end=true]:bg-ppx-primary-5 data-[range-end=true]:hover:bg-ppx-primary-5 data-[range-end=true]:text-white",
        // Range middle
        "data-[range-middle=true]:bg-ppx-primary-b-1 data-[range-middle=true]:text-ppx-foreground data-[range-middle=true]:hover:bg-ppx-primary-b-1 data-[range-middle=true]:rounded-none",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
