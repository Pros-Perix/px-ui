import { Tooltip } from "@px-ui/core";

export function TooltipWithIconDemo() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-ppx-sm">Payment method</span>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <button className="inline-flex items-center justify-center">
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
              className="text-ppx-muted-foreground"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>We accept all major credit cards and PayPal</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </div>
  );
}
