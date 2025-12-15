import { Calendar } from "@px-ui/core";
import { useState } from "react";

export function CalendarDropdownDemo() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      captionLayout="dropdown"
      fromYear={2020}
      toYear={2030}
    />
  );
}
