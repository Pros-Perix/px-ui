import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as BlockCheckboxGroup from "../../src/components/block-checkbox-group";

const meta: Meta = {
  component: BlockCheckboxGroupDemo,
  title: "Components/block-checkbox-group",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  args: {},
};

function BlockCheckboxGroupDemo() {
  const allValues = ["1", "2", "3", "4"];
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  return (
    <div className="space-y-10">
      <h1 className="mb-5 font-sans-sb text-ppx-base">Example one</h1>
      <BlockCheckboxGroup.Group>
        <BlockCheckboxGroup.Item value="1" className="w-[400px]">
          <BlockCheckboxGroup.Header>
            <BlockCheckboxGroup.Title>Contractor</BlockCheckboxGroup.Title>
          </BlockCheckboxGroup.Header>
          <BlockCheckboxGroup.Description>
            A self-employed person or entity that works with the company on a
            contractual basis.
          </BlockCheckboxGroup.Description>
        </BlockCheckboxGroup.Item>

        <BlockCheckboxGroup.Item value="2" className="w-[400px]">
          <BlockCheckboxGroup.Header>
            <BlockCheckboxGroup.Title>
              Direct hire (Employee)
            </BlockCheckboxGroup.Title>
          </BlockCheckboxGroup.Header>
          <BlockCheckboxGroup.Description>
            A team member on the company payroll where the business sets the
            working timings and schedule.
          </BlockCheckboxGroup.Description>
        </BlockCheckboxGroup.Item>
      </BlockCheckboxGroup.Group>

      <h1 className="mb-5 font-sans-sb text-ppx-base">Example two</h1>
      <BlockCheckboxGroup.Group
        allValues={allValues}
        value={selectedValues}
        onValueChange={setSelectedValues}
        className="gap-4 grid grid-cols-2"
      >
        <BlockCheckboxGroup.Item
          parent
          indeterminate={
            selectedValues.length > 0 &&
            selectedValues.length < allValues.length
          }
        >
          <BlockCheckboxGroup.Header>
            <BlockCheckboxGroup.Title>Select All</BlockCheckboxGroup.Title>
          </BlockCheckboxGroup.Header>
          <BlockCheckboxGroup.Description>
            Select all items in the group.
          </BlockCheckboxGroup.Description>
        </BlockCheckboxGroup.Item>

        <BlockCheckboxGroup.Item value="1">
          <BlockCheckboxGroup.Header>
            <BlockCheckboxGroup.Title>Customer</BlockCheckboxGroup.Title>
          </BlockCheckboxGroup.Header>
          <BlockCheckboxGroup.Description>
            This fee is a percentage of the supplier's bill rate added onto you
            company's bill rate, also referred as a Markup.
          </BlockCheckboxGroup.Description>
        </BlockCheckboxGroup.Item>

        <BlockCheckboxGroup.Item value="2">
          <BlockCheckboxGroup.Header>
            <BlockCheckboxGroup.Title>Supplier</BlockCheckboxGroup.Title>
          </BlockCheckboxGroup.Header>
          <BlockCheckboxGroup.Description>
            This fee is a percentage of your company's bill rate subtracted from
            the supplier's bill rate, also referred as a Discount.
          </BlockCheckboxGroup.Description>
        </BlockCheckboxGroup.Item>

        <BlockCheckboxGroup.Item value="3">
          <BlockCheckboxGroup.Header>
            <BlockCheckboxGroup.Title>Equal Split</BlockCheckboxGroup.Title>
          </BlockCheckboxGroup.Header>
          <BlockCheckboxGroup.Description>
            This fee is split equally between your company and the supplier,
            with each party responsible for 50% of the fee amount.
          </BlockCheckboxGroup.Description>
        </BlockCheckboxGroup.Item>

        <BlockCheckboxGroup.Item value="4">
          <BlockCheckboxGroup.Header>
            <BlockCheckboxGroup.Title>Custom Split</BlockCheckboxGroup.Title>
          </BlockCheckboxGroup.Header>
          <BlockCheckboxGroup.Description>
            This fee is shared between your company and the supplier using a
            custom split, letting you define how much each party pays.
          </BlockCheckboxGroup.Description>
        </BlockCheckboxGroup.Item>
      </BlockCheckboxGroup.Group>
    </div>
  );
}
