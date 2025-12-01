import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as Field from "../../src/components/field";
import {
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Button,
  BlockRadioGroup,
  DatePicker,
} from "@px-ui/core";

const meta: Meta = {
  title: "Forms/Field",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj;

// Input Fields Example
export const InputFields: Story = {
  render: () => {
    const usernameId = React.useId();
    const passwordId = React.useId();
    return (
      <Field.Group>
        <Field.Root>
          <Field.Label htmlFor={usernameId} className="required">
            Username
          </Field.Label>
          <Input id={usernameId} placeholder="Enter your username" />
          <Field.Description>
            This is your public display name. It can be your real name or a
            pseudonym.
          </Field.Description>
        </Field.Root>

        <Field.Root>
          <Field.Label htmlFor={passwordId}>Password</Field.Label>
          <Input
            id={passwordId}
            type="password"
            placeholder="Enter your password"
          />
          <Field.Description>
            Use at least 8 characters with a mix of letters, numbers and
            symbols.
          </Field.Description>
        </Field.Root>
      </Field.Group>
    );
  },
};

// Textarea Example
export const TextareaField: Story = {
  render: () => {
    return (
      <Field.Root>
        <Field.Label htmlFor="feedback">Feedback</Field.Label>
        <Textarea
          id="feedback"
          placeholder="Tell us what you think..."
          rows={4}
        />
        <Field.Description>
          Your feedback helps us improve our product.
        </Field.Description>
      </Field.Root>
    );
  },
};

// Select Dropdown Example
export const SelectField: Story = {
  render: () => {
    return (
      <Field.Root>
        <Field.Label htmlFor="department">Department</Field.Label>
        <Select.Root>
          <Select.Trigger id="department">
            <Select.Value placeholder="Select a department" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="engineering">Engineering</Select.Item>
            <Select.Item value="design">Design</Select.Item>
            <Select.Item value="marketing">Marketing</Select.Item>
            <Select.Item value="sales">Sales</Select.Item>
          </Select.Content>
        </Select.Root>
        <Field.Description>
          Choose the department you work in.
        </Field.Description>
      </Field.Root>
    );
  },
};

// Fieldset with Groups Example
export const FieldsetWithGroups: Story = {
  render: () => {
    return (
      <Field.Set>
        <Field.Legend>Address Information</Field.Legend>
        <div className="grid grid-cols-2 gap-4">
          <Field.Root>
            <Field.Label htmlFor="street">Street Address</Field.Label>
            <Input id="street" placeholder="123 Main St" />
          </Field.Root>

          <Field.Root>
            <Field.Label htmlFor="city">City</Field.Label>
            <Input id="city" placeholder="New York" />
          </Field.Root>

          <Field.Root>
            <Field.Label htmlFor="state">State</Field.Label>
            <Input id="state" placeholder="NY" />
          </Field.Root>

          <Field.Root>
            <Field.Label htmlFor="zip">ZIP Code</Field.Label>
            <Input id="zip" placeholder="10001" />
          </Field.Root>
        </div>
      </Field.Set>
    );
  },
};

// Checkbox Fields Example
export const CheckboxFields: Story = {
  render: () => {
    return (
      <Field.Group>
        <Field.Set>
          <Field.Legend variant="label">
            Show these items on the desktop
          </Field.Legend>
          <Field.Group>
            <Field.Root orientation="horizontal">
              <Checkbox id="desktop-documents" />
              <Field.Content>
                <Field.Label htmlFor="desktop-documents">Documents</Field.Label>
                <Field.Description>
                  Show documents folder on desktop
                </Field.Description>
              </Field.Content>
            </Field.Root>

            <Field.Root orientation="horizontal">
              <Checkbox id="desktop-downloads" />
              <Field.Content>
                <Field.Label htmlFor="desktop-downloads">Downloads</Field.Label>
                <Field.Description>
                  Show downloads folder on desktop
                </Field.Description>
              </Field.Content>
            </Field.Root>

            <Field.Root orientation="horizontal">
              <Checkbox id="desktop-external" />
              <Field.Content>
                <Field.Label htmlFor="desktop-external">
                  External Disks
                </Field.Label>
                <Field.Description>
                  Show connected drives on desktop
                </Field.Description>
              </Field.Content>
            </Field.Root>
          </Field.Group>
        </Field.Set>
      </Field.Group>
    );
  },
};

// Radio Buttons Example
export const RadioFields: Story = {
  render: () => {
    return (
      <Field.Set>
        <Field.Label>Subscription Plan</Field.Label>
        <Field.Description>
          Choose the plan that works best for you.
        </Field.Description>
        <RadioGroup defaultValue="monthly">
          <Field.Root orientation="horizontal">
            <RadioGroupItem value="monthly" id="monthly" />
            <Field.Content>
              <Field.Label htmlFor="monthly">Monthly</Field.Label>
              <Field.Description>Billed monthly at $10/month</Field.Description>
            </Field.Content>
          </Field.Root>

          <Field.Root orientation="horizontal">
            <RadioGroupItem value="yearly" id="yearly" />
            <Field.Content>
              <Field.Label htmlFor="yearly">Yearly</Field.Label>
              <Field.Description>
                Billed annually at $100/year (save 17%)
              </Field.Description>
            </Field.Content>
          </Field.Root>

          <Field.Root orientation="horizontal">
            <RadioGroupItem value="lifetime" id="lifetime" />
            <Field.Content>
              <Field.Label htmlFor="lifetime">Lifetime</Field.Label>
              <Field.Description>One-time payment of $500</Field.Description>
            </Field.Content>
          </Field.Root>
        </RadioGroup>
      </Field.Set>
    );
  },
};

// Switch Toggle Example
export const SwitchField: Story = {
  render: () => {
    return (
      <Field.Root orientation="horizontal">
        <Field.Content>
          <Field.Title>Multi-factor Authentication</Field.Title>
          <Field.Description>
            Add an extra layer of security to your account.
          </Field.Description>
        </Field.Content>
        <Switch />
      </Field.Root>
    );
  },
};

// Choice Cards Example
export const ChoiceCards: Story = {
  render: () => {
    return (
      <Field.Root>
        <Field.Title>Compute Environment</Field.Title>
        <Field.Description>
          Select the environment where your code will run.
        </Field.Description>
        <BlockRadioGroup.Group defaultValue="cloud">
          <BlockRadioGroup.Item value="cloud" id="cloud">
            <BlockRadioGroup.Title>Cloud</BlockRadioGroup.Title>
            <BlockRadioGroup.Description>
              Run your code in our secure cloud infrastructure with automatic
              scaling.
            </BlockRadioGroup.Description>
          </BlockRadioGroup.Item>

          <BlockRadioGroup.Item value="edge" id="edge">
            <BlockRadioGroup.Title>Edge</BlockRadioGroup.Title>
            <BlockRadioGroup.Description>
              Deploy to edge locations for lower latency and faster response
              times.
            </BlockRadioGroup.Description>
          </BlockRadioGroup.Item>

          <BlockRadioGroup.Item value="local" id="local">
            <BlockRadioGroup.Title>Local</BlockRadioGroup.Title>
            <BlockRadioGroup.Description>
              Run on your own infrastructure for complete control and data
              sovereignty.
            </BlockRadioGroup.Description>
          </BlockRadioGroup.Item>
        </BlockRadioGroup.Group>
      </Field.Root>
    );
  },
};

// Field Groups with Separators Example
export const FieldGroupsWithSeparators: Story = {
  render: () => {
    return (
      <Field.Group>
        <Field.Root orientation="horizontal">
          <Field.Content>
            <Field.Title>Email Notifications</Field.Title>
            <Field.Description>
              Receive emails about your account activity.
            </Field.Description>
          </Field.Content>
          <Switch defaultChecked />
        </Field.Root>

        <Field.Separator />

        <Field.Root orientation="horizontal">
          <Field.Content>
            <Field.Title>Push Notifications</Field.Title>
            <Field.Description>
              Receive push notifications on your devices.
            </Field.Description>
          </Field.Content>
          <Switch />
        </Field.Root>

        <Field.Separator />

        <Field.Root orientation="horizontal">
          <Field.Content>
            <Field.Title>SMS Notifications</Field.Title>
            <Field.Description>
              Receive text messages about important updates.
            </Field.Description>
          </Field.Content>
          <Switch />
        </Field.Root>
      </Field.Group>
    );
  },
};

// Responsive Layout Example
export const ResponsiveLayout: Story = {
  render: () => {
    return (
      <form className="mx-auto max-w-md">
        <Field.Group>
          <Field.Root orientation="responsive">
            <Field.Label htmlFor="name">Full Name</Field.Label>
            <Input id="name" widthVariant="enforced" placeholder="John Doe" />
          </Field.Root>

          <Field.Root orientation="responsive">
            <Field.Label htmlFor="email-primary">Email</Field.Label>
            <Input
              id="email-primary"
              type="email"
              placeholder="john@example.com"
              widthVariant="enforced"
            />
          </Field.Root>

          <Field.Root orientation="responsive">
            <Field.Label htmlFor="bio">Bio</Field.Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              rows={3}
              widthVariant="enforced"
            />
          </Field.Root>

          <div className="flex justify-end">
            <Button type="submit">Save Profile</Button>
          </div>
        </Field.Group>
      </form>
    );
  },
};

// Field with Error Example
export const FieldWithError: Story = {
  render: () => {
    const [email, setEmail] = React.useState("");
    const [errors, setErrors] = React.useState<
      Array<{ message?: string } | undefined>
    >([]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) {
        setErrors([{ message: "Email is required" }]);
      } else if (!email.includes("@")) {
        setErrors([{ message: "Please enter a valid email address" }]);
      } else {
        setErrors([]);
        alert("Form submitted!");
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <Field.Root>
          <Field.Label htmlFor="email-error">Email Address</Field.Label>
          <Input
            id="email-error"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Field.Description>
            We'll never share your email with anyone else.
          </Field.Description>
          <Field.Error errors={errors} />
        </Field.Root>
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    );
  },
};

// Multiple Errors Example
export const MultipleErrors: Story = {
  render: () => {
    const errors = [
      { message: "Password must be at least 8 characters long" },
      { message: "Password must contain at least one number" },
      { message: "Password must contain at least one special character" },
    ];

    return (
      <Field.Root>
        <Field.Label htmlFor="password-errors">Password</Field.Label>
        <Input
          id="password-errors"
          type="password"
          placeholder="Enter your password"
        />
        <Field.Error errors={errors} />
      </Field.Root>
    );
  },
};

// Fieldset with Separator Content
export const FieldsetWithSeparatorContent: Story = {
  render: () => {
    return (
      <Field.Group>
        <Field.Root orientation="horizontal">
          <Field.Content>
            <Field.Title>Marketing Emails</Field.Title>
            <Field.Description>
              Receive emails about new products and features.
            </Field.Description>
          </Field.Content>
          <Switch defaultChecked />
        </Field.Root>

        <Field.Separator>or</Field.Separator>

        <Field.Root orientation="horizontal">
          <Field.Content>
            <Field.Title>Newsletter</Field.Title>
            <Field.Description>
              Weekly newsletter with tips and updates.
            </Field.Description>
          </Field.Content>
          <Switch />
        </Field.Root>
      </Field.Group>
    );
  },
};

// Complex Job Application Form Example
export const JobApplicationForm: Story = {
  render: () => {
    const [startDate, setStartDate] = React.useState<Date>();
    return (
      <form className="mx-auto max-w-3xl">
        <Field.Group>
          {/* Personal Information */}
          <Field.Set>
            <Field.Legend>Personal Information</Field.Legend>
            <Field.Group>
              <div className="grid grid-cols-2 gap-4">
                <Field.Root>
                  <Field.Label htmlFor="firstName">First Name</Field.Label>
                  <Input id="firstName" placeholder="John" required />
                </Field.Root>

                <Field.Root>
                  <Field.Label htmlFor="lastName">Last Name</Field.Label>
                  <Input id="lastName" placeholder="Doe" required />
                </Field.Root>
              </div>

              <Field.Root>
                <Field.Label htmlFor="email">Email Address</Field.Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                />
                <Field.Description>
                  We'll use this to contact you about your application.
                </Field.Description>
              </Field.Root>

              <Field.Root>
                <Field.Label htmlFor="phone">Phone Number</Field.Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label htmlFor="linkedin">LinkedIn Profile</Field.Label>
                <Input
                  id="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/johndoe"
                />
                <Field.Description>
                  Optional but recommended for professional roles.
                </Field.Description>
              </Field.Root>
            </Field.Group>
          </Field.Set>

          {/* Position Details */}
          <Field.Set>
            <Field.Legend>Position Details</Field.Legend>
            <Field.Group>
              <Field.Root>
                <Field.Label htmlFor="position">
                  Position Applying For
                </Field.Label>
                <Select.Root>
                  <Select.Trigger id="position">
                    <Select.Value placeholder="Select a position" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="senior-engineer">
                      Senior Software Engineer
                    </Select.Item>
                    <Select.Item value="frontend-engineer">
                      Frontend Engineer
                    </Select.Item>
                    <Select.Item value="backend-engineer">
                      Backend Engineer
                    </Select.Item>
                    <Select.Item value="fullstack-engineer">
                      Full Stack Engineer
                    </Select.Item>
                    <Select.Item value="devops-engineer">
                      DevOps Engineer
                    </Select.Item>
                  </Select.Content>
                </Select.Root>
              </Field.Root>

              <Field.Set>
                <Field.Label>Employment Type</Field.Label>
                <RadioGroup defaultValue="fulltime">
                  <Field.Root orientation="horizontal">
                    <RadioGroupItem value="fulltime" id="fulltime" />
                    <Field.Content>
                      <Field.Label htmlFor="fulltime">Full-time</Field.Label>
                      <Field.Description>
                        40 hours per week, benefits included
                      </Field.Description>
                    </Field.Content>
                  </Field.Root>

                  <Field.Root orientation="horizontal">
                    <RadioGroupItem value="parttime" id="parttime" />
                    <Field.Content>
                      <Field.Label htmlFor="parttime">Part-time</Field.Label>
                      <Field.Description>
                        Flexible hours, 20-30 hours per week
                      </Field.Description>
                    </Field.Content>
                  </Field.Root>

                  <Field.Root orientation="horizontal">
                    <RadioGroupItem value="contract" id="contract" />
                    <Field.Content>
                      <Field.Label htmlFor="contract">Contract</Field.Label>
                      <Field.Description>
                        Project-based, 3-12 months
                      </Field.Description>
                    </Field.Content>
                  </Field.Root>
                </RadioGroup>
              </Field.Set>

              <Field.Set>
                <Field.Label>Work Location Preference</Field.Label>
                <BlockRadioGroup.Group defaultValue="remote">
                  <BlockRadioGroup.Item value="remote" id="remote">
                    <BlockRadioGroup.Header>
                      <BlockRadioGroup.Title>Remote</BlockRadioGroup.Title>
                    </BlockRadioGroup.Header>
                    <BlockRadioGroup.Description>
                      Work from anywhere, fully distributed team
                    </BlockRadioGroup.Description>
                  </BlockRadioGroup.Item>

                  <BlockRadioGroup.Item value="hybrid" id="hybrid">
                    <BlockRadioGroup.Header>
                      <BlockRadioGroup.Title>Hybrid</BlockRadioGroup.Title>
                    </BlockRadioGroup.Header>
                    <BlockRadioGroup.Description>
                      Mix of office and remote work, 2-3 days in office
                    </BlockRadioGroup.Description>
                  </BlockRadioGroup.Item>

                  <BlockRadioGroup.Item value="onsite" id="onsite">
                    <BlockRadioGroup.Header>
                      <BlockRadioGroup.Title>On-site</BlockRadioGroup.Title>
                    </BlockRadioGroup.Header>
                    <BlockRadioGroup.Description>
                      Work from office, collaborate in person daily
                    </BlockRadioGroup.Description>
                  </BlockRadioGroup.Item>
                </BlockRadioGroup.Group>
              </Field.Set>
            </Field.Group>
          </Field.Set>

          {/* Experience & Education */}
          <Field.Set>
            <Field.Legend>Experience & Education</Field.Legend>
            <Field.Group>
              <Field.Root>
                <Field.Label htmlFor="experience">
                  Years of Experience
                </Field.Label>
                <Select.Root>
                  <Select.Trigger id="experience">
                    <Select.Value placeholder="Select experience level" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="0-1">
                      0-1 years (Entry Level)
                    </Select.Item>
                    <Select.Item value="1-3">1-3 years (Junior)</Select.Item>
                    <Select.Item value="3-5">3-5 years (Mid-Level)</Select.Item>
                    <Select.Item value="5-8">5-8 years (Senior)</Select.Item>
                    <Select.Item value="8+">
                      8+ years (Lead/Principal)
                    </Select.Item>
                  </Select.Content>
                </Select.Root>
              </Field.Root>

              <Field.Root>
                <Field.Label htmlFor="education">
                  Highest Education Level
                </Field.Label>
                <Select.Root>
                  <Select.Trigger id="education">
                    <Select.Value placeholder="Select education level" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="highschool">
                      High School Diploma
                    </Select.Item>
                    <Select.Item value="associate">
                      Associate Degree
                    </Select.Item>
                    <Select.Item value="bachelor">
                      Bachelor's Degree
                    </Select.Item>
                    <Select.Item value="master">Master's Degree</Select.Item>
                    <Select.Item value="phd">Ph.D.</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Field.Root>

              <Field.Root>
                <Field.Label htmlFor="resume">Resume/CV</Field.Label>
                <Input id="resume" type="file" accept=".pdf,.doc,.docx" />
                <Field.Description>
                  Upload your resume in PDF or Word format (max 5MB).
                </Field.Description>
              </Field.Root>

              <Field.Root>
                <Field.Label htmlFor="portfolio">
                  Portfolio/GitHub URL
                </Field.Label>
                <Input
                  id="portfolio"
                  type="url"
                  placeholder="https://github.com/johndoe"
                />
                <Field.Description>
                  Share your best work or open source contributions.
                </Field.Description>
              </Field.Root>
            </Field.Group>
          </Field.Set>

          {/* Skills & Expertise */}
          <Field.Set>
            <Field.Legend>Skills & Expertise</Field.Legend>
            <Field.Group>
              <Field.Set>
                <Field.Legend variant="label">Technical Skills</Field.Legend>
                <Field.Description>
                  Select all technologies you're proficient with.
                </Field.Description>

                <Field.Group className="gap-3">
                  <Field.Root orientation="horizontal">
                    <Checkbox id="javascript" />
                    <Field.Label htmlFor="javascript">
                      JavaScript/TypeScript
                    </Field.Label>
                  </Field.Root>

                  <Field.Root orientation="horizontal">
                    <Checkbox id="react" />
                    <Field.Label htmlFor="react">React/Next.js</Field.Label>
                  </Field.Root>

                  <Field.Root orientation="horizontal">
                    <Checkbox id="node" />
                    <Field.Label htmlFor="node">Node.js</Field.Label>
                  </Field.Root>

                  <Field.Root orientation="horizontal">
                    <Checkbox id="python" />
                    <Field.Label htmlFor="python">Python</Field.Label>
                  </Field.Root>

                  <Field.Root orientation="horizontal">
                    <Checkbox id="databases" />
                    <Field.Label htmlFor="databases">
                      SQL/NoSQL Databases
                    </Field.Label>
                  </Field.Root>

                  <Field.Root orientation="horizontal">
                    <Checkbox id="cloud" />
                    <Field.Label htmlFor="cloud">AWS/Azure/GCP</Field.Label>
                  </Field.Root>
                </Field.Group>
              </Field.Set>

              <Field.Root>
                <Field.Label htmlFor="coverLetter">Cover Letter</Field.Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Tell us why you're a great fit for this role..."
                  rows={6}
                />
                <Field.Description>
                  Highlight your relevant experience and what excites you about
                  this opportunity.
                </Field.Description>
              </Field.Root>
            </Field.Group>
          </Field.Set>

          {/* Availability & Preferences */}
          <Field.Set>
            <Field.Legend>Availability & Preferences</Field.Legend>
            <Field.Group>
              <div className="grid grid-cols-2 gap-4">
                <Field.Root>
                  <Field.Label htmlFor="startDate">
                    Available Start Date
                  </Field.Label>
                  <DatePicker
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label htmlFor="salary">
                    Expected Salary (Annual)
                  </Field.Label>
                  <Input
                    id="salary"
                    type="text"
                    placeholder="$100,000 - $120,000"
                  />
                </Field.Root>
              </div>

              <Field.Separator>Additional Preferences</Field.Separator>

              <Field.Root orientation="horizontal">
                <Checkbox id="relocation" />
                <Field.Content>
                  <Field.Label htmlFor="relocation">
                    Open to Relocation
                  </Field.Label>
                  <Field.Description>
                    Willing to relocate for the right opportunity
                  </Field.Description>
                </Field.Content>
              </Field.Root>

              <Field.Root orientation="horizontal">
                <Checkbox id="sponsorship" />
                <Field.Content>
                  <Field.Label htmlFor="sponsorship">
                    Require Visa Sponsorship
                  </Field.Label>
                  <Field.Description>
                    Need work authorization support
                  </Field.Description>
                </Field.Content>
              </Field.Root>
            </Field.Group>
          </Field.Set>

          {/* Communication Preferences */}
          <Field.Set>
            <Field.Legend variant="label">
              Communication Preferences
            </Field.Legend>
            <Field.Group>
              <Field.Root orientation="horizontal">
                <Field.Content>
                  <Field.Title>Email Updates</Field.Title>
                  <Field.Description>
                    Receive updates about your application status
                  </Field.Description>
                </Field.Content>
                <Switch defaultChecked />
              </Field.Root>

              <Field.Separator />

              <Field.Root orientation="horizontal">
                <Field.Content>
                  <Field.Title>SMS Notifications</Field.Title>
                  <Field.Description>
                    Get text alerts for interview scheduling
                  </Field.Description>
                </Field.Content>
                <Switch />
              </Field.Root>
            </Field.Group>
          </Field.Set>

          {/* Additional Information */}
          <Field.Root>
            <Field.Label htmlFor="additionalInfo">
              Additional Information
            </Field.Label>
            <Textarea
              id="additionalInfo"
              placeholder="Any other information you'd like us to know..."
              rows={4}
            />
            <Field.Description>
              Optional: Share anything else relevant to your application.
            </Field.Description>
          </Field.Root>

          {/* Submit */}
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
