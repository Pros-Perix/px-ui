import React, { useState } from "react";
import { Input, cn } from "@px-ui/core";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import * as Field from "./field";

// Basic postal code patterns
const POSTAL_CODE_PATTERNS: Record<string, { regex: string; hint: string }> = {
  US: { regex: "^\\d{5}(-\\d{4})?$", hint: "e.g. 12345 or 12345-6789" },
  CA: { regex: "^[A-Za-z]\\d[A-Za-z] ?\\d[A-Za-z]\\d$", hint: "e.g. A1A 1A1" },
  GB: { regex: "^[A-Z]{1,2}\\d{1,2}[A-Z]? ?\\d[A-Z]{2}$", hint: "e.g. SW1A 1AA" },
  DEFAULT: { regex: "^[A-Za-z0-9][A-Za-z0-9\\- ]{0,10}[A-Za-z0-9]$", hint: "e.g. 12345" },
};

const getPostalCodePattern = (country?: string) => {
  return POSTAL_CODE_PATTERNS[country?.toUpperCase() || "DEFAULT"] || POSTAL_CODE_PATTERNS.DEFAULT;
};

export interface PostalCodeLabelProps
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

    const [error, setError] = useState<string>("");
    const pattern = getPostalCodePattern(country);
    const regex = new RegExp(pattern.regex, "i");
    
    const inputTitle =
      title || (pattern.hint ? `Enter ZIP/Postal code in this pattern ${pattern.hint}` : undefined);

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      if (inputValue && !regex.test(inputValue)) {
        setError(`Invalid postal code format. Expected: ${pattern.hint}`);
      } else {
        setError("");
      }
      userOnBlur?.(event);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (error) {
        setError("");
      }
      userOnChange?.(event);
    };

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        <Input
          ref={ref}
          pattern={pattern.regex}
          inputMode="text"
          autoComplete="postal-code"
          title={inputTitle}
          invalid={!!error}
          className={className}
          value={value}
          defaultValue={defaultValue}
          onBlur={handleBlur}
          onChange={handleChange}
          {...restProps}
        />
        {error ? (
          <p className="text-ppx-xs text-ppx-red-5 font-medium">{error}</p>
        ) : showHint && pattern.hint ? (
          <p className={cn("text-ppx-xs text-ppx-muted-foreground", hintClassName)}>
            {pattern.hint}
          </p>
        ) : null}
      </div>
    );
  },
);

PostalCodeInput.displayName = "PostalCodeInput";

// Form integration with react-hook-form
type FormPostalCodeProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName;
  label: React.ReactNode;
  description?: React.ReactNode;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"];
  required?: boolean;
  placeholder?: string;
  country?: string;
  showHint?: boolean;
  hintClassName?: string;
  containerClassName?: string;
};

export function FormPostalCode<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  label,
  description,
  required,
  placeholder,
  country,
  showHint = true,
  hintClassName,
  containerClassName,
}: FormPostalCodeProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const labelElement = (
          <Field.Label
            className={required ? "required" : ""}
            htmlFor={field.name}
          >
            {label}
          </Field.Label>
        );

        const descriptionElement = description ? (
          <Field.Description>{description}</Field.Description>
        ) : null;

        const controlElement = (
          <PostalCodeInput
            {...field}
            id={field.name}
            country={country}
            showHint={showHint}
            hintClassName={hintClassName}
            containerClassName={containerClassName}
            placeholder={placeholder}
            invalid={fieldState.invalid}
          />
        );

        const errorElement = fieldState.invalid && (
          <Field.Error errors={[fieldState.error]} />
        );

        return (
          <Field.Root>
            {labelElement}
            {controlElement}
            {descriptionElement}
            {errorElement}
          </Field.Root>
        );
      }}
    />
  );
}
