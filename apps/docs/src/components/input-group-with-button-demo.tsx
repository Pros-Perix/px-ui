import { InputGroup } from "@px-ui/core";

export function InputGroupWithButtonDemo() {
  return (
    <InputGroup.Root>
      <InputGroup.Input placeholder="Enter your email" />
      <InputGroup.Addon align="inline-end">
        <InputGroup.Button>Subscribe</InputGroup.Button>
      </InputGroup.Addon>
    </InputGroup.Root>
  );
}
