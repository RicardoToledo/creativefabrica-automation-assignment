import { test, expect } from '../fixtures/productFixture';

test.describe('UI & Functional Tests - Product Page', () => {

    test('TC-001: Verify product title is displayed correctly', async ({ productPage }) => {
        const title = await productPage.getProductTitle();
        expect(title).not.toBe('');
    });

    test('TC-002: Check if all images are loading properly', async ({ productPage }) => {
        const imagesArray = await productPage.allImages.all();
        expect(imagesArray.length).toBeGreaterThan(0);
        for (const img of imagesArray) {
            expect(await img.getAttribute('src')).toBeDefined();
        }
    });

    test('TC-004: Verify after clicking a product thumbnail the correspondent main product image shows', async ({ productPage }) => {
        const thumbnailIndex = 3; // Could be randomized in future iterations
        const expectedThumbnailSrc = await productPage.thumbnailCarousel.nth(thumbnailIndex).getAttribute('src');
        await productPage.clickThumbnail(thumbnailIndex);
        const updatedMainImageSrc = await productPage.productImage.getAttribute('src');
        expect(updatedMainImageSrc).toBe(expectedThumbnailSrc);
    });

    test('TC-005: Verify the product description is displayed', async ({ productPage }) => {
        expect(await productPage.getProductDescription()).not.toBe('');
    });

    test('TC-006: Verify Add to Cart button functionality', async ({ productPage }) => {
        await productPage.addToCart();
        expect(await productPage.getCartCount()).not.toBe('0');
    });

    test('TC-007: Verify Favorite button works', async ({ productPage }) => {
        await productPage.addToFavorites();
        expect(await productPage.favoriteButton.getAttribute('aria-pressed')).toBe('true');
    });

    test('TC-008: Ensure product price is formatted correctly', async ({ productPage }) => {
        expect(await productPage.getProductPrice()).toMatch(/^\€?\d+(\.\d{2})?$/);
    });

    test('TC-009: Verify product SKU or ID is displayed', async ({ productPage }) => {
        expect(await productPage.getSkuOrProductId()).not.toBe('');
    });

    test('TC-010: Ensure download details are displayed', async ({ productPage }) => {
        expect(await productPage.downloadDetails.innerText()).not.toBe('');
    });

    test('TC-011: Verify clicking "Add to Cart" updates the cart counter', async ({ productPage }) => {
        await productPage.addToCart();
        expect(parseInt(await productPage.getCartCount())).toBeGreaterThan(0);
    });

    test('TC-012: Check if cart popup displays added product', async ({ productPage }) => {
        await productPage.addToCart();
        expect(await productPage.checkCartPopup()).toContain('Christmas Tree Lantern Bundle');
    });

    test('TC-013: Ensure product can be removed from cart', async ({ productPage }) => {
        await productPage.addToCart();
        await productPage.removeFromCart();
        expect(await productPage.getCartCount()).toBe('0');
    });

    test('TC-014: Verify "Go to Checkout" redirects correctly', async ({ productPage }) => {
        await productPage.addToCart();
        await productPage.goToCheckout();
        expect(productPage.page).toHaveURL(/checkout/);
    });

    test('TC-015: Ensure customer reviews are displayed', async ({ productPage }) => {
        expect(await productPage.reviewsSection.innerText()).toContain('Reviews');
    });

    test('TC-016: Validate review submission', async ({ productPage }) => {
        await productPage.submitReview('This is a test review');
        expect(await productPage.page.getByRole('alert')).toContainText('Thank you for your review');
    });

    test('TC-017: Verify sorting reviews by most recent', async ({ productPage }) => {
        await productPage.sortReviewsByMostRecent();
        expect(await productPage.page.locator('.review-item').first()).toBeVisible();
    });

    test('TC-018: Verify sharing buttons work', async ({ productPage }) => {
        await productPage.socialShareButtons.getByRole('button', { name: /share on facebook/i }).click();
        expect(productPage.page).toHaveURL(/facebook.com/);
    });

    test('TC-019: Verify download button functionality', async ({ productPage }) => {
        await productPage.clickDownloadButton();
    });

});
