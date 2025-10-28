#!/usr/bin/env tsx

import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

interface A11yTestResult {
  component: string;
  url: string;
  violations: Array<{
    id: string;
    impact: string;
    description: string;
    help: string;
    helpUrl: string;
    nodes: Array<{
      html: string;
      target: string[];
    }>;
  }>;
  passes: Array<{
    id: string;
    description: string;
  }>;
  timestamp: string;
}

const STORYBOOK_URL = 'http://localhost:6969';
const MAX_CONCURRENT_TESTS = 5; // Limit concurrent browser instances

const COMPONENTS_TO_TEST = [
  'button--default',
  'button--primary', 
  'button--icon',
  'text-input--default',
  'text-input--with-error',
  'checkbox--default',
  'checkbox--checked',
  'select--default',
  'dialog--default',
  'combobox--default'
];

async function testComponentAccessibility(componentId: string): Promise<A11yTestResult> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    const url = `${STORYBOOK_URL}/iframe.html?args=&id=${componentId}&viewMode=story`;
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for component to render
    await page.waitForTimeout(1000);
    
    // Run accessibility checks using AxeBuilder
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    return {
      component: componentId,
      url,
      violations: results.violations.map(violation => ({
        id: violation.id,
        impact: violation.impact || 'unknown',
        description: violation.description,
        help: violation.help,
        helpUrl: violation.helpUrl,
        nodes: violation.nodes.map(node => ({
          html: node.html,
          target: node.target
        }))
      })),
      passes: results.passes.map(pass => ({
        id: pass.id,
        description: pass.description
      })),
      timestamp: new Date().toISOString()
    };
  } finally {
    await browser.close();
  }
}

// Helper function to run tests in batches with concurrency limit
async function runTestsInBatches(components: string[], batchSize: number): Promise<A11yTestResult[]> {
  const results: A11yTestResult[] = [];
  
  for (let i = 0; i < components.length; i += batchSize) {
    const batch = components.slice(i, i + batchSize);
    console.log(`Running batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(components.length / batchSize)}: ${batch.join(', ')}`);
    
    const batchPromises = batch.map(async (component) => {
      try {
        console.log(`Testing ${component}...`);
        const result = await testComponentAccessibility(component);
        
        const violationCount = result.violations.length;
        const status = violationCount === 0 ? '✅' : '❌';
        console.log(`${status} ${component}: ${violationCount} violations`);
        
        return result;
      } catch (error) {
        console.error(`❌ Failed to test ${component}:`, error);
        return null;
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults.filter((result): result is A11yTestResult => result !== null));
  }
  
  return results;
}

async function runAllTests(): Promise<A11yTestResult[]> {
  console.log('🔍 Starting accessibility tests...');
  console.log(`Running ${COMPONENTS_TO_TEST.length} component tests with max ${MAX_CONCURRENT_TESTS} concurrent instances...`);
  
  return await runTestsInBatches(COMPONENTS_TO_TEST, MAX_CONCURRENT_TESTS);
}

async function generateReport(results: A11yTestResult[]): Promise<void> {
  const outputDir = path.join(process.cwd(), 'accessibility-reports');
  await fs.mkdir(outputDir, { recursive: true });
  
  // Generate JSON report
  const jsonReport = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalComponents: results.length,
      componentsWithViolations: results.filter(r => r.violations.length > 0).length,
      totalViolations: results.reduce((sum, r) => sum + r.violations.length, 0),
      totalPasses: results.reduce((sum, r) => sum + r.passes.length, 0)
    },
    results
  };
  
  await fs.writeFile(
    path.join(outputDir, 'accessibility-report.json'),
    JSON.stringify(jsonReport, null, 2)
  );
  
  // Generate Markdown report
  const markdownReport = generateMarkdownReport(jsonReport);
  await fs.writeFile(
    path.join(outputDir, 'accessibility-report.md'),
    markdownReport
  );
  
  console.log(`📊 Reports generated in ${outputDir}`);
}

function generateMarkdownReport(report: any): string {
  const { summary, results } = report;
  
  let markdown = `# Accessibility Test Report\n\n`;
  markdown += `**Generated:** ${new Date(report.generatedAt).toLocaleString()}\n\n`;
  
  markdown += `## Summary\n\n`;
  markdown += `- **Components Tested:** ${summary.totalComponents}\n`;
  markdown += `- **Components with Violations:** ${summary.componentsWithViolations}\n`;
  markdown += `- **Total Violations:** ${summary.totalViolations}\n`;
  markdown += `- **Total Passes:** ${summary.totalPasses}\n\n`;
  
  const passRate = ((summary.totalComponents - summary.componentsWithViolations) / summary.totalComponents * 100).toFixed(1);
  markdown += `**Pass Rate:** ${passRate}%\n\n`;
  
  markdown += `## Component Results\n\n`;
  
  for (const result of results) {
    const status = result.violations.length === 0 ? '✅' : '❌';
    markdown += `### ${status} ${result.component}\n\n`;
    
    if (result.violations.length > 0) {
      markdown += `**Violations (${result.violations.length}):**\n\n`;
      for (const violation of result.violations) {
        markdown += `- **${violation.id}** (${violation.impact}): ${violation.description}\n`;
        markdown += `  - [Learn more](${violation.helpUrl})\n`;
      }
      markdown += `\n`;
    } else {
      markdown += `No violations found! ✨\n\n`;
    }
    
    if (result.passes.length > 0) {
      markdown += `**Passes (${result.passes.length}):** ${result.passes.slice(0, 3).map(p => p.id).join(', ')}${result.passes.length > 3 ? '...' : ''}\n\n`;
    }
  }
  
  return markdown;
}

// Main execution
if (require.main === module) {
  runAllTests()
    .then(generateReport)
    .then(() => {
      console.log('✅ Accessibility testing complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Accessibility testing failed:', error);
      process.exit(1);
    });
}

export { testComponentAccessibility, runAllTests, generateReport };