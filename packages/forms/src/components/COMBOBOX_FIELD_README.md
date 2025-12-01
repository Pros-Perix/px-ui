# ComboboxField Component

A simplified, prop-based Combobox component for common use cases. Built on top of `@px-ui/core/combobox`.

## ✅ Features

- **Type-safe**: Full TypeScript inference for items, values, and callbacks
- **Searchable by default**: Single select uses SearchableTrigger, multiple uses ChipsTrigger
- **Async loading**: Built-in support for async data via `loadOptions`
- **Auto-detection**: Automatically detects `label` property in items
- **Multiple selection**: Built-in support with chips interface
- **Customizable**: Supports custom rendering via `renderLabel`, `renderOption`, `renderChip`
- **All Combobox features**: Access to all underlying Combobox.Root props

## 📦 Installation

```tsx
import { ComboboxField } from "@px-ui/forms";
```

## 🚀 Basic Usage

### Single Select (Searchable Trigger)
```tsx
const posts = [
  { label: "React Hooks", value: "post-1" },
  { label: "TypeScript", value: "post-2" },
];

<ComboboxField
  items={posts}
  value={selected}
  onValueChange={setSelected}
  placeholder="Search posts..."
/>
```

### Multiple Select (Chips Trigger)
```tsx
<ComboboxField
  items={users}
  value={selected}
  onValueChange={setSelected}
  multiple
  renderLabel={(user) => user.name}
  renderOption={(user) => user.name}
  renderChip={(user) => user.name}
  isItemEqualToValue={(a, b) => a.id === b.id}
  placeholder="Search and select users..."
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

<ComboboxField
  items={users}
  value={selected}
  // ✅ TypeScript infers: (user: User | undefined) => void
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
  placeholder="Search users..."
/>
```

### Async Loading
```tsx
import { defineLoadOptions, InferOption } from "@px-ui/core";

const loadUserOptions = defineLoadOptions({
  cacheKey: ["users"],
  loader: async ({ page, search }) => {
    const res = await fetch(`/api/users?page=${page}&search=${search}`);
    const data = await res.json();
    return {
      data: {
        options: data.users,
        hasMore: data.total > page * 20,
      },
      error: null,
    };
  },
});

<ComboboxField
  loadOptions={loadUserOptions}
  value={selected}
  // ✅ Type is automatically inferred from loadOptions
  onValueChange={(user) => setSelected(user)}
  renderLabel={(user) => user.name}
  renderOption={(user) => (
    <div>
      <div>{user.name}</div>
      <div>{user.email}</div>
    </div>
  )}
  placeholder="Search users..."
/>
```

## 🎨 Props

### Core Props
- `items`: `ReadonlyArray<TItem>` - Static array of items (not needed with loadOptions)
- `loadOptions`: `LoadOptionsConfig<TItem>` - Async data loading configuration
- `value`: `TItem | undefined` or `TItem[]` - Selected value(s)
- `onValueChange`: `(value) => void` - Callback with type inference

### Rendering Props
- `renderLabel`: `(item: TSelectedValue) => React.ReactNode` - Render selected value
- `renderOption`: `(item: TItem) => React.ReactNode` - Render each option
- `renderChip`: `(item: TSelectedValue) => React.ReactNode` - Render each chip (multiple only)
- `placeholder`: `string` - Placeholder text
- `searchPlaceholder`: `string` - Search input placeholder (default: "Search options")
- `emptyText`: `string` - Text when no options (default: "No options")

### Behavior Props
- `multiple`: `boolean` - Enable multi-select with chips
- `searchInPopup`: `boolean` - Show search inside popup instead of trigger
- `disabled`: `boolean` - Disable the combobox
- `invalid`: `boolean` - Mark as invalid
- `readOnly`: `boolean` - Make read-only

### Item Comparison
- `isItemEqualToValue`: `(a: TItem, b: TItem) => boolean` - Custom equality
- `itemToStringLabel`: `(item: TItem) => string` - Convert item to string label

### Styling Props
- `size`: `"default" | "sm"` - Trigger size
- `widthVariant`: `"enforced" | "full"` - Trigger width
- `contentWidthVariant`: `"trigger" | "fit" | "enforced"` - Dropdown width
- `triggerClassName`: `string` - Additional trigger classes

### Advanced Props
- `contentProps`: Pass props to `Combobox.Content`
- `inputRef`: Ref to the hidden input element

## 🎯 Type Inference

The component provides full type inference:

```tsx
const items = [
  { id: 1, name: "Option 1", metadata: { color: "red" } },
  { id: 2, name: "Option 2", metadata: { color: "blue" } },
] as const;

<ComboboxField
  items={items}
  value={selected}
  onValueChange={(item) => {
    // ✅ TypeScript knows:
    // item: { id: number, name: string, metadata: { color: string } } | undefined
    console.log(item?.metadata.color);
  }}
  renderLabel={(item) => {
    // ✅ TypeScript knows: item is the same type
    return item.name;
  }}
/>
```

## 🔄 Trigger Variants

ComboboxField automatically chooses the right trigger:

| Mode | Trigger Used | Use Case |
|------|-------------|----------|
| Single | `SearchableTrigger` | Searchable input for single selection |
| Multiple | `ChipsTrigger` | Chips with removable tags for multi-select |
| searchInPopup | `SearchableTrigger` + Search in popup | Custom layouts |

## 📚 Type Helpers

```tsx
import { InferComboboxItem } from "@px-ui/forms";
import { InferOption } from "@px-ui/core";

const items = [{ id: 1, name: "Item" }] as const;
type Item = InferComboboxItem<typeof items>;
// Item = { id: 1, name: "Item" }

// For async options
type User = InferOption<typeof loadUserOptions>;
```

## 🔄 Migration from Composable Combobox

**Before** (Composable):
```tsx
<Combobox.Root items={items} itemToStringLabel={(item) => item.label}>
  <Combobox.SearchableTrigger />
  <Combobox.Content>
    <Combobox.List>
      {(item) => (
        <Combobox.Item key={item.id} value={item}>
          {item.label}
        </Combobox.Item>
      )}
    </Combobox.List>
  </Combobox.Content>
</Combobox.Root>
```

**After** (ComboboxField):
```tsx
<ComboboxField
  items={items}
  value={selected}
  onValueChange={setSelected}
  placeholder="Search..."
/>
```

## 🛠️ When to Use ComboboxField vs Composable Combobox

### Use ComboboxField when:
- Simple searchable dropdown
- Standard single or multi-select
- Async data loading with search
- Standard trigger layouts (SearchableTrigger or ChipsTrigger)

### Use Composable Combobox when:
- Custom trigger layout (icons, badges, complex UI)
- Custom popup content (custom search, groups, sections)
- Need regular Trigger + Search in popup
- Complex interactions or animations
- Full control over every element

## 📝 Examples

See `combobox-field.example.tsx` and `combobox-field.stories.tsx` for complete working examples with type inference.

## 🆚 ComboboxField vs SelectField

| Feature | ComboboxField | SelectField |
|---------|--------------|-------------|
| Search | ✅ Built-in (inline or popup) | ❌ No search |
| Async Loading | ✅ via loadOptions | ❌ Static items only |
| Trigger Type | SearchableTrigger / ChipsTrigger | Regular button trigger |
| Use Case | User needs to search/filter | Simple selection from known list |
| Performance | Better for large lists (search) | Better for small lists |

**Rule of thumb**: Use ComboboxField when users need to search, use SelectField for simple dropdowns.
