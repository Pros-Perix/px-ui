import { Field } from "@px-ui/forms";
import { Input, Switch } from "@px-ui/core";

export function FieldHorizontalDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <Field.Root orientation="horizontal">
        <Field.Content>
          <Field.Title>Full Name</Field.Title>
          <Field.Description>Enter your first and last name</Field.Description>
        </Field.Content>
        <Input placeholder="John Doe" />
      </Field.Root>

      <Field.Root orientation="horizontal">
        <Field.Content>
          <Field.Title>Email Notifications</Field.Title>
          <Field.Description>
            Receive email updates about your account
          </Field.Description>
        </Field.Content>
        <Switch />
      </Field.Root>
    </div>
  );
}
