import type { Meta, StoryObj } from "@storybook/react";
import { Button, Variant, Size } from "../../src/components/button";
import { getComponentStatus, generateAccessibilityBadge } from "../../src/accessibility/component-status";

const variants: Variant[] = [
  "default",
  "primary",
  "confirmative",
  "outline",
  "ghost",
  "link",
  "destructive",
];

const sizes: Size[] = ["default", "sm", "lg", "icon"];

const buttonA11yStatus = getComponentStatus('Button');

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/button",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## ${generateAccessibilityBadge(buttonA11yStatus?.wcag21_aa || 'unknown')}

The Button component provides a foundational interactive element with multiple variants and sizes.

### Accessibility Status
- **WCAG 2.1 AA Compliance**: ${buttonA11yStatus?.wcag21_aa || 'Unknown'}
- **Confidence Level**: ${((buttonA11yStatus?.overallConfidence || 0) * 100).toFixed(0)}%

### Current Issues
${buttonA11yStatus?.criticalIssues.map(issue => `- ${issue}`).join('\n') || 'No known issues'}

### Usage Guidelines
- Always provide meaningful text content or \`aria-label\` for icon-only buttons
- Ensure sufficient color contrast for all variants
- Test keyboard navigation with Tab and Enter/Space keys

### Examples
- ✅ \`<Button>Save Document</Button>\` - Clear action text
- ✅ \`<Button aria-label="Close modal">×</Button>\` - Icon with label
- ❌ \`<Button><Icon /></Button>\` - Icon without accessible name
        `
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'focus-order-semantics', enabled: true },
          { id: 'button-name', enabled: true }
        ]
      }
    }
  },
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

export const Default: StoryObj<typeof Button> = {
  args: {
    children: "Save changes",
  },
};

export const IconWithLabel: StoryObj<typeof Button> = {
  name: "✅ Icon with Accessible Label",
  args: {
    children: "×",
    "aria-label": "Close modal",
    variant: "ghost",
    size: "icon"
  },
  parameters: {
    docs: {
      description: {
        story: "Example of proper icon button with accessible label. Screen readers will announce 'Close modal' instead of just 'times symbol'."
      }
    }
  }
};

export const IconWithoutLabel: StoryObj<typeof Button> = {
  name: "❌ Icon without Label (Fails A11y)",
  args: {
    children: "×",
    variant: "ghost", 
    size: "icon"
  },
  parameters: {
    docs: {
      description: {
        story: "⚠️ **Accessibility Issue**: This button will fail accessibility tests because screen readers cannot determine its purpose."
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true } // This will flag the violation
        ]
      }
    }
  }
};

export const KeyboardNavigation: StoryObj<typeof Button> = {
  name: "Keyboard Navigation Test",
  render: () => (
    <div className="space-x-4">
      <Button>First Button</Button>
      <Button variant="primary">Second Button</Button>
      <Button disabled>Disabled Button</Button>
      <Button variant="outline">Last Button</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Test keyboard navigation: Tab through buttons, Space/Enter to activate. Disabled button should be skipped."
      }
    }
  }
};

export const AllVariants: StoryObj<typeof Button> = {
  name: "Color Contrast Test",
  render: () => (
    <div className="space-y-4">
      <div className="space-x-2">
        {variants.map(variant => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
      <div className="space-x-2">
        {variants.map(variant => (
          <Button key={`${variant}-disabled`} variant={variant} disabled>
            {variant}
          </Button>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All button variants for color contrast testing. All should meet WCAG AA contrast requirements (4.5:1 for normal text)."
      }
    }
  }
};
