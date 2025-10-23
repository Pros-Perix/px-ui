export interface FormFieldProps {
  name: string;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface FormProps {
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}

export interface ValidationRule {
  validate: (value: any) => boolean;
  message: string;
}

export interface FieldValidation {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  custom?: ValidationRule[];
}

export type FormErrors = Record<string, string>;
export type FormValues = Record<string, any>;
