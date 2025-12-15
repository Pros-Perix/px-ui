import { DatePicker } from "@px-ui/core";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

export function DatePickerRangeDemo() {
  const [selected, setSelected] = useState<DateRange | undefined>(undefined);

  return (
    <DatePicker
      mode="range"
      selected={selected}
      onSelect={setSelected}
      placeholder="Pick a date range"
    />
  );
}
