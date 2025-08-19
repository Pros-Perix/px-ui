import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as BlockRadioGroup from "../../src/components/block-radio-group";

const meta: Meta = {
  component: BlockRadioGroupDemo,
  title: "Components/block-radio-group",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  args: {},
};

function BlockRadioGroupDemo() {
  return (
    <div className="space-y-10">
      <h1 className="mb-5 font-sans-sb text-ppx-base">Example one</h1>
      <BlockRadioGroup.Group>
        <BlockRadioGroup.Item value="1" className="w-[400px]">
          <BlockRadioGroup.Header>
            <BlockRadioGroup.Title>Contractor</BlockRadioGroup.Title>
          </BlockRadioGroup.Header>
          <BlockRadioGroup.Description>
            A self-employed person or entity that works with the company on a
            contractual basis.
          </BlockRadioGroup.Description>
        </BlockRadioGroup.Item>

        <BlockRadioGroup.Item value="2" className="w-[400px]">
          <BlockRadioGroup.Header>
            <BlockRadioGroup.Title>
              Direct hire (Employee)
            </BlockRadioGroup.Title>
          </BlockRadioGroup.Header>
          <BlockRadioGroup.Description>
            A team member on the company payroll where the business sets the
            working timings and schedule.
          </BlockRadioGroup.Description>
        </BlockRadioGroup.Item>
      </BlockRadioGroup.Group>

      <h1 className="mb-5 font-sans-sb text-ppx-base">Example two</h1>
      <BlockRadioGroup.Group className="gap-4 grid grid-cols-2">
        <BlockRadioGroup.Item value="1">
          <BlockRadioGroup.Header>
            <BlockRadioGroup.Title>Customer</BlockRadioGroup.Title>
          </BlockRadioGroup.Header>
          <BlockRadioGroup.Description>
            This fee is a percentage of the supplier's bill rate added onto you
            company's bill rate, also referred as a Markup.
          </BlockRadioGroup.Description>
        </BlockRadioGroup.Item>

        <BlockRadioGroup.Item value="2">
          <BlockRadioGroup.Header>
            <BlockRadioGroup.Title>Supplier</BlockRadioGroup.Title>
          </BlockRadioGroup.Header>
          <BlockRadioGroup.Description>
            This fee is a percentage of your company's bill rate subtracted from
            the supplier's bill rate, also referred as a Discount.
          </BlockRadioGroup.Description>
        </BlockRadioGroup.Item>

        <BlockRadioGroup.Item value="3">
          <BlockRadioGroup.Header>
            <BlockRadioGroup.Title>Equal Split</BlockRadioGroup.Title>
          </BlockRadioGroup.Header>
          <BlockRadioGroup.Description>
            This fee is split equally between your company and the supplier,
            with each party responsible for 50% of the fee amount.
          </BlockRadioGroup.Description>
        </BlockRadioGroup.Item>

        <BlockRadioGroup.Item value="4">
          <BlockRadioGroup.Header>
            <BlockRadioGroup.Title>Custom Split</BlockRadioGroup.Title>
          </BlockRadioGroup.Header>
          <BlockRadioGroup.Description>
            This fee is shared between your company and the supplier using a
            custom split, letting you define how much each party pays.
          </BlockRadioGroup.Description>
        </BlockRadioGroup.Item>
      </BlockRadioGroup.Group>
    </div>
  );
}
