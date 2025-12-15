import { Field } from "@px-ui/forms";
import { Input } from "@px-ui/core";

export function FieldWithErrorDemo() {
  return (
    <Field.Root data-invalid="true">
      <Field.Label htmlFor="username">Username</Field.Label>
      <Input id="username" aria-invalid="true" placeholder="Enter username" />
      <Field.Error>Username must be at least 3 characters long</Field.Error>
    </Field.Root>
  );
}
