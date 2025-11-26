import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { DateRange } from "react-day-picker";

import { DatePicker } from "../../src/components/date-picker";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: "Components/DatePicker",
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple", "range"],
    },
    placeholder: {
      control: "text",
    },
    format: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    invalid: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

// Basic single date picker
export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="p-8 flex items-center justify-center">
        <DatePicker mode="single" selected={date} onSelect={setDate} />
      </div>
    );
  },
};

// With placeholder
export const WithPlaceholder: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();

    return (
      <div className="p-8 flex items-center justify-center">
        <DatePicker
          mode="single"
          selected={date}
          onSelect={setDate}
          placeholder="Select a date"
        />
      </div>
    );
  },
};

// Custom date format
export const CustomFormat: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <DatePicker
          mode="single"
          selected={date}
          onSelect={setDate}
          format="MMM dd, yyyy"
          placeholder="Pick a date"
        />
        <div className="text-sm text-ppx-muted-foreground">
          Format: MMM dd, yyyy
        </div>
      </div>
    );
  },
};

// Different date formats
export const DateFormats: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <div className="gap-2 flex flex-col">
          <div className="text-sm font-medium">yyyy-MM-dd (Default)</div>
          <DatePicker
            mode="single"
            selected={date}
            onSelect={setDate}
            format="yyyy-MM-dd"
          />
        </div>
        <div className="gap-2 flex flex-col">
          <div className="text-sm font-medium">MMM dd, yyyy</div>
          <DatePicker
            mode="single"
            selected={date}
            onSelect={setDate}
            format="MMM dd, yyyy"
          />
        </div>
        <div className="gap-2 flex flex-col">
          <div className="text-sm font-medium">dd/MM/yyyy</div>
          <DatePicker
            mode="single"
            selected={date}
            onSelect={setDate}
            format="dd/MM/yyyy"
          />
        </div>
        <div className="gap-2 flex flex-col">
          <div className="text-sm font-medium">MMMM dd, yyyy</div>
          <DatePicker
            mode="single"
            selected={date}
            onSelect={setDate}
            format="MMMM dd, yyyy"
          />
        </div>
      </div>
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="p-8 flex items-center justify-center">
        <DatePicker
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={true}
        />
      </div>
    );
  },
};

// Invalid state
export const Invalid: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();

    return (
      <div className="p-8 flex items-center justify-center">
        <DatePicker
          mode="single"
          selected={date}
          onSelect={setDate}
          invalid={true}
          placeholder="Please select a date"
        />
      </div>
    );
  },
};

// Different trigger sizes
export const TriggerSizes: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <div className="gap-2 flex flex-col items-center">
          <div className="text-sm font-medium">Small</div>
          <DatePicker
            mode="single"
            selected={date}
            onSelect={setDate}
            triggerProps={{ size: "sm" }}
          />
        </div>
        <div className="gap-2 flex flex-col items-center">
          <div className="text-sm font-medium">Medium (Default)</div>
          <DatePicker
            mode="single"
            selected={date}
            onSelect={setDate}
            triggerProps={{ size: "default" }}
          />
        </div>
      </div>
    );
  },
};

// Different trigger widths
export const TriggerWidths: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <div className="gap-2 flex flex-col items-center">
          <div className="text-sm font-medium">Auto Width</div>
          <DatePicker
            mode="single"
            selected={date}
            onSelect={setDate}
            triggerProps={{ widthVariant: "fit" }}
          />
        </div>
        <div className="gap-2 max-w-md flex w-full flex-col items-center">
          <div className="text-sm font-medium">Full Width</div>
          <div className="w-full">
            <DatePicker
              mode="single"
              selected={date}
              onSelect={setDate}
              triggerProps={{ widthVariant: "full" }}
            />
          </div>
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
        <DatePicker
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
          fromYear={2020}
          toYear={2030}
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
        <DatePicker
          mode="single"
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </div>
    );
  },
};

// Disabled past dates
export const DisabledPastDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <DatePicker
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={{ before: new Date() }}
          placeholder="Select future date"
        />
        <div className="text-sm text-ppx-muted-foreground">
          Past dates are disabled
        </div>
      </div>
    );
  },
};

// Disabled weekends
export const DisabledWeekends: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <DatePicker
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={[{ dayOfWeek: [0, 6] }]}
          placeholder="Select weekday"
        />
        <div className="text-sm text-ppx-muted-foreground">
          Weekends are disabled
        </div>
      </div>
    );
  },
};

