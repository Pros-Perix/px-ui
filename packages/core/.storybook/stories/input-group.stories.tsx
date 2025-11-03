import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as InputGroup from "../../src/components/input-group";
import { Spinner } from "../../src/components/spinner";
import { Label } from "../../src/components/label";
import * as Tooltip from "../../src/components/tooltip";
import * as Select from "../../src/components/select";

const meta: Meta<typeof InputGroup.Root> = {
  component: InputGroup.Root,
  title: "Components/InputGroup",
  tags: ["autodocs"],
};

export default meta;

// Demo - Basic usage with icon and button
export const Demo: StoryObj = {
  render: () => (
    <div>
      <InputGroup.Root size="sm" className="w-fit">
        <InputGroup.Input placeholder="Search..." />
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
        <InputGroup.Addon align="inline-end" className="-mr-1.5">
          <InputGroup.Button>Search</InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup.Root>
    </div>
  ),
};

// Icon examples
export const Icon: StoryObj = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <InputGroup.Root>
        <InputGroup.Input type="email" placeholder="Email" />
        <InputGroup.Addon>
          <MailIcon />
        </InputGroup.Addon>
      </InputGroup.Root>

      <InputGroup.Root>
        <InputGroup.Input placeholder="Search..." />
        <InputGroup.Addon align="inline-end">
          <SearchIcon />
        </InputGroup.Addon>
      </InputGroup.Root>

      <InputGroup.Root>
        <InputGroup.Input placeholder="Username" />
        <InputGroup.Addon>
          <UserIcon />
        </InputGroup.Addon>
        <InputGroup.Addon align="inline-end">
          <EyeIcon />
        </InputGroup.Addon>
      </InputGroup.Root>
    </div>
  ),
};

// Text examples
export const Text: StoryObj = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <InputGroup.Root>
        <InputGroup.Input type="url" placeholder="mysite" />
        <InputGroup.Addon>
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
      </InputGroup.Root>

      <InputGroup.Root>
        <InputGroup.Input placeholder="Amount" />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Text>USD</InputGroup.Text>
        </InputGroup.Addon>
      </InputGroup.Root>

      <InputGroup.Root>
        <InputGroup.Input type="number" placeholder="0.00" />
        <InputGroup.Addon>
          <DollarIcon />
        </InputGroup.Addon>
        <InputGroup.Addon align="inline-end">
          <InputGroup.Text>USD</InputGroup.Text>
        </InputGroup.Addon>
      </InputGroup.Root>
    </div>
  ),
};

// Button examples
export const ButtonExample: StoryObj = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <InputGroup.Root>
        <InputGroup.Input placeholder="Enter URL..." />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Button size="icon-xs" aria-label="Copy">
            <CopyIcon />
          </InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup.Root>

      <InputGroup.Root>
        <InputGroup.Input placeholder="Search products..." />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Button variant="default">Search</InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup.Root>

      <InputGroup.Root>
        <InputGroup.Input placeholder="Type something..." />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Button size="icon-xs" aria-label="Clear">
            <CopyIcon />
          </InputGroup.Button>
          <InputGroup.Button>Submit</InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup.Root>
    </div>
  ),
};

// Spinner example
export const SpinnerExample: StoryObj = {
  render: () => {
    const [loading, setLoading] = React.useState(false);

    const handleSearch = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <div className="w-[400px]">
        <InputGroup.Root>
          <InputGroup.Input placeholder="Search..." />
          <InputGroup.Addon align="inline-end">
            {loading ? (
              <Spinner size="small" />
            ) : (
              <InputGroup.Button onClick={handleSearch}>
                Search
              </InputGroup.Button>
            )}
          </InputGroup.Addon>
        </InputGroup.Root>
      </div>
    );
  },
};

// Label example
export const LabelExample: StoryObj = {
  render: () => (
    <div className="space-y-4 w-fit">
      <InputGroup.Root>
        <InputGroup.Input
          id="email-input"
          type="email"
          placeholder="you@example.com"
        />

        <InputGroup.Addon>
          <Label htmlFor="email-input">Email address</Label>
        </InputGroup.Addon>
      </InputGroup.Root>

      <InputGroup.Root>
        <InputGroup.Input
          id="message-input"
          placeholder="Type your message..."
        />

        <InputGroup.Addon>
          <Label htmlFor="message-input">Message</Label>
        </InputGroup.Addon>
        <InputGroup.Addon align="inline-end">
          <InputGroup.Button size="sm">
            <SendIcon />
            Send
          </InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup.Root>
    </div>
  ),
};

