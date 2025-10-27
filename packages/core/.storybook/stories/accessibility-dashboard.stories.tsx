import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { 
  getAllComponents, 
  getOverallSystemScore,
  getComponentsByStatus 
} from "../../src/accessibility/component-status";
import { AccessibilityStatus, generateAccessibilityBadge } from "../../src/utils/accessibility";

// Dashboard Component
const AccessibilityDashboard = () => {
  const allComponents = getAllComponents();
  const systemScore = getOverallSystemScore();
  const compliantComponents = getComponentsByStatus(AccessibilityStatus.COMPLIANT);
  const partialComponents = getComponentsByStatus(AccessibilityStatus.PARTIAL);
  const nonCompliantComponents = getComponentsByStatus(AccessibilityStatus.NON_COMPLIANT);

  const getStatusColor = (status: string) => {
    switch(status) {
      case AccessibilityStatus.COMPLIANT: return 'text-green-600 bg-green-100';
      case AccessibilityStatus.PARTIAL: return 'text-yellow-600 bg-yellow-100';
      case AccessibilityStatus.NON_COMPLIANT: return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">WCAG 2.1 AA Compliance Dashboard</h1>
      
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Overall Score</h3>
          <p className={`text-2xl font-bold ${getScoreColor(systemScore)}`}>
            {(systemScore * 100).toFixed(1)}%
          </p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Compliant</h3>
          <p className="text-2xl font-bold text-green-600">{compliantComponents.length}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Partial</h3>
          <p className="text-2xl font-bold text-yellow-600">{partialComponents.length}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Non-Compliant</h3>
          <p className="text-2xl font-bold text-red-600">{nonCompliantComponents.length}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">WCAG 2.1 AA Compliance Progress</span>
          <span className="text-sm text-gray-500">{(systemScore * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getScoreColor(systemScore).includes('green') ? 'bg-green-600' : 
              getScoreColor(systemScore).includes('yellow') ? 'bg-yellow-600' : 'bg-red-600'}`}
            style={{ width: `${systemScore * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Component Status Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Component Status</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Component
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Critical Issues
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allComponents.map((component) => (
                <tr key={component.component}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {component.component}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(component.wcag21_aa)}`}>
                      {generateAccessibilityBadge(component.wcag21_aa)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${getScoreColor(component.overallConfidence).includes('green') ? 'bg-green-600' : 
                            getScoreColor(component.overallConfidence).includes('yellow') ? 'bg-yellow-600' : 'bg-red-600'}`}
                          style={{ width: `${component.overallConfidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">
                        {(component.overallConfidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="max-w-xs">
                      {component.criticalIssues.slice(0, 2).map((issue, index) => (
                        <div key={index} className="text-xs mb-1">• {issue}</div>
                      ))}
                      {component.criticalIssues.length > 2 && (
                        <div className="text-xs text-gray-400">
                          +{component.criticalIssues.length - 2} more
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Testing Information */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Testing Methodology</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">🤖 Automated (70%)</h4>
            <ul className="text-blue-700 space-y-1">
              <li>• axe-core violations</li>
              <li>• Color contrast analysis</li>
              <li>• ARIA validation</li>
              <li>• Semantic HTML checks</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">⚖️ Semi-Automated (20%)</h4>
            <ul className="text-blue-700 space-y-1">
              <li>• Focus visibility verification</li>
              <li>• Error handling assessment</li>
              <li>• Label association review</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">👤 Manual (10%)</h4>
            <ul className="text-blue-700 space-y-1">
              <li>• Screen reader testing</li>
              <li>• User journey validation</li>
              <li>• Content clarity review</li>
              <li>• Cognitive load assessment</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-3">Priority Action Items</h3>
        <div className="space-y-2 text-sm text-red-700">
          <div>🚨 <strong>High Priority:</strong> Implement label association for form components</div>
          <div>⚠️ <strong>Medium Priority:</strong> Add visible focus indicators across all components</div>
          <div>🔍 <strong>Low Priority:</strong> Verify color contrast ratios for design tokens</div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof AccessibilityDashboard> = {
  title: "Documentation/Accessibility Dashboard",
  component: AccessibilityDashboard,
  parameters: {
    docs: {
      description: {
        component: `
# WCAG 2.1 AA Compliance Dashboard

This dashboard provides a comprehensive overview of the accessibility compliance status across all components in the px-ui design system.

## Key Metrics
- **Overall Score**: Weighted average of automated, semi-automated, and manual testing
- **Component Status**: Individual component compliance levels
- **Critical Issues**: High-priority accessibility barriers
- **Testing Coverage**: Breakdown of automated vs manual testing

## How to Use
1. **Review overall progress** towards WCAG 2.1 AA compliance
2. **Identify priority components** that need accessibility improvements
3. **Track progress** over time as issues are resolved
4. **Plan accessibility work** based on critical issues listed

## Testing Commands
- \`pnpm test:a11y\` - Run automated accessibility tests
- \`pnpm test:a11y:ci\` - Run tests in CI environment

## Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Accessibility Documentation](/?path=/docs/documentation-accessibility--docs)
        `
      }
    },
    layout: 'fullscreen'
  },
};

export default meta;

export const Dashboard: StoryObj<typeof AccessibilityDashboard> = {};