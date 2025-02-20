import { test, expect } from '@playwright/test';
import { runLighthouseSEO } from '../utils/seoUtils';

const URL = 'https://www.creativefabrica.com/product/christmas-tree-lantern-bundle/';

test.describe('Performance Tests - Page Load Speed & Lighthouse', () => {

    test('TC-PERF-001: Measure Page Load Time (Under 3s)', async ({ page }) => {
        const startTime = Date.now();
        await page.goto(URL);
        const loadTime = Date.now() - startTime;
        console.log(`⏱️ Page load time: ${loadTime}ms`);
        expect(loadTime).toBeLessThan(3000);
    });

    test('TC-PERF-002: Lighthouse Performance Score should be 80+', async ({}) => {
        const performanceScore = await runLighthouseSEO(URL);
        expect(performanceScore).toBeGreaterThanOrEqual(80);
    });

    test('TC-PERF-003: Ensure No JavaScript Errors in Console', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', msg => {
            if (msg.type() === 'error') errors.push(msg.text());
        });

        await page.goto(URL);
        expect(errors.length).toBe(0);
    });

});