// Dropdown example
export const DropdownExample: StoryObj = {
  render: () => {
    return (
      <InputGroup.Root>
        <InputGroup.Input placeholder="example.com" />
        <InputGroup.Addon className="-ml-1">
          <Select.Root defaultValue="https://">
            <Select.Trigger widthVariant="fit" size="sm">
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                <Select.Item value="https://">https://</Select.Item>
                <Select.Item value="http://">http://</Select.Item>
                <Select.Item value="ftp://">ftp://</Select.Item>
              </Select.List>
            </Select.Content>
          </Select.Root>
        </InputGroup.Addon>
      </InputGroup.Root>
    );
  },
};

// Button Group example
export const ButtonGroupExample: StoryObj = {
  render: () => (
    <div className="space-y-4 w-fit">
      <InputGroup.Root>
        <InputGroup.Input placeholder="Repository URL" />
        <InputGroup.Addon>
          <LinkIcon />
        </InputGroup.Addon>
        <InputGroup.Addon align="inline-end">
          <InputGroup.Button size="xs">Clone</InputGroup.Button>
          <InputGroup.Button size="xs">Fork</InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup.Root>

      <InputGroup.Root>
        <InputGroup.Addon>
          <InputGroup.Button size="xs">Bold</InputGroup.Button>
          <InputGroup.Button size="xs">Italic</InputGroup.Button>
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Enter text..." />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Button size="icon-xs" aria-label="Copy">
            <CopyIcon />
          </InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup.Root>
    </div>
  ),
};

// Error state example
export const ErrorState: StoryObj = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <InputGroup.Root>
        <InputGroup.Input
          placeholder="Email"
          aria-invalid="true"
          defaultValue="invalid-email"
        />
        <InputGroup.Addon>
          <MailIcon />
        </InputGroup.Addon>
      </InputGroup.Root>

      <InputGroup.Root>
        <InputGroup.Addon>
          <Label htmlFor="error-message">Message</Label>
        </InputGroup.Addon>
        <InputGroup.Input
          id="error-message"
          placeholder="Type your message..."
          aria-invalid="true"
        />
      </InputGroup.Root>
    </div>
  ),
};

// Disabled state example
export const DisabledState: StoryObj = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <InputGroup.Root disabled size="default">
        <InputGroup.Input placeholder="Search..." disabled />
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
        <InputGroup.Addon align="inline-end">
          <InputGroup.Button disabled>Search</InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup.Root>

      <InputGroup.Root disabled>
        <InputGroup.Input placeholder="Write message..." disabled />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Button size="sm" disabled>
            Send
          </InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup.Root>
    </div>
  ),
};

// Complex example with multiple features
export const ComplexExample: StoryObj = {
  render: () => {
    const [searchValue, setSearchValue] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleSearch = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log("Searching for:", searchValue);
      }, 1500);
    };

    const handleClear = () => {
      setSearchValue("");
    };

    return (
      <div className="w-[500px]">
        <InputGroup.Root>
          <InputGroup.Input
            placeholder="Search for products, categories, or brands..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <InputGroup.Addon>
            <SearchIcon />
          </InputGroup.Addon>
          <InputGroup.Addon align="inline-end">
            {searchValue && (
              <InputGroup.Button
                size="icon-xs"
                onClick={handleClear}
                aria-label="Clear"
              >
                <CopyIcon />
              </InputGroup.Button>
            )}
            {loading ? (
              <Spinner size="small" />
            ) : (
              <InputGroup.Button onClick={handleSearch} disabled={!searchValue}>
                Search
              </InputGroup.Button>
            )}
          </InputGroup.Addon>
        </InputGroup.Root>
      </div>
    );
  },
};

// Icon components
function SearchIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function UserIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function DollarIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function CopyIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function SendIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function InfoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function EyeIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LinkIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function PaperclipIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}
