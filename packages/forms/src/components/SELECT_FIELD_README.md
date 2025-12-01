# SelectField Component

A simplified, prop-based Select component for common use cases. Built on top of `@px-ui/core/select`.

## ✅ Features

- **Type-safe**: Full TypeScript inference for items, values, and callbacks
- **Prop-based API**: Simple to use for common scenarios
- **Auto-detection**: Automatically detects `label` property in items
- **Multiple selection**: Built-in support for multi-select with chips
- **Customizable**: Supports custom rendering via `renderLabel` and `renderOption`
- **All Select features**: Access to all underlying Select.Root props

## 📦 Installation

```tsx
import { SelectField } from "@px-ui/forms";
```

## 🚀 Basic Usage

### Simple Select
```tsx
const fonts = [
  { label: "Sans-serif", value: "sans" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "mono" },
];

<SelectField
  items={fonts}
  value={selected}
  onValueChange={setSelected}
  placeholder="Select a font"
/>
```

### Custom Objects with Type Inference
```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "John", email: "john@example.com" },
  { id: 2, name: "Jane", email: "jane@example.com" },
];

<SelectField
  items={users}
  value={selected}
  // ✅ TypeScript infers: (user: User | null) => void
  onValueChange={(user) => {
    console.log(user?.name); // Fully typed!
    setSelected(user);
  }}
  // ✅ TypeScript infers: (user: User) => React.ReactNode
  renderLabel={(user) => user.name}
  renderOption={(user) => (
    <div>
      <div>{user.name}</div>
      <div className="text-sm">{user.email}</div>
    </div>
  )}
  isItemEqualToValue={(a, b) => a.id === b.id}
  placeholder="Select a user"
/>
```

### Multiple Selection
```tsx
<SelectField
  items={users}
  value={selectedUsers}
  multiple
  // ✅ TypeScript infers: (users: User[]) => void
  onValueChange={(users) => {
    console.log(users.length); // It's an array!
    setSelectedUsers(users);
  }}
  renderLabel={(user) => user.name}
  renderOption={(user) => user.name}
  isItemEqualToValue={(a, b) => a.id === b.id}
  placeholder="Select users"
/>
```

## 🎨 Props

### Core Props
- `items`: `ReadonlyArray<Item>` - Array of items to display
- `value`: `Item | null` or `Item[]` - Selected value(s)
- `onValueChange`: `(value) => void` - Callback with type inference
- `defaultValue`: `Item | null` or `Item[]` - Default uncontrolled value

### Rendering Props
- `renderLabel`: `(item: Item) => React.ReactNode` - Render selected value
- `renderOption`: `(item: Item) => React.ReactNode` - Render each option
- `placeholder`: `string` - Placeholder text

### Behavior Props
- `multiple`: `boolean` - Enable multi-select
- `disabled`: `boolean` - Disable the select
- `required`: `boolean` - Mark as required
- `invalid`: `boolean` - Mark as invalid
- `name`: `string` - Form field name

### Item Comparison
- `isItemEqualToValue`: `(a: Item, b: Item) => boolean` - Custom equality
- `itemToStringValue`: `(item: Item) => string` - For form submission

### Styling Props
- `size`: `"default" | "sm"` - Trigger size
- `widthVariant`: `"enforced" | "full" | "fit"` - Trigger width
- `contentWidthVariant`: `"trigger" | "fit" | "enforced"` - Dropdown width
- `className`: `string` - Additional trigger classes

### Advanced Props
- `contentProps`: Pass props to `Select.Content`
- `rootProps`: Pass props to `Select.Root` (controlled state, etc.)

## 🎯 Type Inference

The component provides full type inference:

```tsx
const items = [
  { id: 1, label: "Option 1", metadata: { color: "red" } },
  { id: 2, label: "Option 2", metadata: { color: "blue" } },
] as const;

<SelectField
  items={items}
  value={selected}
  onValueChange={(item) => {
    // ✅ TypeScript knows:
    // item: { id: number, label: string, metadata: { color: string } } | null
    console.log(item?.metadata.color);
  }}
  renderLabel={(item) => {
    // ✅ TypeScript knows: item is the same type
    return item.label;
  }}
/>
```

## 📚 Type Helpers

```tsx
import { InferSelectItem } from "@px-ui/forms";

const items = [{ id: 1, name: "Item" }] as const;
type Item = InferSelectItem<typeof items>;
// Item = { id: 1, name: "Item" }
```

## 🔄 Migration from Composable Select

**Before** (Composable):
```tsx
<Select.Root value={selected} onValueChange={setSelected}>
  <Select.Trigger>
    <Select.Value placeholder="Select">
      {(value) => value?.label}
    </Select.Value>
  </Select.Trigger>
  <Select.Content>
    <Select.List>
      {items.map((item) => (
        <Select.Item key={item.id} value={item}>
          {item.label}
        </Select.Item>
      ))}
    </Select.List>
  </Select.Content>
</Select.Root>
```

**After** (SelectField):
```tsx
<SelectField
  items={items}
  value={selected}
  onValueChange={setSelected}
  placeholder="Select"
/>
```

## 🛠️ When to Use SelectField vs Composable Select

### Use SelectField when:
- Simple dropdown with standard layout
- List of items to choose from
- Standard trigger and dropdown styling

### Use Composable Select when:
- Need custom trigger layout (icons, badges, etc.)
- Custom popup content (search, groups, etc.)
- Complex interactions or animations
- Full control over every element

## 📝 Examples

See `select-field.example.tsx` for complete working examples with type inference.
