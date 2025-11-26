import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "../../src/components/calendar";
import { Button } from "../../src/components/button";
import * as Popover from "../../src/components/popover";
import { Input } from "../../src/components/input";

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
      <div className="flex items-center justify-center p-8">
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
      new Date(2025, 5, 15)
    );

    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
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
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2025, 5, 12),
      to: new Date(2025, 6, 15),
    });

    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
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
      <div className="flex flex-col items-center justify-center gap-4 p-8">
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
      <div className="flex items-center justify-center p-8">
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
      <div className="flex items-center justify-center p-8">
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
      <div className="flex items-center justify-center p-8">
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
      <div className="flex items-center justify-center p-8">
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
      <div className="flex items-center justify-center p-8">
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
      <div className="flex items-center justify-center p-8">
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
      <div className="flex items-center justify-center p-8">
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
      <div className="flex flex-col items-center justify-center gap-4 p-8">
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
      <div className="flex flex-col items-center justify-center gap-4 p-8">
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
      <div className="flex items-center justify-center p-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-ppx-s border [--cell-size:--spacing(11)] ppx-md:[--cell-size:--spacing(12)]"
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
      <div className="flex flex-col items-center justify-center gap-8 p-8">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-sm font-medium">Ghost Variant (Default)</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            buttonVariant="ghost"
            className="rounded-ppx-s border border-ppx-neutral-5"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
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

// Date picker in popover (common pattern)
export const DatePickerPopover: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>();
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger
            render={(props) => (
              <Button {...props} variant="outline">
                {date ? date.toLocaleDateString() : "Pick a date"}
              </Button>
            )}
          />
          <Popover.Content className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setOpen(false);
              }}
              initialFocus
            />
          </Popover.Content>
        </Popover.Root>
      </div>
    );
  },
};

// Date range picker in popover
export const DateRangePickerPopover: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>();
    const [open, setOpen] = React.useState(false);

    const formatRange = (range: DateRange | undefined) => {
      if (!range?.from) return "Pick a date range";
      if (!range.to) return range.from.toLocaleDateString();
      return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`;
    };

    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger
            render={(props) => (
              <Button {...props} variant="outline">
                {formatRange(range)}
              </Button>
            )}
          />
          <Popover.Content className="w-auto p-0">
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              numberOfMonths={2}
              initialFocus
            />
          </Popover.Content>
        </Popover.Root>
      </div>
    );
  },
};

// Date of birth picker
export const DateOfBirthPicker: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>();
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="w-full max-w-sm">
          <label className="text-sm font-medium mb-2 block">
            Date of Birth
          </label>
          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger
              render={(props) => (
                <Button {...props} variant="outline" className="w-full">
                  {date ? date.toLocaleDateString() : "Select date"}
                </Button>
              )}
            />
            <Popover.Content className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setOpen(false);
                }}
                captionLayout="dropdown"
                fromYear={1900}
                toYear={new Date().getFullYear()}
                disabled={{ after: new Date() }}
                initialFocus
              />
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
    );
  },
};

// Date and time picker
export const DateTimePicker: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>();
    const [time, setTime] = React.useState<string>("12:00");
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="w-full max-w-sm space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Date and Time
            </label>
            <Popover.Root open={open} onOpenChange={setOpen}>
              <Popover.Trigger
                render={(props) => (
                  <Button {...props} variant="outline" className="w-full">
                    {date
                      ? `${date.toLocaleDateString()} ${time}`
                      : "Pick date and time"}
                  </Button>
                )}
              />
              <Popover.Content className="w-auto p-0">
                <div className="p-3 space-y-3">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                  <div className="border-t pt-3">
                    <label className="text-sm font-medium mb-2 block">
                      Time
                    </label>
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div className="border-t pt-3 flex justify-end">
                    <Button
                      size="sm"
                      onClick={() => setOpen(false)}
                      disabled={!date}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </Popover.Content>
            </Popover.Root>
          </div>
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
      today.getDate()
    );

    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={[{ before: today }, { after: oneMonthFromNow }]}
          className="rounded-ppx-s border border-ppx-neutral-5"
        />
        <div className="text-sm text-ppx-muted-foreground text-center">
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
      <div className="flex flex-col items-center justify-center gap-4 p-8">
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
        <div className="text-sm text-ppx-muted-foreground text-center">
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
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <div className="flex gap-2">
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
          Current month: {month.toLocaleDateString("default", { month: "long", year: "numeric" })}
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
      <div className="flex items-center justify-center p-8">
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
