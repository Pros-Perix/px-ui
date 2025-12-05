import type { EChartsOption } from "echarts";

export interface BaseChartProps {
  title?: string;
  height?: number | string;
  width?: number | string;
  className?: string;
  options?: EChartsOption;
}

export interface ChartDataItem {
  [key: string]: string | number | boolean | null | undefined;
}
