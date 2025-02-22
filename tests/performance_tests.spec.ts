import { test, expect } from '@playwright/test';
import { runLighthouseAudit } from '../utils/lighthouseUtils';

const URL = 'https://www.creativefabrica.com/product/christmas-tree-lantern-bundle/';

test.describe('Performance Testing Suite with Chromium', () => {

  test('TC-PERF-001: Measure page load time under 3 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto(URL);
    const loadTime = Date.now() - start;
    console.log(`Page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(3000);
  });

  // Failing as Score is less than 80
  test.fail('TC-PERF-002: Lighthouse audit using Chromium', async () => {
    const auditResult = await runLighthouseAudit(URL, 'performance');
    if (auditResult && 'performanceScore' && 'metrics' in auditResult) {
        console.log(`Lighthouse Performance Score: ${auditResult.performanceScore}`);
        console.log('Performance Metrics:', auditResult.metrics);
        expect.soft(auditResult.performanceScore, `Performance score ${auditResult.performanceScore} less than 80`).toBeGreaterThan(80);
        if (auditResult.metrics) {
            expect(auditResult.metrics.fcp).toBeDefined();
            expect(auditResult.metrics.lcp).toBeDefined();
            expect(auditResult.metrics.tti).toBeDefined();
            expect(auditResult.metrics.cls).toBeDefined();
        } else {
            throw new Error('Performance audit result did not return valid metrics.');
        }
    } else {
        throw new Error('Performance audit result did not return a valid seoScore.');
    }  
  });

  // To investigate more, some times console errors are found
  test.fixme('TC-PERF-003: Verify no console errors during page load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto(URL);
    expect(errors.length, `Console errors found: ${errors.length}`).toBe(0);
  });

  // Failing as there more than 100 requests (~130)
  test.fail('TC-PERF-004: Validate number of network requests under 100', async ({ page }) => {
    let requestCount = 0;
    page.on('request', () => {
      requestCount++;
    });
    await page.goto(URL);
    expect(requestCount).toBeLessThan(100);
  });
});
