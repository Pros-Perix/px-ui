import { InputGroup } from "@px-ui/core";

export function InputGroupTextDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <InputGroup.Root>
        <InputGroup.Addon>
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input placeholder="example.com" />
      </InputGroup.Root>

      <InputGroup.Root>
        <InputGroup.Input placeholder="Enter amount" type="number" />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Text>USD</InputGroup.Text>
        </InputGroup.Addon>
      </InputGroup.Root>
    </div>
  );
}