// Date range within a month
export const DateRangeConstraint: Story = {
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
        <DatePicker
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={[{ before: today }, { after: oneMonthFromNow }]}
          placeholder="Select date"
        />
        <div className="text-sm text-center text-ppx-muted-foreground">
          Only dates within the next month are selectable
        </div>
      </div>
    );
  },
};

// With custom trigger class
export const CustomTriggerStyle: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="p-8 flex items-center justify-center">
        <DatePicker
          mode="single"
          selected={date}
          onSelect={setDate}
          triggerProps={{
            className: "border-ppx-primary-7 bg-ppx-primary-1",
          }}
        />
      </div>
    );
  },
};

// With modifiers (highlighted dates)
export const WithModifiers: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();

    const bookedDates = [
      new Date(2025, 5, 8),
      new Date(2025, 5, 9),
      new Date(2025, 5, 15),
      new Date(2025, 5, 22),
    ];

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <DatePicker
          mode="single"
          selected={date}
          onSelect={setDate}
          modifiers={{
            booked: bookedDates,
          }}
          modifiersClassNames={{
            booked: "bg-ppx-red-1 text-ppx-red-7 font-bold",
          }}
          placeholder="Select available date"
        />
        <div className="text-sm text-center text-ppx-muted-foreground">
          Red dates are already booked
        </div>
      </div>
    );
  },
};

// Form example
export const InForm: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    };

    return (
      <div className="p-8 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="gap-4 max-w-sm flex w-full flex-col"
        >
          <div className="gap-2 flex flex-col">
            <label className="text-sm font-medium">Birth Date</label>
            <DatePicker
              mode="single"
              selected={date}
              onSelect={setDate}
              placeholder="Select your birth date"
              invalid={submitted && !date}
              triggerProps={{ widthVariant: "full" }}
            />
            {submitted && !date && (
              <span className="text-sm text-ppx-red-7">
                Please select a date
              </span>
            )}
          </div>
          <button
            type="submit"
            className="hover:bg-ppx-primary-8 px-4 py-2 text-white rounded-ppx-s bg-ppx-primary-7"
          >
            Submit
          </button>
          {submitted && date && (
            <div className="text-sm text-ppx-success-7">
              Date selected: {date.toLocaleDateString()}
            </div>
          )}
        </form>
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
        <DatePicker
          mode="multiple"
          selected={dates}
          onSelect={setDates}
          placeholder="Select multiple dates"
        />
        <div className="text-sm text-ppx-muted-foreground">
          Selected {dates?.length || 0} date(s)
        </div>
        {dates && dates.length > 0 && (
          <div className="gap-1 text-xs flex flex-col text-ppx-muted-foreground">
            {dates.map((date, i) => (
              <div key={i}>{date.toLocaleDateString()}</div>
            ))}
          </div>
        )}
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
        <DatePicker
          mode="range"
          selected={range}
          onSelect={setRange}
          placeholder="Select date range"
        />
        <div className="text-sm text-ppx-muted-foreground">
          {range?.from && (
            <>
              From: {range.from.toLocaleDateString()}
              {range.to && ` - To: ${range.to.toLocaleDateString()}`}
            </>
          )}
          {!range?.from && "No range selected"}
        </div>
      </div>
    );
  },
};

// Range selection with multiple months
export const RangeSelectionMultipleMonths: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>();

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <DatePicker
          mode="range"
          selected={range}
          onSelect={setRange}
          placeholder="Select date range"
          numberOfMonths={2}
        />
        <div className="text-sm text-ppx-muted-foreground">
          {range?.from && (
            <>
              From: {range.from.toLocaleDateString()}
              {range.to && ` - To: ${range.to.toLocaleDateString()}`}
            </>
          )}
          {!range?.from && "No range selected"}
        </div>
      </div>
    );
  },
};

// Multiple dates with disabled weekends
export const MultipleDatesDisabledWeekends: Story = {
  render: () => {
    const [dates, setDates] = React.useState<Date[] | undefined>();

    return (
      <div className="gap-4 p-8 flex flex-col items-center justify-center">
        <DatePicker
          mode="multiple"
          selected={dates}
          onSelect={setDates}
          disabled={[{ dayOfWeek: [0, 6] }]}
          placeholder="Select weekdays only"
        />
        <div className="text-sm text-ppx-muted-foreground">
          Selected {dates?.length || 0} date(s) (weekends disabled)
        </div>
        {dates && dates.length > 0 && (
          <div className="gap-1 text-xs flex flex-col text-ppx-muted-foreground">
            {dates.map((date, i) => (
              <div key={i}>{date.toLocaleDateString()}</div>
            ))}
          </div>
        )}
      </div>
    );
  },
};
