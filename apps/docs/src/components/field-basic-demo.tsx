import { Field } from "@px-ui/forms";
import { Input, Label } from "@px-ui/core";

export function FieldBasicDemo() {
  return (
    <Field.Root>
      <Field.Label htmlFor="email">Email</Field.Label>
      <Input id="email" type="email" placeholder="Enter your email" />
      <Field.Description>
        We'll never share your email with anyone else.
      </Field.Description>
    </Field.Root>
  );
}
