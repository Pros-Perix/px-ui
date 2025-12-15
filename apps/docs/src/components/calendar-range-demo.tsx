import { Calendar } from "@px-ui/core";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

export function CalendarRangeDemo() {
  const [selected, setSelected] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return (
    <Calendar
      mode="range"
      selected={selected}
      onSelect={setSelected}
    />
  );
}
