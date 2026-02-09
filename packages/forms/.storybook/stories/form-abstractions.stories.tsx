import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm, Controller } from "react-hook-form";
import {
  FormInput,
  FormTextarea,
  FormCheckbox,
  FormSelect,
} from "../../src/components/form";
import * as Field from "../../src/components/field";
import {
  Button,
  Input,
  Textarea,
  RadioGroup,
  RadioGroupItem,
  Select,
} from "@px-ui/core";

const meta: Meta = {
  title: "Forms/Form Abstractions",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
These form components provide a convenient abstraction over react-hook-form's Controller for common use cases.

## Available Abstractions:
- **FormInput** - Standard text input fields
- **FormTextarea** - Multi-line text areas
- **FormCheckbox** - Single checkbox fields
- **FormSelect** - Select dropdowns (built on SelectField)

## When to use these abstractions:
- For standard form fields (input, textarea, checkbox) without customization
- When you need consistent label, description, and error handling
- For quick form prototyping

## When to use the verbose version (Controller):
- For radio buttons (requires RadioGroup wrapper with Controller)
- For complex form controls (Combobox, DatePicker, custom triggers/layout, etc.)
- When you need custom field layouts or styling
- For conditional field logic or custom validation display

**Note:** Radio buttons are NOT included in the abstractions because they work as a group and require ONE Controller wrapping the entire RadioGroup, not one per item. See the examples below for the correct pattern.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

// Type definitions for form data
interface UserProfileFormData {
  fullName: string;
  email: string;
  bio: string;
  newsletter: boolean;
  accountType: "personal" | "business";
}

const themeOptions = ["light", "dark", "system"] as const;

interface PreferencesFormData {
  theme?: (typeof themeOptions)[number];
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  agreeToTerms: boolean;
  priority: "low" | "medium" | "high";
}

interface SettingsFormData {
  username: string;
  displayName: string;
  about: string;
  emailNotifications: boolean;
  marketingEmails: boolean;
  theme: "light" | "dark" | "system";
}

/**
 * User Profile Form - Mixed Approach Example
 *
 * This demonstrates a realistic user profile form combining:
 * - FormInput, FormTextarea, FormCheckbox (simple abstractions)
 * - Radio buttons with verbose Controller + RadioGroup (required pattern)
 */
export const UserProfileForm: Story = {
  render: () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<UserProfileFormData>({
      defaultValues: {
        fullName: "",
        email: "",
        bio: "",
        newsletter: false,
        accountType: "personal",
      },
    });

    const onSubmit = (data: UserProfileFormData) => {
      console.log("Form submitted:", data);
      alert("Form submitted! Check console for data.");
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl">
        <Field.Group>
          <h2 className="mb-4 text-lg font-semibold">Create Your Profile</h2>

          <FormInput
            name="fullName"
            label="Full Name"
            description="Your full name as it will appear on your profile."
            control={control}
            required
          />

          <FormInput
            name="email"
            label="Email Address"
            description="We'll use this email for account notifications."
            control={control}
            required
          />

          <FormTextarea
            name="bio"
            label="Bio"
            description="Tell us a bit about yourself. This will be visible on your public profile."
            control={control}
          />

          <Field.Separator>Account Type</Field.Separator>

          <Field.Set>
            <Controller
              control={control}
              name="accountType"
              render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  <Field.Root orientation="horizontal">
                    <RadioGroupItem value="personal" id="personal" />
                    <Field.Content>
                      <Field.Label htmlFor="personal">
                        Personal Account
                      </Field.Label>
                      <Field.Description>
                        For individual use and personal projects
                      </Field.Description>
                    </Field.Content>
                  </Field.Root>

                  <Field.Root orientation="horizontal">
                    <RadioGroupItem value="business" id="business" />
                    <Field.Content>
                      <Field.Label htmlFor="business">
                        Business Account
                      </Field.Label>
                      <Field.Description>
                        For teams and organizations
                      </Field.Description>
                    </Field.Content>
                  </Field.Root>
                </RadioGroup>
              )}
            />
          </Field.Set>

          <Field.Separator />

          <FormCheckbox
            name="newsletter"
            label="Subscribe to Newsletter"
            description="Get updates about new features and product announcements"
            control={control}
          />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Create Profile</Button>
          </div>
        </Field.Group>
      </form>
    );
  },
};

/**
 * Contact Form - Mixed Approach Example
 *
 * Demonstrates combining form abstractions with verbose Controller for radio buttons.
 * Shows validation and error handling patterns.
 */
