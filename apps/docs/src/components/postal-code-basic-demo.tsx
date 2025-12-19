import { useState } from "react";
import {
  PostalCodeInput,
  PostalCodeLabel,
  usePostalCodeField,
} from "@px-ui/forms";

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "India",
  "Ireland",
];

export default function PostalCodeBasicDemo() {
  const [country, setCountry] = useState("United States");
  const [postalCode, setPostalCode] = useState("");
  const { hint } = usePostalCodeField({ countryAbbr: country });

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <label className="text-ppx-sm font-medium">
        Country
        <select
          className="mt-1 h-input w-full rounded-input border border-ppx-neutral-5 bg-white px-3 text-ppx-sm text-ppx-foreground outline-none focus:border-ppx-primary-focus"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        >
          {countries.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-col gap-1">
        <PostalCodeLabel patternHint={hint}>ZIP/Postal Code</PostalCodeLabel>
        <PostalCodeInput
          country={country}
          value={postalCode}
          onChange={(event) => setPostalCode(event.target.value)}
          placeholder="Enter ZIP/Postal Code"
        />
      </div>
    </div>
  );
}

