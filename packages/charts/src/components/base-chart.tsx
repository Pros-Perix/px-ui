import React from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import { defaultChartTheme, mergeChartOptions } from "../utils/chart-theme";

export interface BaseChartProps {
  option: EChartsOption;
  height?: number | string;
  width?: number | string;
  className?: string;
  customOptions?: EChartsOption;
}

export const BaseChart: React.FC<BaseChartProps> = ({
  option,
  height = 300,
  width = "100%",
  className = "",
  customOptions,
}) => {
  const finalOptions = mergeChartOptions(
    {
      ...defaultChartTheme,
      ...option,
    },
    customOptions
  );

  return (
    <ReactECharts
      option={finalOptions}
      style={{ height, width }}
      className={className}
      notMerge={true}
      lazyUpdate={true}
    />
  );
};
