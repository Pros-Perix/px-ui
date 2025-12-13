# Component Documentation Template

---
title: Component Name
description: A concise description of what the component does and when to use it
apiReference: https://base-ui.com/react/components/[component-name]
---

import { BasicUsageDemo } from "../../../src/components/component-basic-demo";
import { VariantsDemo } from "../../../src/components/component-variants-demo";
import { UseCaseDemo } from "../../../src/components/component-usecase-demo";

**Instructions:**
- If the component uses Base UI primitives, add the apiReference link to the corresponding Base UI component
- Check https://base-ui.com/llms.txt for the correct component reference
- If not using Base UI primitives, omit the apiReference field
- **IMPORTANT:** Import all demo components at the top of the MDX file (after frontmatter) using relative paths
- Use relative path: `../../../src/components/[component-name]-[example]-demo`
- Do NOT use `@/` alias in MDX files - it doesn't work
- Do NOT add demo component imports to `apps/docs/src/routes/docs/$.tsx`

## Overview

Provide a clear, concise overview of the component (2-3 sentences max). Focus on what it does and when to use it.

Example:
```
The Avatar component displays user profile pictures with automatic fallback to colored initials when an image is not available. It includes built-in tooltip support and automatic color generation based on the user's name.
```

## Import

```tsx
import { ComponentName } from "@px-ui/core";
```

For components with multiple exports or helpers:
```tsx
import { ComponentName, componentHelper } from "@px-ui/core";
```

## Usage

<Preview>
  <BasicUsageDemo />
</Preview>

<CodeBlock>
```tsx
<ComponentName prop="value">
  Content
</ComponentName>
```
</CodeBlock>

**Demo Component Instructions:**
- Create demo component at: `apps/docs/src/components/[component-name]-basic-demo.tsx`
- Import the demo component at the top of the MDX file using relative path: `../../../src/components/[component-name]-basic-demo`
- Keep demos simple and focused on the specific example
- Use clear, realistic data

## Examples

### Example 1: Variants/Primary Feature

<Preview>
  <VariantsDemo />
</Preview>

<CodeBlock>
```tsx
<ComponentName variant="option1">Example 1</ComponentName>
<ComponentName variant="option2">Example 2</ComponentName>
```
</CodeBlock>

**Demo:** `apps/docs/src/components/[component-name]-variants-demo.tsx`

### Example 2: Common Use Case

<Preview>
  <UseCaseDemo />
</Preview>

<CodeBlock>
```tsx
<ComponentName prop="value">
  Realistic example
</ComponentName>
```
</CodeBlock>

**Demo:** `apps/docs/src/components/[component-name]-usecase-demo.tsx`

### Example 3: Advanced Feature

Repeat pattern for each meaningful example...

**Tip:** Show examples that demonstrate:
- Different variants/styles
- Different sizes
- Common configurations
- Edge cases (empty states, overflow, etc.)

## Anatomy

**Use this section when the component has multiple composed parts.**

Components that make up `ComponentName`:

### `ComponentName` or `ComponentName.Root`

Brief description of what this component does.

**Custom Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `customProp` | `string` | `"default"` | What this prop does |

**Inherited Props:** Inherits all props from [Base UI ComponentName](https://base-ui.com/react/components/[component-name])

---

### `ComponentName.Item` or Sub-component

Brief description of this sub-component.

**Custom Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `itemProp` | `boolean` | `false` | What this prop does |

**Note:** Only document custom props we've added. For Base UI props, just link to the Base UI documentation.

---

## API Reference

**For simple components (no composition):**

### ComponentName

Main component description.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prop1` | `string` | - | Description of prop1 |
| `prop2` | `number` | `0` | Description of prop2 |
| `variant` | `"option1" \| "option2"` | `"option1"` | Description of variants |
| `className` | `string` | - | Additional CSS classes |

**Inherited Props:** Inherits all props from [Base UI ComponentName](https://base-ui.com/react/components/[component-name]) or native HTML `element`.

---

**For nested/complex prop types:**

### ComponentName

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array<ItemProps>` | - | Array of items to display |
| `max` | `number` | `4` | Maximum items before overflow |

### ItemProps

The `items` array accepts objects with the following properties:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier |
| `name` | `string` | - | Display name |
| `variant` | `"option1" \| "option2"` | `"option1"` | Item variant |

---

## Checklist Before Publishing

- [ ] All demo components created in `apps/docs/src/components/`
- [ ] Frontmatter includes title and description
- [ ] apiReference added if using Base UI primitives
- [ ] Overview clearly explains the component
- [ ] Import statement is correct
- [ ] Basic usage example with demo component
- [ ] 3-5 meaningful examples showing different features
- [ ] Anatomy section if component is composed (optional)
- [ ] All custom props documented in API Reference
- [ ] Base UI props linked, not duplicated
- [ ] Code examples match the demo components
- [ ] Tested all examples render correctly
