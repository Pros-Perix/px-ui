import { BlockCheckboxGroup } from "@px-ui/core";

export function BlockCheckboxGroupMultipleDemo() {
  return (
    <BlockCheckboxGroup.Group defaultValue={["react", "typescript", "tailwind"]}>
      <BlockCheckboxGroup.Item value="react">
        <BlockCheckboxGroup.Header>
          <BlockCheckboxGroup.Title>React</BlockCheckboxGroup.Title>
        </BlockCheckboxGroup.Header>
        <BlockCheckboxGroup.Description>
          A JavaScript library for building user interfaces
        </BlockCheckboxGroup.Description>
      </BlockCheckboxGroup.Item>

      <BlockCheckboxGroup.Item value="typescript">
        <BlockCheckboxGroup.Header>
          <BlockCheckboxGroup.Title>TypeScript</BlockCheckboxGroup.Title>
        </BlockCheckboxGroup.Header>
        <BlockCheckboxGroup.Description>
          Typed superset of JavaScript that compiles to plain JavaScript
        </BlockCheckboxGroup.Description>
      </BlockCheckboxGroup.Item>

      <BlockCheckboxGroup.Item value="tailwind">
        <BlockCheckboxGroup.Header>
          <BlockCheckboxGroup.Title>Tailwind CSS</BlockCheckboxGroup.Title>
        </BlockCheckboxGroup.Header>
        <BlockCheckboxGroup.Description>
          Utility-first CSS framework for rapidly building custom designs
        </BlockCheckboxGroup.Description>
      </BlockCheckboxGroup.Item>
    </BlockCheckboxGroup.Group>
  );
}
