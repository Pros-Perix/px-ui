import { useState } from "react";
import { PhoneInput } from "@px-ui/forms";

export default function PhoneInputCountriesDemo() {
  const [phoneUS, setPhoneUS] = useState("");
  const [phoneGB, setPhoneGB] = useState("");
  const [phoneIN, setPhoneIN] = useState("");

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">United States</label>
        <PhoneInput value={phoneUS} onChange={setPhoneUS} country="us" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">United Kingdom</label>
        <PhoneInput value={phoneGB} onChange={setPhoneGB} country="gb" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">India</label>
        <PhoneInput value={phoneIN} onChange={setPhoneIN} country="in" />
      </div>
    </div>
  );
}
