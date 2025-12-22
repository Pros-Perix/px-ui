import * as React from "react";

import {
  getPostalCodePattern,
  getPostalCodeSchema,
} from "../schemas/postal-code";

type UsePostalCodeValidationArgs = {
  country?: string;
  value?: string;
};

export function usePostalCodeValidation(
  { country, value }: UsePostalCodeValidationArgs = {},
) {
  const [error, setError] = React.useState<string | null>(null);

  const schema = React.useMemo(() => getPostalCodeSchema(country), [country]);
  const pattern = React.useMemo(() => getPostalCodePattern(country), [country]);

  const validate = React.useCallback(
    (nextValue: string) => {
      const result = schema.safeParse(nextValue);
      const message =
        result.success === true
          ? null
          : result.error.issues[0]?.message ?? "Invalid postal code";

      setError(message);

      return result;
    },
    [schema],
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const valueToValidate = value ?? event.target.value;
      validate(valueToValidate);
    },
    [validate, value],
  );

  const handleChange = React.useCallback(
    (_event: React.ChangeEvent<HTMLInputElement>) => {
      if (error) {
        setError(null);
      }
    },
    [error],
  );

  return {
    hint: pattern.hint,
    regex: new RegExp(pattern.regex, "i"),
    error,
    validate,
    onBlur: handleBlur,
    onChange: handleChange,
    schema,
  };
}


