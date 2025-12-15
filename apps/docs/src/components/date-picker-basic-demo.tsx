import { DatePicker } from "@px-ui/core";
import { useState } from "react";

export function DatePickerBasicDemo() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  return (
    <DatePicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      placeholder="Pick a date"
    />
  );
}
