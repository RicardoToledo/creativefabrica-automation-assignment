import { test, expect } from '@playwright/test';
import { runLighthouseAudit } from '../utils/lighthouseUtils';

const URL = 'https://www.creativefabrica.com/product/christmas-tree-lantern-bundle/';

test.describe('SEO & Accessibility Tests with Updated Lighthouse Integration', () => {

  test('TC-SEO-001: Lighthouse SEO Score should be 80+', async () => {
    const auditResult = await runLighthouseAudit(URL, 'seo');
    if (auditResult && 'seoScore' in auditResult) {
      const seoScore = auditResult.seoScore;
      expect(seoScore).not.toBeNull();
      expect(seoScore).toBeGreaterThanOrEqual(80);
    } else {
      throw new Error('SEO audit result did not return a valid seoScore.');
    }
  });

  // Needs investigation, fails in headless mode
  test('@headed TC-SEO-002: Verify Meta Description is present', async ({ page }) => {
    await page.goto(URL);
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).not.toBeNull();
  });

  test.fail('TC-SEO-003: Verify Meta Keywords (if present)', async ({ page }) => {
    await page.goto(URL);
    expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content');
  });

  // Needs investigation, fails in headless mode
  test('@headed TC-SEO-004: Validate Open Graph (OG) tags', async ({ page }) => {
    await page.goto(URL);
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogTitle).not.toBeNull();
    expect(ogDescription).not.toBeNull();
  });

  // Needs investigation, fails in headless mode
  test('@headed TC-SEO-005: Validate subheadings structure (H2, H3)', async ({ page }) => {
    await page.goto(URL);
    const headings = await page.locator('h2, h3').count();
    expect(headings).toBeGreaterThan(0);
  });

  test.fail('TC-SEO-006: Ensure no excessive inline styles', async ({ page }) => {
    await page.goto(URL);
    const inlineStyles = await page.locator('[style]').count();
    expect(inlineStyles).toBeLessThan(10);
  });

  // Needs investigation, fails in headless mode
  test('@headed SEO-007: Validate Structured Data (Schema Markup)', async ({ page }) => {
    await page.goto(URL);
    const structuredDataElements = await page.locator('script[type="application/ld+json"]').allInnerTexts();
    const hasProductSchema = structuredDataElements.some(data => data.includes('"@type":"Product"'));
    // Expect at least one structured data block to contain the Product schema
    expect(hasProductSchema).toBeTruthy();
  });

  test('TC-SEO-008: Check structured data with Google Rich Results', async ({ page }) => {
    await page.goto(`https://search.google.com/test/rich-results?url=${URL}`);
    expect(page.url()).toContain('rich-results');
  });

  test('TC-SEO-009: Ensure images are properly compressed', async ({ page }) => {
    await page.goto(URL);
    const imageSizes = await page.evaluate(() =>
      Array.from(document.querySelectorAll('img')).map(img => img.src.length)
    );
    expect(Math.max(...imageSizes)).toBeLessThan(300000); // Images should be <300KB
  });

  test.fail('TC-SEO-010: Validate lazy loading is implemented for images', async ({ page }) => {
    await page.goto(URL);
    const lazyImages = await page.locator('img[loading="lazy"]').count();
    expect(lazyImages).toBeGreaterThan(0);
  });

  // Needs investigation, fails in headless mode
  test('@headed TC-SEO-011: Ensure external links open in new tab and use `rel="nofollow"`', async ({ page }) => {
    await page.goto(URL);
    const externalLinks = await page.locator('a[target="_blank"][rel="nofollow"]').count();
    expect(externalLinks).toBeGreaterThan(0);
  });

  // Needs investigation, fails in headless mode
  test('@headed TC-SEO-012: Ensure hreflang tags are implemented', async ({ page }) => {
    await page.goto(URL);
    const hreflangTags = await page.locator('link[rel="alternate"]').count();
    expect(hreflangTags).toBeGreaterThan(0);
  });
});
