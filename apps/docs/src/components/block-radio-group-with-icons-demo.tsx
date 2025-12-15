import { BlockRadioGroup } from "@px-ui/core";

export function BlockRadioGroupWithIconsDemo() {
  return (
    <BlockRadioGroup.Group defaultValue="pro">
      <BlockRadioGroup.Item value="free">
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
            className="text-ppx-neutral-11"
          >
            <path d="M18 20a6 6 0 0 0-12 0" />
            <circle cx="12" cy="10" r="4" />
          </svg>
          <BlockRadioGroup.Title>Free Plan</BlockRadioGroup.Title>
        </BlockRadioGroup.Header>
        <BlockRadioGroup.Description>
          $0/month · Perfect for trying out our service
        </BlockRadioGroup.Description>
      </BlockRadioGroup.Item>

      <BlockRadioGroup.Item value="pro">
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
            className="text-ppx-primary-5"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <BlockRadioGroup.Title>Pro Plan</BlockRadioGroup.Title>
        </BlockRadioGroup.Header>
        <BlockRadioGroup.Description>
          $29/month · Advanced features and priority support
        </BlockRadioGroup.Description>
      </BlockRadioGroup.Item>

      <BlockRadioGroup.Item value="enterprise">
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
            className="text-ppx-neutral-11"
          >
            <path d="M3 21h18" />
            <path d="M3 10h18" />
            <path d="M5 6h14" />
            <path d="M4 3h16v18H4z" />
          </svg>
          <BlockRadioGroup.Title>Enterprise Plan</BlockRadioGroup.Title>
        </BlockRadioGroup.Header>
        <BlockRadioGroup.Description>
          Custom pricing · Tailored solutions for large organizations
        </BlockRadioGroup.Description>
      </BlockRadioGroup.Item>
    </BlockRadioGroup.Group>
  );
}
