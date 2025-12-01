import type { Meta, StoryObj } from "@storybook/react";
import { Button, Variant, Size } from "../../src/components/button";
import { Spinner } from "../../src/components/spinner";

const variants: Variant[] = [
  "default",
  "primary",
  "outline",
  "ghost",
  "link",
  "destructive",
  "primary-outline",
];

const sizes: Size[] = ["default", "sm", "lg", "icon", "icon-sm"];

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    size: {
      control: "select",
      options: sizes,
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

// Basic variants showcase
export const Default: StoryObj<typeof Button> = {
  args: {
    children: "Button",
  },
};

export const Primary: StoryObj<typeof Button> = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Destructive: StoryObj<typeof Button> = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

export const Outline: StoryObj<typeof Button> = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const PrimaryOutline: StoryObj<typeof Button> = {
  args: {
    variant: "primary-outline",
    children: "Primary Outline",
  },
};

export const Ghost: StoryObj<typeof Button> = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Link: StoryObj<typeof Button> = {
  args: {
    variant: "link",
    children: "Link Button",
  },
};

// Size variants
export const SizeSmall: StoryObj<typeof Button> = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const SizeDefault: StoryObj<typeof Button> = {
  args: {
    size: "default",
    children: "Default Button",
  },
};

export const SizeLarge: StoryObj<typeof Button> = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

// All variants in all sizes
export const AllVariantsSizes: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-8 flex flex-col">
      {sizes
        .filter((s) => !s?.startsWith("icon"))
        .map((size) => (
          <div key={size} className="gap-4 flex flex-col">
            <h3 className="text-lg font-semibold capitalize">Size: {size}</h3>
            <div className="gap-4 flex flex-wrap">
              {variants.map((variant) => (
                <Button key={variant} variant={variant} size={size}>
                  {variant}
                </Button>
              ))}
            </div>
          </div>
        ))}
    </div>
  ),
};

// Disabled states
export const DisabledDefault: StoryObj<typeof Button> = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

export const DisabledPrimary: StoryObj<typeof Button> = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Disabled Primary",
  },
};

export const DisabledDestructive: StoryObj<typeof Button> = {
  args: {
    variant: "destructive",
    disabled: true,
    children: "Disabled Delete",
  },
};

export const AllVariantsDisabled: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-4 flex flex-wrap">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} disabled>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

// Loading states
export const LoadingDefault: StoryObj<typeof Button> = {
  args: {
    disabled: true,
    children: (
      <>
        <Spinner size="small" />
        Loading...
      </>
    ),
  },
};

export const LoadingPrimary: StoryObj<typeof Button> = {
  args: {
    variant: "primary",
    disabled: true,
    children: (
      <>
        <Spinner size="small" />
        Saving...
      </>
    ),
  },
};

export const LoadingDestructive: StoryObj<typeof Button> = {
  args: {
    variant: "destructive",
    disabled: true,
    children: (
      <>
        <Spinner size="small" />
        Deleting...
      </>
    ),
  },
};

export const AllVariantsLoading: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-4 flex flex-wrap">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} disabled>
          <Spinner size="small" />
          Loading...
        </Button>
      ))}
    </div>
  ),
};

// Buttons with icons (left-aligned)
export const WithIconLeft: StoryObj<typeof Button> = {
  args: {
    children: (
      <>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0L10.5 5.5L16 6.5L12 10.5L13 16L8 13L3 16L4 10.5L0 6.5L5.5 5.5L8 0Z" />
        </svg>
        Star Button
      </>
    ),
  },
};

export const WithIconRight: StoryObj<typeof Button> = {
  args: {
    children: (
      <>
        Next
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M6 3L11 8L6 13V3Z" />
        </svg>
      </>
    ),
  },
};

export const AllVariantsWithIcon: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-4 flex flex-wrap">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0L10.5 5.5L16 6.5L12 10.5L13 16L8 13L3 16L4 10.5L0 6.5L5.5 5.5L8 0Z" />
          </svg>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

// Icon-only buttons
export const IconButton: StoryObj<typeof Button> = {
  args: {
    size: "icon",
    children: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 0L12.5 7.5L20 7.5L14 12L16 20L10 15L4 20L6 12L0 7.5L7.5 7.5L10 0Z" />
      </svg>
    ),
  },
};

export const IconButtonSmall: StoryObj<typeof Button> = {
  args: {
    size: "icon-sm",
    children: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0L10.5 5.5L16 6.5L12 10.5L13 16L8 13L3 16L4 10.5L0 6.5L5.5 5.5L8 0Z" />
      </svg>
    ),
  },
};

