import { Field } from "@px-ui/forms";
import { Input } from "@px-ui/core";

export function FieldGroupDemo() {
  return (
    <Field.Group>
      <Field.Root>
        <Field.Label htmlFor="firstName">First Name</Field.Label>
        <Input id="firstName" placeholder="John" />
      </Field.Root>

      <Field.Root>
        <Field.Label htmlFor="lastName">Last Name</Field.Label>
        <Input id="lastName" placeholder="Doe" />
      </Field.Root>

      <Field.Root>
        <Field.Label htmlFor="email">Email</Field.Label>
        <Input id="email" type="email" placeholder="john@example.com" />
        <Field.Description>
          We'll never share your email with anyone else.
        </Field.Description>
      </Field.Root>
    </Field.Group>
  );
}
