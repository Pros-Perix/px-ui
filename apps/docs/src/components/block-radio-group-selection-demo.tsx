import { BlockRadioGroup } from "@px-ui/core";

export function BlockRadioGroupSelectionDemo() {
  return (
    <BlockRadioGroup.Group defaultValue="card">
      <BlockRadioGroup.Item value="card">
        <BlockRadioGroup.Header>
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
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
          <BlockRadioGroup.Title>Credit Card</BlockRadioGroup.Title>
        </BlockRadioGroup.Header>
        <BlockRadioGroup.Description>
          Pay securely with your credit or debit card
        </BlockRadioGroup.Description>
      </BlockRadioGroup.Item>

      <BlockRadioGroup.Item value="paypal">
        <BlockRadioGroup.Header>
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
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
          <BlockRadioGroup.Title>PayPal</BlockRadioGroup.Title>
        </BlockRadioGroup.Header>
        <BlockRadioGroup.Description>
          Fast and secure payment through your PayPal account
        </BlockRadioGroup.Description>
      </BlockRadioGroup.Item>
    </BlockRadioGroup.Group>
  );
}
