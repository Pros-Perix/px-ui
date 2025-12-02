import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import * as Field from "./field";
import { ReactNode } from "react";
import { Textarea, Checkbox, Input, RadioGroupItem } from "@px-ui/core";

type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName;
  label: ReactNode;
  description?: ReactNode;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"];
  required?: boolean;
};

type FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
  horizontal?: boolean;
  controlFirst?: boolean;
  children: (
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>["render"]
    >[0]["field"] & {
      invalid?: boolean;
      id: string;
    },
  ) => ReactNode;
};

type FormControlFunc<
  ExtraProps extends Record<string, unknown> = Record<never, never>,
> = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: FormControlProps<TFieldValues, TName, TTransformedValues> & ExtraProps,
) => ReactNode;

function FormBase<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  children,
  control,
  label,
  name,
  required,
  description,
  controlFirst,
  horizontal,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
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

        const control = children({
          ...field,
          id: field.name,
          invalid: fieldState.invalid,
        });

        const errorElement = fieldState.invalid && (
          <Field.Error errors={[fieldState.error]} />
        );

        return (
          <Field.Root orientation={horizontal ? "horizontal" : undefined}>
            {controlFirst ? (
              <>
                {control}
                {labelElement}
                {descriptionElement}
                {errorElement}
              </>
            ) : (
              <>
                {labelElement}
                {control}
                {descriptionElement}
                {errorElement}
              </>
            )}
          </Field.Root>
        );
      }}
    />
  );
}

export const FormInput: FormControlFunc = (props) => {
  return <FormBase {...props}>{(field) => <Input {...field} />}</FormBase>;
};

export const FormTextarea: FormControlFunc = (props) => {
  return <FormBase {...props}>{(field) => <Textarea {...field} />}</FormBase>;
};

export const FormCheckbox: FormControlFunc = (props) => {
  return (
    <FormBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Checkbox {...field} checked={value} onCheckedChange={onChange} />
      )}
    </FormBase>
  );
};

// Note: FormRadioItem is not included in the abstractions because radio buttons
// work as a group and require a different pattern. Use the verbose Controller
// approach with RadioGroup for radio buttons. See the stories for examples.