export const ContactForm: Story = {
  render: () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<ContactFormData>({
      defaultValues: {
        name: "",
        email: "",
        subject: "",
        message: "",
        agreeToTerms: false,
        priority: "medium",
      },
    });

    const onSubmit = (data: ContactFormData) => {
      console.log("Contact form submitted:", data);
      alert("Message sent successfully!");
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl">
        <Field.Group>
          <h2 className="mb-4 text-lg font-semibold">Contact Us</h2>

          <div className="grid grid-cols-2 gap-4">
            <FormInput name="name" label="Name" control={control} required />

            <FormInput name="email" label="Email" control={control} required />
          </div>

          <FormInput
            name="subject"
            label="Subject"
            description="Brief description of your inquiry"
            control={control}
            required
          />

          <Field.Set>
            <Field.Legend variant="label">Priority Level</Field.Legend>
            <Field.Description>How urgent is your request?</Field.Description>
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  <Field.Root orientation="horizontal">
                    <RadioGroupItem value="low" id="low" />
                    <Field.Label htmlFor="low">
                      Low - General inquiry
                    </Field.Label>
                  </Field.Root>

                  <Field.Root orientation="horizontal">
                    <RadioGroupItem value="medium" id="medium" />
                    <Field.Label htmlFor="medium">
                      Medium - Need assistance
                    </Field.Label>
                  </Field.Root>

                  <Field.Root orientation="horizontal">
                    <RadioGroupItem value="high" id="high" />
                    <Field.Label htmlFor="high">
                      High - Urgent issue
                    </Field.Label>
                  </Field.Root>
                </RadioGroup>
              )}
            />
          </Field.Set>

          <FormTextarea
            name="message"
            label="Message"
            description="Please provide details about your inquiry"
            control={control}
            required
          />

          <FormCheckbox
            name="agreeToTerms"
            label="I agree to the Terms of Service and Privacy Policy"
            control={control}
            required
          />

          <div className="flex justify-end">
            <Button type="submit">Send Message</Button>
          </div>
        </Field.Group>
      </form>
    );
  },
};

/**
 * Settings Form with Verbose Controller - Custom Select Field
 *
 * This example shows the VERBOSE version using Controller directly.
 * Use this approach when you need more control or custom components.
 *
 * Here we demonstrate using a Select component which requires custom rendering.
 */
export const SettingsFormVerbose: Story = {
  render: () => {
    const { control, handleSubmit, watch } = useForm<SettingsFormData>({
      defaultValues: {
        username: "",
        displayName: "",
        about: "",
        emailNotifications: true,
        marketingEmails: false,
        theme: "system",
      },
    });

    const onSubmit = (data: SettingsFormData) => {
      console.log("Settings saved:", data);
      alert("Settings saved successfully!");
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl">
        <Field.Group>
          <h2 className="mb-4 text-lg font-semibold">Account Settings</h2>
          <p className="text-ppx-muted-foreground mb-6 text-sm">
            This example uses the verbose Controller approach for custom
            components.
          </p>

          {/* Simple fields using the abstraction */}
          <FormInput
            name="username"
            label="Username"
            description="This is your unique username"
            control={control}
            required
          />

          <FormInput
            name="displayName"
            label="Display Name"
            description="This name will be shown to other users"
            control={control}
          />

          {/* Custom Select field using verbose Controller */}
          <Controller
            control={control}
            name="theme"
            render={({ field, fieldState }) => (
              <Field.Root>
                <Field.Label htmlFor={field.name} className="required">
                  Theme Preference
                </Field.Label>
                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger id={field.name}>
                    <Select.Value placeholder="Select a theme" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="light">Light</Select.Item>
                    <Select.Item value="dark">Dark</Select.Item>
                    <Select.Item value="system">System</Select.Item>
                  </Select.Content>
                </Select.Root>
                <Field.Description>
                  Choose how the interface appears
                </Field.Description>
                {fieldState.invalid && (
                  <Field.Error errors={[fieldState.error]} />
                )}
              </Field.Root>
            )}
          />

          <FormTextarea
            name="about"
            label="About"
            description="Tell others about yourself"
            control={control}
          />

          <Field.Separator>Notification Preferences</Field.Separator>

          <FormCheckbox
            name="emailNotifications"
            label="Email Notifications"
            description="Receive notifications about account activity"
            control={control}
          />

          <FormCheckbox
            name="marketingEmails"
            label="Marketing Emails"
            description="Receive updates about new features and promotions"
            control={control}
          />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">
              Reset
            </Button>
            <Button type="submit">Save Settings</Button>
          </div>
        </Field.Group>
      </form>
    );
  },
};

