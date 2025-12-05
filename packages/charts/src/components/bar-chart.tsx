import React from "react";
import { BaseChart } from "./base-chart";
import type { EChartsOption } from "echarts";
import type { BaseChartProps, ChartDataItem } from "../types";

export interface BarChartProps extends Omit<BaseChartProps, "options"> {
  data: ChartDataItem[];
  xKey: string;
  yKey: string;
  horizontal?: boolean;
  options?: EChartsOption;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xKey,
  yKey,
  title,
  height = 300,
  width = "100%",
  className,
  horizontal = false,
  options,
}) => {
  const xData = data
    .map((item) => item[xKey])
    .filter((val): val is string | number => val != null && typeof val !== 'boolean') as (string | number)[];
  const yData = data
    .map((item) => item[yKey])
    .filter((val): val is number => typeof val === 'number') as number[];

  const chartOption: EChartsOption = {
    title: title ? { text: title } : undefined,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: horizontal
      ? {
          type: "value",
        }
      : {
          type: "category",
          data: xData as any,
        },
    yAxis: horizontal
      ? {
          type: "category",
          data: xData as any,
        }
      : {
          type: "value",
        },
    series: [
      {
        type: "bar",
        data: yData as any,
        barMaxWidth: 50,
      },
    ],
  };

  return (
    <BaseChart
      option={chartOption}
      height={height}
      width={width}
      className={className}
      customOptions={options}
    />
  );
};
