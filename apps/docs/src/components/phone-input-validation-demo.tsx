import { useState } from "react";
import { PhoneInput } from "@px-ui/forms";

export default function PhoneInputValidationDemo() {
  const [phone, setPhone] = useState("");

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">With built-in validation</label>
        <PhoneInput
          value={phone}
          onChange={setPhone}
          placeholder="Enter phone number"
        />
        <p className="text-xs text-muted-foreground">
          Type an incomplete number to see validation feedback.
        </p>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">With external error</label>
        <PhoneInput value="" onChange={() => {}} error placeholder="Error state" />
      </div>
    </div>
  );
}
