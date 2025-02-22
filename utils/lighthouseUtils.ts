import { chromium } from 'playwright';
import lighthouse from 'lighthouse';
import fs from 'fs';

export async function runLighthouseAudit(url: string, category: 'performance' | 'seo') {
  // Launch Chromium using Playwright
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--remote-debugging-port=9222', // Required for Lighthouse
      '--password-store=basic',
    ],
  });

  // Run Lighthouse using the Playwright-launched Chromium
  const runnerResult = await lighthouse(url, {
    logLevel: 'info',
    output: 'json',
    onlyCategories: [category],
    port: 9222, 
  });
  if (!runnerResult) {
    throw new Error('Lighthouse runnerResult is undefined');
  }
  const report = runnerResult.lhr;

  // Save report to a file
  fs.writeFileSync('lighthouse-performance-report.json', JSON.stringify(report, null, 2));

  await browser.close();

  // Return audit results based on category
  if (category === 'seo') {
    return {
      seoScore: report.categories.seo.score ? report.categories.seo.score * 100 : null,
      metaTitle: report.audits['meta-title']?.title || null,
      metaDescription: report.audits['meta-description']?.description || null,
    };
  } else if (category === 'performance') {
    return {
      performanceScore: report.categories.performance.score ? report.categories.performance.score * 100 : null,
      metrics: {
        fcp: report.audits['first-contentful-paint'].displayValue,
        lcp: report.audits['largest-contentful-paint'].displayValue,
        tti: report.audits['interactive'].displayValue,
        cls: report.audits['cumulative-layout-shift'].displayValue,
        speedIndex: report.audits['speed-index'].displayValue,
      }
    }
  }
}
