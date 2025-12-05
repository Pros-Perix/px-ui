import React from "react";
import { BaseChart } from "./base-chart";
import type { EChartsOption } from "echarts";
import type { BaseChartProps, ChartDataItem } from "../types";

export interface PieChartProps extends Omit<BaseChartProps, "options"> {
  data: ChartDataItem[];
  nameKey: string;
  valueKey: string;
  showLegend?: boolean;
  donut?: boolean;
  options?: EChartsOption;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  nameKey,
  valueKey,
  title,
  height = 300,
  width = "100%",
  className,
  showLegend = true,
  donut = false,
  options,
}) => {
  const chartData = data
    .map((item) => ({
      name: String(item[nameKey] ?? ''),
      value: typeof item[valueKey] === 'number' ? item[valueKey] : 0,
    }))
    .filter((item) => item.name && typeof item.value === 'number');

  const chartOption: EChartsOption = {
    title: title ? { text: title, left: "center" } : undefined,
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: showLegend
      ? {
          orient: "horizontal",
          bottom: "0",
        }
      : undefined,
    series: [
      {
        name: title || "Data",
        type: "pie",
        radius: donut ? ["40%", "70%"] : "70%",
        center: ["50%", "50%"],
        data: chartData as any,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          show: true,
          formatter: "{b}: {d}%",
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
