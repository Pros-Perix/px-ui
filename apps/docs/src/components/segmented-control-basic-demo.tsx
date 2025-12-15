import { SegmentedControl } from "@px-ui/core";

export function SegmentedControlBasicDemo() {
  return (
    <SegmentedControl.Root defaultValue="week">
      <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
      <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
      <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
      <SegmentedControl.Item value="year">Year</SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}
