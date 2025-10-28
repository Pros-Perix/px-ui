# Accessibility Documentation

## WCAG 2.1 AA Compliance Status

px-ui is committed to meeting WCAG 2.1 AA accessibility standards. This documentation provides transparency about our current compliance status and testing methodologies.

### Overall System Score: 🔍 Under Development

**Last Updated:** October 27, 2024

## Testing Methodology

### 🤖 Automated Testing (70% Coverage)
- **axe-core integration** - Detects technical WCAG violations
- **Color contrast analysis** - Verifies contrast ratios
- **ARIA validation** - Checks proper ARIA usage
- **Keyboard navigation** - Tests basic keyboard accessibility
- **Semantic HTML** - Validates proper HTML structure

### ⚖️ Semi-Automated (20% Coverage)
- **Focus visibility** - Automated detection + human verification
- **Error handling** - Presence detection + clarity assessment
- **Label association** - Technical validation + usability review

### 👤 Manual Testing (10% Coverage)
- **Screen reader experience** - Real assistive technology testing
- **User journey validation** - End-to-end accessibility workflows
- **Content clarity** - Language and instruction assessment
- **Cognitive load** - Complexity and ease-of-use evaluation

## Component Status Overview

| Component | WCAG 2.1 AA | Confidence | Critical Issues |
|-----------|-------------|------------|-----------------|
| Button | ⚠️ Partial | 60% | Focus indicators, icon labels |
| TextInput | ❌ Non-Compliant | 40% | Label association, error handling |
| Checkbox | ⚠️ Partial | 50% | Label association, error description |
| Select | ⚠️ Partial | 60% | Label association, error handling |
| Dialog | ✅ Compliant | 80% | Color contrast verification needed |
| Combobox | ⚠️ Partial | 70% | Label association, live regions |

## Legend

- **✅ Compliant** - Meets WCAG 2.1 AA standards (90%+ confidence)
- **⚠️ Partial** - Partially compliant with known issues (70-89% confidence)
- **❌ Non-Compliant** - Significant accessibility barriers (< 70% confidence)
- **🔍 Not Tested** - Component not yet evaluated

## Running Accessibility Tests

### Automated Testing
```bash
# Run all accessibility tests
pnpm test:a11y

# Run tests in CI mode (starts Storybook automatically)
pnpm test:a11y:ci
```

### Manual Testing Checklist

For each component, verify:

1. **Keyboard Navigation**
   - [ ] All interactive elements are reachable via keyboard
   - [ ] Tab order is logical and intuitive
   - [ ] No keyboard traps exist
   - [ ] Focus indicators are clearly visible

2. **Screen Reader Testing**
   - [ ] Component purpose is announced clearly
   - [ ] State changes are communicated
   - [ ] Error messages are associated and announced
   - [ ] Instructions are clear and complete

3. **Visual Accessibility**
   - [ ] Color contrast meets 4.5:1 ratio (3:1 for large text)
   - [ ] Information isn't conveyed through color alone
   - [ ] Focus indicators are visible and high contrast
   - [ ] Text is resizable up to 200% without horizontal scrolling

## Usage Guidelines

### Form Components
Always use form components with proper labels and error handling:

```tsx
// ❌ Incorrect - No label association
<TextInput placeholder="Enter email" />

// ✅ Correct - Proper label association
<div>
  <Label htmlFor="email">Email Address</Label>
  <TextInput 
    id="email" 
    aria-describedby="email-error"
    aria-invalid={hasError}
  />
  {hasError && (
    <div id="email-error" role="alert">
      Please enter a valid email address
    </div>
  )}
</div>
```

### Interactive Components
Provide clear labels for interactive elements:

```tsx
// ❌ Incorrect - Icon without label
<Button><SaveIcon /></Button>

// ✅ Correct - Icon with accessible label
<Button aria-label="Save document">
  <SaveIcon />
</Button>
```

## Contributing to Accessibility

### For Developers
1. Run accessibility tests before submitting PRs
2. Follow the component usage guidelines above
3. Add accessibility tests for new components
4. Update this documentation when making changes

### For Designers
1. Ensure color contrast meets WCAG AA standards
2. Design clear focus indicators for all interactive elements
3. Provide alternative text for informational images
4. Consider cognitive load in interface complexity

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Rules](https://dequeuniversity.com/rules/axe/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)

## Contact

For accessibility questions or to report issues, please:
- Open an issue in the repository
- Contact the design system team
- Request accessibility review for new components