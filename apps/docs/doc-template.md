- title: The component name
  description: An description of the component
  ***

## Overview

Give an overview of the component.

## Import

```tsx
import { AvatarGroup } from "@px-ui/core";
```

## Usage

<Preview>
-- Always create demo components on /components/demo-comp.tsx here for preview so that it stays consistent   --
  <ComponentPreviewDemo />
</Preview>

<CodeBlock>
```tsx
<div>Example component here</div>
```
</CodeBlock>

## Examples

### With Overflow

<Preview>
  <ComponentPreviewDemo />
</Preview>

<CodeBlock>
```tsx
<div>Example component here</div>
```
</CodeBlock>

-- show different variants of implementations --

### Without Images

-- API reference --
Give the description of each composed component what it does and table out it's props, note: props that are directly coming from base-ui you directly give the link to the base-ui component website, you don't have to explain them

## Props

| Prop        | Type                 | Default | Description                                                  |
| ----------- | -------------------- | ------- | ------------------------------------------------------------ |
| `avatars`   | `Array<AvatarProps>` | -       | Array of avatar props to display                             |
| `max`       | `number`             | `4`     | Maximum number of avatars to display before showing overflow |
| `className` | `string`             | -       | Additional CSS classes                                       |

The `avatars` array accepts the same props as the `Avatar` component:

- `name`: `string \| null \| undefined` - Name for initials and tooltip
- `imgSrc`: `string \| null \| undefined` - Image source URL
- `variant`: `"squared" \| "rounded"` - Visual style variant
- `size`: `` `${number}px` `` - Size of the avatar
- `
