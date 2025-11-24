# @px-ui/forms

Form components built on top of px-ui-core components.

## Installation

```bash
pnpm add @px-ui/forms
```

## Usage

```tsx
import { Form, FormField, FormGroup } from "@px-ui/forms";
import { Input, Button } from "@px-ui/core";

function MyForm() {
  const handleSubmit = async (values) => {
    console.log(values);
    // Handle form submission
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup title="Personal Information">
        <FormField
          name="firstName"
          label="First Name"
          required
          helperText="Enter your first name"
        >
          <Input placeholder="John" />
        </FormField>

        <FormField name="email" label="Email" required>
          <Input type="email" placeholder="john@example.com" />
        </FormField>
      </FormGroup>

      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

## Components

### Form

Main form wrapper that manages form state and submission.

**Props:**

- `onSubmit`: Callback function called with form values on submit
- `className`: Optional CSS class name
- `children`: Form fields and other content

### FormField

Wrapper for individual form fields that handles labels, errors, and helper text.

**Props:**

- `name`: Field name (required)
- `label`: Field label
- `error`: Error message to display
- `helperText`: Helper text to display below the field
- `required`: Whether the field is required
- `disabled`: Whether the field is disabled
- `className`: Optional CSS class name
- `children`: The input component to wrap

### FormGroup

Groups related form fields together with an optional title and description.

**Props:**

- `title`: Optional group title
- `description`: Optional group description
- `className`: Optional CSS class name
- `children`: Form fields to group

## Validation

The package includes validation utilities:

```tsx
import { validateField, patterns } from "@px-ui/forms";

const error = validateField(value, {
  required: true,
  minLength: 3,
  pattern: {
    value: patterns.email,
    message: "Please enter a valid email",
  },
});
```

**Built-in patterns:**

- `patterns.email`
- `patterns.url`
- `patterns.phone`
- `patterns.number`
- `patterns.alphanumeric`

## License

ISC
