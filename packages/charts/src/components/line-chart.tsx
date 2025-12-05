import React from "react";
import { BaseChart } from "./base-chart";
import type { EChartsOption } from "echarts";
import type { BaseChartProps, ChartDataItem } from "../types";

export interface LineChartProps extends Omit<BaseChartProps, "options"> {
  data: ChartDataItem[];
  xKey: string;
  yKey: string;
  smooth?: boolean;
  area?: boolean;
  showPoints?: boolean;
  options?: EChartsOption;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  xKey,
  yKey,
  title,
  height = 300,
  width = "100%",
  className,
  smooth = false,
  area = false,
  showPoints = true,
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
    },
    xAxis: {
      type: "category",
      data: xData as any,
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "line",
        data: yData as any,
        smooth: smooth,
        showSymbol: showPoints,
        areaStyle: area ? {} : undefined,
        lineStyle: {
          width: 2,
        },
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
