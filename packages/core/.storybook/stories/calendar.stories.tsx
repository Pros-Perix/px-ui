import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "../../src/components/calendar";
import { Button } from "../../src/components/button";

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: "Components/Calendar",
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple", "range"],
    },
    captionLayout: {
      control: "select",
      options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
    },
    buttonVariant: {
      control: "select",
      options: ["default", "ghost", "outline"],
    },
    showOutsideDays: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

// Basic single date selection
export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="p-8 flex items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
      </div>
    );
  },
};

// Single date selection with label caption
export const SingleDateSelection: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(
      new Date(2025, 5, 15),
    );

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
        <div className="text-sm text-ppx-muted-foreground">
          Selected: {date?.toLocaleDateString() || "None"}
        </div>
      </div>
    );
  },
};

// Range selection
export const RangeSelection: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>();

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
        <div className="text-sm text-ppx-muted-foreground">
          {range?.from && (
            <>
              From: {range.from.toLocaleDateString()}
              {range.to && ` - To: ${range.to.toLocaleDateString()}`}
            </>
          )}
        </div>
      </div>
    );
  },
};

// Multiple date selection
export const MultipleDateSelection: Story = {
  render: () => {
    const [dates, setDates] = React.useState<Date[] | undefined>([
      new Date(2025, 5, 10),
      new Date(2025, 5, 15),
      new Date(2025, 5, 20),
    ]);

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={setDates}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
        <div className="text-sm text-ppx-muted-foreground">
          Selected {dates?.length || 0} date(s)
        </div>
      </div>
    );
  },
};

// With dropdown navigation
export const WithDropdownNavigation: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="p-8 flex items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
          fromYear={2020}
          toYear={2030}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
      </div>
    );
  },
};

// Dropdown months only
export const DropdownMonthsOnly: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="p-8 flex items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown-months"
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
      </div>
    );
  },
};

// Dropdown years only
export const DropdownYearsOnly: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="p-8 flex items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown-years"
          fromYear={2020}
          toYear={2030}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
      </div>
    );
  },
};

// Multiple months
export const MultipleMonths: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="p-8 flex items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
      </div>
    );
  },
};

// Three months
export const ThreeMonths: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="p-8 flex items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          numberOfMonths={3}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
      </div>
    );
  },
};

// Without outside days
export const WithoutOutsideDays: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="p-8 flex items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          showOutsideDays={false}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
      </div>
    );
  },
};

// With week numbers
export const WithWeekNumbers: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="p-8 flex items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          showWeekNumber
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
      </div>
    );
  },
};

// Disabled dates
export const DisabledDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();

    // Disable past dates
    const disabledDays = { before: new Date() };

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDays}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
        <div className="text-sm text-ppx-muted-foreground">
          Past dates are disabled
        </div>
      </div>
    );
  },
};

// Disabled specific dates
export const DisabledSpecificDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();

    // Disable weekends
    const disabledDays = [{ dayOfWeek: [0, 6] }];

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDays}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
        <div className="text-sm text-ppx-muted-foreground">
          Weekends are disabled
        </div>
      </div>
    );
  },
};

// Custom cell size
export const CustomCellSize: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="p-8 flex items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="[--cell-size:--spacing(11)] ppx-md:[--cell-size:--spacing(12)] rounded-ppx-s border"
        />
      </div>
    );
  },
};

// Different button variants
export const ButtonVariants: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="gap-8 p-8 flex flex-col items-center justify-center">
        <div className="gap-2 flex flex-col items-center">
          <h3 className="text-sm font-medium">Ghost Variant (Default)</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            buttonVariant="ghost"
            className="rounded-ppx-s border border-ppx-neutral-5"
          />
        </div>
        <div className="gap-2 flex flex-col items-center">
          <h3 className="text-sm font-medium">Outline Variant</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            buttonVariant="outline"
            className="rounded-ppx-s border border-ppx-neutral-5"
          />
        </div>
      </div>
    );
  },
};

// Min and max dates
export const MinMaxDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();

    const today = new Date();
    const oneMonthFromNow = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    );

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={[{ before: today }, { after: oneMonthFromNow }]}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
        <div className="text-sm text-center text-ppx-muted-foreground">
          Only dates within the next month are selectable
        </div>
      </div>
    );
  },
};

// With modifiers
export const WithModifiers: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    const bookedDates = [
      new Date(2025, 5, 8),
      new Date(2025, 5, 9),
      new Date(2025, 5, 15),
      new Date(2025, 5, 22),
    ];

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          modifiers={{
            booked: bookedDates,
          }}
          modifiersClassNames={{
            booked: "bg-ppx-red-1 text-ppx-red-7 font-bold",
          }}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
        <div className="text-sm text-center text-ppx-muted-foreground">
          Red dates are already booked
        </div>
      </div>
    );
  },
};

// Controlled calendar
export const ControlledCalendar: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [month, setMonth] = React.useState<Date>(new Date());

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <div className="gap-2 flex">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const prev = new Date(month);
              prev.setMonth(prev.getMonth() - 1);
              setMonth(prev);
            }}
          >
            Previous Month
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const next = new Date(month);
              next.setMonth(next.getMonth() + 1);
              setMonth(next);
            }}
          >
            Next Month
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={month}
          onMonthChange={setMonth}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
        <div className="text-sm text-ppx-muted-foreground">
          Current month:{" "}
          {month.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
    );
  },
};

// All features showcase
export const AllFeatures: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="p-8 flex items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
          fromYear={2020}
          toYear={2030}
          showWeekNumber
          numberOfMonths={2}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
      </div>
    );
  },
};
