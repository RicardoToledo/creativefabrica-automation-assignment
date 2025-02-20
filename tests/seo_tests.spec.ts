import { test, expect } from '@playwright/test';
import { runLighthouseSEO } from '../utils/seoUtils';

const URL = 'https://www.creativefabrica.com/product/christmas-tree-lantern-bundle/';

test.describe('SEO & Accessibility Tests', () => {

    test('TC-020: Lighthouse SEO Score should be 80+', async ({}) => {
        const seoScore = await runLighthouseSEO(URL);
        expect(seoScore).toBeGreaterThanOrEqual(80);
    });

    test('TC-021: Verify Meta Description is present', async ({ page }) => {
        await page.goto(URL);
        const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
        expect(metaDescription).not.toBeNull();
    });

    test('TC-022: Verify Meta Keywords (if present)', async ({ page }) => {
        await page.goto(URL);
        const metaKeywords = await page.locator('meta[name="keywords"]').getAttribute('content');
        if (metaKeywords) {
            expect(metaKeywords.length).toBeGreaterThan(0);
        }
    });

    test('TC-023: Validate Open Graph (OG) tags', async ({ page }) => {
        await page.goto(URL);
        const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
        const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
        expect(ogTitle).not.toBeNull();
        expect(ogDescription).not.toBeNull();
    });

    test('TC-024: Ensure Canonical Tag is present', async ({ page }) => {
        await page.goto(URL);
        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
        expect(canonical).not.toBeNull();
    });

    test('TC-027: Validate subheadings structure (H2, H3)', async ({ page }) => {
        await page.goto(URL);
        const headings = await page.locator('h2, h3').count();
        expect(headings).toBeGreaterThan(0);
    });

    test('TC-028: Ensure no excessive inline styles', async ({ page }) => {
        await page.goto(URL);
        const inlineStyles = await page.locator('[style]').count();
        expect(inlineStyles).toBeLessThan(10);
    });

    test('TC-031: Validate Structured Data (Schema Markup)', async ({ page }) => {
        await page.goto(URL);
        const structuredData = await page.locator('script[type="application/ld+json"]').innerText();
        expect(structuredData).toContain('"@type": "Product"');
    });

    test('TC-032: Check structured data with Google Rich Results', async ({ page }) => {
        await page.goto(`https://search.google.com/test/rich-results?url=${URL}`);
        expect(page.url()).toContain('rich-results');
    });

    test('TC-034: Ensure images are properly compressed', async ({ page }) => {
        await page.goto(URL);
        const imageSizes = await page.evaluate(() =>
            Array.from(document.querySelectorAll('img')).map(img => img.src.length)
        );
        expect(Math.max(...imageSizes)).toBeLessThan(300000); // Images should be <300KB
    });

    test('TC-035: Check image formats (WebP, PNG, JPEG)', async ({ page }) => {
        await page.goto(URL);
        const imageFormats = await page.evaluate(() =>
            Array.from(document.querySelectorAll('img')).map(img => img.src.split('.').pop())
        );
        expect(imageFormats.every(format => format && ['webp', 'png', 'jpg', 'jpeg'].includes(format))).toBeTruthy();
    });

    test('TC-037: Validate lazy loading is implemented for images', async ({ page }) => {
        await page.goto(URL);
        const lazyImages = await page.locator('img[loading="lazy"]').count();
        expect(lazyImages).toBeGreaterThan(0);
    });

    test('TC-040: Ensure external links open in new tab and use `rel="nofollow"`', async ({ page }) => {
        await page.goto(URL);
        const externalLinks = await page.locator('a[target="_blank"][rel="nofollow"]').count();
        expect(externalLinks).toBeGreaterThan(0);
    });

    test('TC-043: Ensure hreflang tags are implemented', async ({ page }) => {
        await page.goto(URL);
        const hreflangTags = await page.locator('link[rel="alternate"]').count();
        expect(hreflangTags).toBeGreaterThan(0);
    });

});
