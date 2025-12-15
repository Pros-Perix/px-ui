import { BlockRadioGroup } from "@px-ui/core";

export function BlockRadioGroupBasicDemo() {
  return (
    <BlockRadioGroup.Group defaultValue="standard">
      <BlockRadioGroup.Item value="standard">
        <BlockRadioGroup.Header>
          <BlockRadioGroup.Title>Standard Shipping</BlockRadioGroup.Title>
        </BlockRadioGroup.Header>
        <BlockRadioGroup.Description>
          Delivery in 5-7 business days · Free
        </BlockRadioGroup.Description>
      </BlockRadioGroup.Item>

      <BlockRadioGroup.Item value="express">
        <BlockRadioGroup.Header>
          <BlockRadioGroup.Title>Express Shipping</BlockRadioGroup.Title>
        </BlockRadioGroup.Header>
        <BlockRadioGroup.Description>
          Delivery in 2-3 business days · $9.99
        </BlockRadioGroup.Description>
      </BlockRadioGroup.Item>
    </BlockRadioGroup.Group>
  );
}
