import { Button } from "@px-ui/core";

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Button size="sm">Small</Button>
        <span className="text-ppx-neutral-11 text-xs">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button size="default">Default</Button>
        <span className="text-ppx-neutral-11 text-xs">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button size="lg">Large</Button>
        <span className="text-ppx-neutral-11 text-xs">Large</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button size="icon-sm">
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Button>
        <span className="text-ppx-neutral-11 text-xs">Icon Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Button>
        <span className="text-ppx-neutral-11 text-xs">Icon Default</span>
      </div>
    </div>
  );
}