/**
 * Advanced Verbose Example - Custom Layout with Multiple Controllers
 *
 * This shows a more complex example with custom field layouts.
 * Notice how we have full control over the Field.Content and Field.Root structure.
 */
export const AdvancedVerboseForm: Story = {
  render: () => {
    interface CustomFormData {
      firstName: string;
      lastName: string;
      department: string;
      role: string;
      skills: string;
      availability: "fulltime" | "parttime" | "contract";
    }

    const { control, handleSubmit, watch } = useForm<CustomFormData>({
      defaultValues: {
        firstName: "",
        lastName: "",
        department: "",
        role: "",
        skills: "",
        availability: "fulltime",
      },
    });

    const onSubmit = (data: CustomFormData) => {
      console.log("Form submitted:", data);
      alert("Application submitted!");
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-3xl">
        <Field.Group>
          <h2 className="mb-4 text-lg font-semibold">Job Application</h2>
          <p className="text-ppx-muted-foreground mb-6 text-sm">
            Complex form using verbose Controller for complete customization.
          </p>

          <Field.Set>
            <Field.Legend>Personal Information</Field.Legend>

            <div className="grid grid-cols-2 gap-4">
              {/* Custom horizontal layout with Controller */}
              <Controller
                control={control}
                name="firstName"
                rules={{ required: "First name is required" }}
                render={({ field, fieldState }) => (
                  <Field.Root>
                    <Field.Label htmlFor={field.name} className="required">
                      First Name
                    </Field.Label>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="John"
                      invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <Field.Error errors={[fieldState.error]} />
                    )}
                  </Field.Root>
                )}
              />

              <Controller
                control={control}
                name="lastName"
                rules={{ required: "Last name is required" }}
                render={({ field, fieldState }) => (
                  <Field.Root>
                    <Field.Label htmlFor={field.name} className="required">
                      Last Name
                    </Field.Label>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Doe"
                      invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <Field.Error errors={[fieldState.error]} />
                    )}
                  </Field.Root>
                )}
              />
            </div>
          </Field.Set>

          <Field.Set>
            <Field.Legend>Position Details</Field.Legend>

            {/* Custom Select with verbose Controller */}
            <Controller
              control={control}
              name="department"
              rules={{ required: "Please select a department" }}
              render={({ field, fieldState }) => (
                <Field.Root>
                  <Field.Label htmlFor={field.name} className="required">
                    Department
                  </Field.Label>
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger id={field.name}>
                      <Select.Value placeholder="Select department" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="engineering">Engineering</Select.Item>
                      <Select.Item value="design">Design</Select.Item>
                      <Select.Item value="product">Product</Select.Item>
                      <Select.Item value="marketing">Marketing</Select.Item>
                    </Select.Content>
                  </Select.Root>
                  <Field.Description>
                    Choose the department you're applying to
                  </Field.Description>
                  {fieldState.invalid && (
                    <Field.Error errors={[fieldState.error]} />
                  )}
                </Field.Root>
              )}
            />

            <Controller
              control={control}
              name="role"
              render={({ field, fieldState }) => (
                <Field.Root>
                  <Field.Label htmlFor={field.name}>Role Title</Field.Label>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Senior Software Engineer"
                  />
                  <Field.Description>
                    The specific position you're interested in
                  </Field.Description>
                </Field.Root>
              )}
            />

            {/* Custom RadioGroup with horizontal orientation */}
            <Field.Set>
              <Field.Legend variant="label">Availability</Field.Legend>
              <Field.Description>
                What type of employment are you seeking?
              </Field.Description>

              <Controller
                control={control}
                name="availability"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Field.Root orientation="horizontal">
                      <RadioGroupItem value="fulltime" id="fulltime" />
                      <Field.Content>
                        <Field.Label htmlFor="fulltime">Full-time</Field.Label>
                        <Field.Description>40 hours per week</Field.Description>
                      </Field.Content>
                    </Field.Root>

                    <Field.Root orientation="horizontal">
                      <RadioGroupItem value="parttime" id="parttime" />
                      <Field.Content>
                        <Field.Label htmlFor="parttime">Part-time</Field.Label>
                        <Field.Description>
                          20-30 hours per week
                        </Field.Description>
                      </Field.Content>
                    </Field.Root>

                    <Field.Root orientation="horizontal">
                      <RadioGroupItem value="contract" id="contract" />
                      <Field.Content>
                        <Field.Label htmlFor="contract">Contract</Field.Label>
                        <Field.Description>
                          Project-based work
                        </Field.Description>
                      </Field.Content>
                    </Field.Root>
                  </RadioGroup>
                )}
              />
            </Field.Set>
          </Field.Set>

          {/* Textarea with custom validation */}
          <Controller
            control={control}
            name="skills"
            rules={{
              required: "Please describe your skills",
              minLength: {
                value: 50,
                message: "Please provide at least 50 characters",
              },
            }}
            render={({ field, fieldState }) => (
              <Field.Root>
                <Field.Label htmlFor={field.name} className="required">
                  Skills & Experience
                </Field.Label>
                <Textarea
                  {...field}
                  id={field.name}
                  rows={6}
                  placeholder="Describe your relevant skills and experience..."
                  invalid={fieldState.invalid}
                />
                <Field.Description>
                  Minimum 50 characters. Current: {field.value.length}
                </Field.Description>
                {fieldState.invalid && (
                  <Field.Error errors={[fieldState.error]} />
                )}
              </Field.Root>
            )}
          />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">
              Save Draft
            </Button>
            <Button type="submit">Submit Application</Button>
          </div>
        </Field.Group>
      </form>
    );
  },
};

