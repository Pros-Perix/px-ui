import { InputGroup } from "@px-ui/core";

export function InputGroupSizesDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <InputGroup.Root size="sm">
        <InputGroup.Addon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Small input group" />
      </InputGroup.Root>

      <InputGroup.Root size="default">
        <InputGroup.Addon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Default input group" />
      </InputGroup.Root>
    </div>
  );
}
