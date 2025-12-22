import React, { useMemo } from "react";
import { Input, cn } from "@px-ui/core";

import {
  POSTAL_CODE_PATTERN,
  type SupportedPostalCountry,
  getPostalCodePattern,
  getPostalCodeSchema,
} from "../schemas/postal-code";
import { usePostalCodeValidation } from "../hooks/use-postal-code-validation";

export {
  POSTAL_CODE_PATTERN,
  getPostalCodePattern,
  getPostalCodeSchema,
  type SupportedPostalCountry,
  usePostalCodeValidation,
};

export const usePostalCodeField = ({
  countryAbbr,
}: { countryAbbr?: string } = {}) =>
  useMemo(() => {
    const pattern = getPostalCodePattern(countryAbbr);
    return { hint: pattern.hint, regex: new RegExp(pattern.regex, "i") };
  }, [countryAbbr]);

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
  extends Omit<
    React.ComponentProps<typeof Input>,
    "value" | "defaultValue" | "onChange" | "onBlur"
  > {
  country?: string;
  showHint?: boolean;
  containerClassName?: string;
  hintClassName?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
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
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const {
      onBlur: userOnBlur,
      onChange: userOnChange,
      ...restProps
    } = props;

    const { hint, regex, error, onBlur, onChange } = usePostalCodeValidation({
      country,
      value,
    });
    const pattern = regex.source;
    const inputTitle =
      title || (hint ? `Enter ZIP/Postal code in this pattern ${hint}` : undefined);

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        <Input
          ref={ref}
          pattern={pattern}
          inputMode="text"
          autoComplete="postal-code"
          title={inputTitle}
          invalid={!!error}
          className={className}
          value={value}
          defaultValue={defaultValue}
          onBlur={(event) => {
            onBlur(event);
            userOnBlur?.(event);
          }}
          onChange={(event) => {
            onChange(event);
            userOnChange?.(event);
          }}
          {...restProps}
        />
        {error ? (
          <p className="text-ppx-xs text-ppx-red-5 font-medium">{error}</p>
        ) : showHint && hint ? (
          <p className={cn("text-ppx-xs text-ppx-muted-foreground", hintClassName)}>
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

PostalCodeInput.displayName = "PostalCodeInput";

