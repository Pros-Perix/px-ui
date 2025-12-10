import { Button } from "@px-ui/core";

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 2V14M2 8H14" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 8H13M9 4L13 8L9 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ButtonWithIconDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">
        <PlusIcon />
        Add New
      </Button>
      <Button variant="outline">
        Next
        <ArrowRightIcon />
      </Button>
      <Button variant="ghost" size="icon">
        <PlusIcon />
      </Button>
    </div>
  );
}

export const ButtonWithIconDemoSource = `import { Button } from "@px-ui/core";

export function ButtonWithIconDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">
        <PlusIcon />
        Add New
      </Button>
      <Button variant="outline">
        Next
        <ArrowRightIcon />
      </Button>
      <Button variant="ghost" size="icon">
        <PlusIcon />
      </Button>
    </div>
  );
}`;
