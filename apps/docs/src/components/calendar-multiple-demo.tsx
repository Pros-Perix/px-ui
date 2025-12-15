import { Calendar } from "@px-ui/core";
import { useState } from "react";

export function CalendarMultipleDemo() {
  const [selected, setSelected] = useState<Date[] | undefined>([
    new Date(),
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  ]);

  return (
    <Calendar
      mode="multiple"
      selected={selected}
      onSelect={setSelected}
    />
  );
}
