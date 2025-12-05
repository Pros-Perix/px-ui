import type { EChartsOption } from "echarts";

export const defaultChartTheme: Partial<EChartsOption> = {
  color: [
    "#5470c6",
    "#91cc75",
    "#fac858",
    "#ee6666",
    "#73c0de",
    "#3ba272",
    "#fc8452",
    "#9a60b4",
    "#ea7ccc",
  ],
  backgroundColor: "transparent",
  textStyle: {
    fontFamily: "inherit",
    fontSize: 12,
  },
  title: {
    textStyle: {
      color: "#333",
      fontWeight: 600,
      fontSize: 14,
    },
  },
  tooltip: {
    backgroundColor: "rgba(50, 50, 50, 0.9)",
    borderWidth: 0,
    textStyle: {
      color: "#fff",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
};

export const mergeChartOptions = (
  baseOptions: EChartsOption,
  customOptions?: EChartsOption
): EChartsOption => {
  if (!customOptions) return baseOptions;

  return {
    ...baseOptions,
    ...customOptions,
    // Deep merge for nested objects
    textStyle: { ...baseOptions.textStyle, ...customOptions.textStyle },
    title: { ...baseOptions.title, ...customOptions.title },
    tooltip: { ...baseOptions.tooltip, ...customOptions.tooltip },
    grid: { ...baseOptions.grid, ...customOptions.grid },
  };
};