/**
 * Comparison Example - Side by Side
 *
 * Shows the same field implemented both ways for comparison.
 */
export const ComparisonExample: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: {
        simpleInput: "",
        verboseInput: "",
      },
    });

    return (
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 gap-8">
          {/* Left side - Simple abstraction */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Using Form Abstraction
            </h3>
            <pre className="mb-4 overflow-x-auto rounded bg-gray-100 p-3 text-xs">
              {`<FormInput
  name="simpleInput"
  label="Email"
  description="Your email address"
  control={control}
  required
/>`}
            </pre>
            <FormInput
              name="simpleInput"
              label="Email"
              description="Your email address"
              control={control}
              required
            />
          </div>

          {/* Right side - Verbose Controller */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Using Verbose Controller
            </h3>
            <pre className="mb-4 overflow-x-auto rounded bg-gray-100 p-3 text-xs">
              {`<Controller
  control={control}
  name="verboseInput"
  render={({ field, fieldState }) => (
    <Field.Root>
      <Field.Label
        htmlFor={field.name}
        className="required"
      >
        Email
      </Field.Label>
      <Input
        {...field}
        id={field.name}
        invalid={fieldState.invalid}
      />
      <Field.Description>
        Your email address
      </Field.Description>
      {fieldState.invalid && (
        <Field.Error
          errors={[fieldState.error]}
        />
      )}
    </Field.Root>
  )}
/>`}
            </pre>
            <Controller
              control={control}
              name="verboseInput"
              render={({ field, fieldState }) => (
                <Field.Root>
                  <Field.Label htmlFor={field.name} className="required">
                    Email
                  </Field.Label>
                  <Input
                    {...field}
                    id={field.name}
                    invalid={fieldState.invalid}
                  />
                  <Field.Description>Your email address</Field.Description>
                  {fieldState.invalid && (
                    <Field.Error errors={[fieldState.error]} />
                  )}
                </Field.Root>
              )}
            />
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h4 className="mb-2 font-semibold text-blue-900">
            When to use each approach:
          </h4>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>
              <strong>Abstraction (left):</strong> Use for input, textarea, and
              checkbox fields without customization
            </li>
            <li>
              <strong>Verbose (right):</strong> Use for radio buttons, Select,
              DatePicker, or when you need custom layouts/styling
            </li>
          </ul>
        </div>
      </div>
    );
  },
};

/**
 * FormSelect Example - Simple Abstraction
 *
 * Demonstrates a select dropdown using the FormSelect abstraction.
 */
export const FormSelectExample: Story = {
  render: () => {
    const { control, handleSubmit } = useForm<PreferencesFormData>({
      defaultValues: {
        theme: undefined,
      },
    });

    const onSubmit = (data: PreferencesFormData) => {
      console.log("Preferences submitted:", data);
      alert(`Theme: ${data.theme ?? "(none)"}`);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl">
        <Field.Group>
          <h2 className="mb-4 text-lg font-semibold">Preferences</h2>

          <FormSelect
            name="theme"
            label="Theme"
            description="Choose how the interface appears"
            control={control}
            required
            items={themeOptions}
            placeholder="Select a theme"
            renderOption={(item) => item[0]!.toUpperCase() + item.slice(1)}
            renderLabel={(item) => item[0]!.toUpperCase() + item.slice(1)}
          />

          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </Field.Group>
      </form>
    );
  },
};
