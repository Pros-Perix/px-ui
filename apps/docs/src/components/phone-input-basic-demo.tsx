import { useState } from "react";
import { PhoneInput } from "@px-ui/forms";

export default function PhoneInputBasicDemo() {
  const [phone, setPhone] = useState("+919600300630");

  return (
    <div className="w-full max-w-sm space-y-2">
      <PhoneInput value={phone} onChange={setPhone} />
      {phone && <p className="text-muted-foreground text-sm">Value: {phone}</p>}
    </div>
  );
}
