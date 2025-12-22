import { z } from "zod";

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

const countryNormalizer = z
  .string()
  .trim()
  .min(1)
  .transform((value) => ({
    upper: value.toUpperCase(),
    lower: value.toLowerCase(),
  }));

const normalizeCountry = (country?: string): string | undefined => {
  if (!country) return undefined;

  const parsed = countryNormalizer.safeParse(country);
  if (!parsed.success) return undefined;

  const { upper, lower } = parsed.data;

  if (POSTAL_CODE_PATTERN[upper]) {
    return upper;
  }

  const mapped = COUNTRY_NAME_TO_CODE[lower];
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

export const getPostalCodeSchema = (country?: string) => {
  const { regex, hint } = getPostalCodePattern(country);
  const compiledRegex = new RegExp(regex, "i");
  const validationMessage =
    hint && hint.length > 0
      ? `Expected format ${hint}`
      : "Invalid postal code";

  return z
    .string()
    .trim()
    .min(1, { message: "Postal code is required" })
    .regex(compiledRegex, validationMessage);
};

export const validatePostalCode = (value: string, country?: string) =>
  getPostalCodeSchema(country).safeParse(value);


