import { Calendar } from "@px-ui/core";
import { useState } from "react";

export function CalendarBasicDemo() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
    />
  );
}
