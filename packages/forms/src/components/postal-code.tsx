import React, { useMemo } from "react";
import { Input, cn } from "@px-ui/core";

export const POSTAL_CODE_PATTERN: Record<
  string,
  { regex: string; hint: string }
> = {
  CA: {
    regex: "^([a-zA-Z]\\d[a-zA-Z][\\-\\s]?\\d[a-zA-Z]\\d)$",
    hint: "(e.g. H3G 1B8)",
  },
  IE: {
    // Using postal code for Ireland from:
    // https://github.com/melwynfurtado/postcode-validator/blob/master/src/postcode-regexes.ts
    regex: "^([AC-FHKNPRTV-Y][0-9]{2}|D6W)[ -]?[0-9AC-FHKNPRTV-Y]{4}$",
    hint: "(e.g. D02 X285)",
  },
  US: { regex: "^(\\d{5})$", hint: "(e.g. 01505)" },
  IN: { regex: "^[1-9][0-9]{5}$", hint: "(e.g. 110029)" },
  GB: {
    regex:
      "^([A-PR-UWYZa-pr-uwyz0-9][A-HK-Ya-hk-y0-9][AEHMNPRTVXYaehmnortvxy0-9]?[ABEHMNPRVWXYabehmnprvwxy0-9]? {1,2}[0-9][ABD-HJLN-UW-Zabd-h-jln-uw]{2}|GIR 0AA)$",
    hint: "(e.g. W1B 2EL, WC2E 8HA)",
  },
  DEFAULT: { regex: "^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$", hint: "" },
};

const COUNTRY_NAME_TO_CODE: Record<string, string> = {
  "united states": "US",
  usa: "US",
  "united states of america": "US",
  "united kingdom": "GB",
  england: "GB",
  britain: "GB",
  uk: "GB",
  canada: "CA",
  india: "IN",
  ireland: "IE",
};

const normalizeCountry = (country?: string): string | undefined => {
  if (!country) return undefined;
  const trimmed = country.trim();
  if (!trimmed) return undefined;
  const upper = trimmed.toUpperCase();
  if (POSTAL_CODE_PATTERN[upper]) {
    return upper;
  }

  const mapped = COUNTRY_NAME_TO_CODE[trimmed.toLowerCase()];
  return mapped || undefined;
};

export type SupportedPostalCountry = keyof typeof POSTAL_CODE_PATTERN;

export const getPostalCodePattern = (country?: string) => {
  const normalized = normalizeCountry(country);
  return (
    (normalized && POSTAL_CODE_PATTERN[normalized]) ||
    POSTAL_CODE_PATTERN.DEFAULT
  );
};

export const usePostalCodeField = ({
  countryAbbr,
}: { countryAbbr?: string } = {}) => {
  return useMemo(() => {
    const pattern = getPostalCodePattern(countryAbbr);
    return { hint: pattern.hint, regex: new RegExp(pattern.regex, "i") };
  }, [countryAbbr]);
};

interface PostalCodeLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  patternHint?: string;
  hintClassName?: string;
}

export const PostalCodeLabel = ({
  children,
  className,
  hintClassName,
  patternHint,
  ...props
}: PostalCodeLabelProps) => {
  return (
    <span className={cn("flex items-center gap-2", className)} {...props}>
      <span className="flex-auto">{children}</span>
      {patternHint ? (
        <span
          className={cn(
            "text-ppx-xs text-ppx-muted-foreground shrink-0",
            hintClassName,
          )}
        >
          {patternHint}
        </span>
      ) : null}
    </span>
  );
};

export interface PostalCodeInputProps
  extends React.ComponentProps<typeof Input> {
  country?: string;
  showHint?: boolean;
  containerClassName?: string;
  hintClassName?: string;
}

export const PostalCodeInput = React.forwardRef<
  HTMLInputElement,
  PostalCodeInputProps
>(
  (
    {
      country,
      showHint,
      containerClassName,
      hintClassName,
      className,
      title,
      ...props
    },
    ref,
  ) => {
    const { hint, regex } = usePostalCodeField({ countryAbbr: country });
    const pattern = regex.source;
    const inputTitle =
      title || (hint ? `Enter ZIP/Postal code in this pattern ${hint}` : undefined);

    return (
      <div className={cn("flex flex-col gap-1", containerClassName)}>
        <Input
          ref={ref}
          pattern={pattern}
          inputMode="text"
          autoComplete="postal-code"
          title={inputTitle}
          className={className}
          {...props}
        />
      </div>
    );
  },
);

PostalCodeInput.displayName = "PostalCodeInput";

