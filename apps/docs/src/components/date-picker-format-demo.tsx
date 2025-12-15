import { DatePicker } from "@px-ui/core";
import { useState } from "react";

export function DatePickerFormatDemo() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <DatePicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        format="MM/dd/yyyy"
        placeholder="MM/DD/YYYY"
      />
      <DatePicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        format="dd-MM-yyyy"
        placeholder="DD-MM-YYYY"
      />
      <DatePicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        format="PPP"
        placeholder="Long format"
      />
    </div>
  );
}
