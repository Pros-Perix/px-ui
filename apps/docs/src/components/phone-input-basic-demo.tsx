import { PhoneInput } from "@px-ui/forms";
import { useState } from "react";

export default function PhoneInputBasicDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-xs">
      <PhoneInput
        value={value}
        onChange={setValue}
        country="us"
        placeholder="Enter phone number"
      />
    </div>
  );
}