export const AllVariantsIconButton: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-6 flex flex-col">
      <div>
        <h3 className="text-lg font-semibold mb-4">Icon Size (icon)</h3>
        <div className="gap-4 flex flex-wrap">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} size="icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 0L12.5 7.5L20 7.5L14 12L16 20L10 15L4 20L6 12L0 7.5L7.5 7.5L10 0Z" />
              </svg>
            </Button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Icon Size (icon-sm)</h3>
        <div className="gap-4 flex flex-wrap">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} size="icon-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0L10.5 5.5L16 6.5L12 10.5L13 16L8 13L3 16L4 10.5L0 6.5L5.5 5.5L8 0Z" />
              </svg>
            </Button>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Different icons showcase
export const DifferentIcons: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-4 flex flex-wrap">
      <Button variant="primary">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M8 2V14M2 8H14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Add New
      </Button>
      <Button variant="destructive">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M4 4L12 12M12 4L4 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Remove
      </Button>
      <Button variant="outline">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M2 4L8 10L14 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Download
      </Button>
      <Button variant="ghost">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M3 8H13M13 8L9 4M13 8L9 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Next
      </Button>
    </div>
  ),
};

// Interactive states showcase
export const InteractiveStates: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-8 flex flex-col">
      <div>
        <h3 className="text-lg font-semibold mb-4">Normal State</h3>
        <div className="gap-4 flex flex-wrap">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Disabled State</h3>
        <div className="gap-4 flex flex-wrap">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {variant}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Loading State</h3>
        <div className="gap-4 flex flex-wrap">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              <Spinner size="small" />
              {variant}
            </Button>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Full width buttons
export const FullWidth: StoryObj<typeof Button> = {
  args: {
    variant: "primary",
    children: "Full Width Button",
    className: "w-full",
  },
};

export const FullWidthVariants: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-4 max-w-md flex flex-col">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} className="w-full">
          {variant} - Full Width
        </Button>
      ))}
    </div>
  ),
};

// Button groups
export const ButtonGroup: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-2 flex">
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Save</Button>
    </div>
  ),
};

export const ButtonGroupWithIcons: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-2 flex">
      <Button variant="outline">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M4 8L2 8L8 2L14 8L12 8"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Previous
      </Button>
      <Button variant="primary">
        Next
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </div>
  ),
};

// Toolbar-style icon buttons
export const IconToolbar: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-1 rounded-lg p-1 flex w-fit border">
      <Button variant="ghost" size="icon-sm">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M2 4H14M2 8H14M2 12H14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </Button>
      <Button variant="ghost" size="icon-sm">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M4 2L12 2L12 14L4 14Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </Button>
      <Button variant="ghost" size="icon-sm">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0L10.5 5.5L16 6.5L12 10.5L13 16L8 13L3 16L4 10.5L0 6.5L5.5 5.5L8 0Z" />
        </svg>
      </Button>
      <Button variant="ghost" size="icon-sm">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M2 2L14 14M14 2L2 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </Button>
    </div>
  ),
};

// Buttons with onClick handlers
export const WithClickHandler: StoryObj<typeof Button> = {
  args: {
    variant: "primary",
    children: "Click Me",
    onClick: () => alert("Button clicked!"),
  },
};

// Mixed size buttons
export const MixedSizeComparison: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-6 flex flex-col">
      {variants.map((variant) => (
        <div key={variant} className="gap-4 flex items-center">
          <Button variant={variant} size="sm">
            Small
          </Button>
          <Button variant={variant} size="default">
            Default
          </Button>
          <Button variant={variant} size="lg">
            Large
          </Button>
        </div>
      ))}
    </div>
  ),
};

// Real-world scenarios
export const LoginForm: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-3 max-w-xs flex flex-col">
      <Button variant="primary" className="w-full">
        Sign In
      </Button>
      <Button variant="outline" className="w-full">
        Sign In with Google
      </Button>
      <Button variant="link" className="w-full">
        Forgot password?
      </Button>
    </div>
  ),
};

export const DialogActions: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-3 flex justify-end">
      <Button variant="ghost">Cancel</Button>
      <Button variant="destructive">Delete Account</Button>
    </div>
  ),
};

export const CardActions: StoryObj<typeof Button> = {
  render: () => (
    <div className="gap-2 flex">
      <Button variant="outline" size="sm">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0L10.5 5.5L16 6.5L12 10.5L13 16L8 13L3 16L4 10.5L0 6.5L5.5 5.5L8 0Z" />
        </svg>
      </Button>
      <Button variant="outline" size="sm">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M2 2L14 14M14 2L2 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </Button>
      <Button variant="primary" size="sm">
        View Details
      </Button>
    </div>
  ),
};

export const FormSubmit: StoryObj<typeof Button> = {
  render: () => (
    <div className="flex items-center justify-between">
      <Button variant="ghost">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M10 2L4 8L10 14"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </Button>
      <div className="gap-3 flex">
        <Button variant="outline">Save as Draft</Button>
        <Button variant="primary">
          Publish
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M2 8L6 12L14 4"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
    </div>
  ),
};
