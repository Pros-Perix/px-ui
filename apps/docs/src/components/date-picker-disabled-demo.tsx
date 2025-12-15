import { DatePicker } from "@px-ui/core";
import { useState } from "react";

export function DatePickerDisabledDemo() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  return (
    <DatePicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      disabled={{ before: new Date() }}
      placeholder="Pick a future date"
    />
  );
}
