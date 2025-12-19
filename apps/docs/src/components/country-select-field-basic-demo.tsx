import { CountrySelectField, type Country } from "@px-ui/forms";
import { useState } from "react";

const countries: Country[] = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IN", name: "India" },
  { code: "AU", name: "Australia" },
  { code: "JP", name: "Japan" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
];

export default function CountrySelectFieldBasicDemo() {
  const [value, setValue] = useState<Country | null>(null);

  return (
    <div className="w-full max-w-xs">
      <CountrySelectField
        countries={countries}
        value={value}
        onValueChange={setValue}
        placeholder="Select country"
      />
    </div>
  );
}
