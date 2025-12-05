import React from "react";

export interface NumericWidgetProps {
  label: string;
  value: number | string;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
  formatValue?: (value: number | string) => string;
}

export const NumericWidget: React.FC<NumericWidgetProps> = ({
  label,
  value,
  trend,
  ctaLabel,
  onCtaClick,
  className = "",
  formatValue,
}) => {
  const displayValue = formatValue ? formatValue(value) : value;

  return (
    <div
      className={`flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-gray-200 ${className}`}
    >
      <div className="text-sm text-gray-600 mb-2">{label}</div>
      <div className="flex items-baseline gap-2">
        <div className="text-4xl font-semibold text-gray-900">
          {displayValue}
        </div>
        {trend && (
          <div
            className={`text-sm font-medium ${
              trend.direction === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.direction === "up" ? "↑" : "↓"} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      {ctaLabel && onCtaClick && (
        <button
          onClick={onCtaClick}
          className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
};
