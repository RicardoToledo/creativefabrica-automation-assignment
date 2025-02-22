import { test, expect } from '../fixtures/pageFixture';

test.describe('@headed UI & Functional Tests - Product Page', () => {

    test('TC-UI-001: Verify product title is displayed correctly', async ({ productPage }) => {
        const title = await productPage.productTitle.innerText();
        expect(title).not.toBe('');
    });

    test('TC-UI-002: Check if all images are loading properly', async ({ productPage }) => {
        const imagesArray = await productPage.allImages.all();
        expect(imagesArray.length).toBeGreaterThan(0);
        for (const img of imagesArray) {
            expect(await img.getAttribute('src')).toBeDefined();
        }
    });

    test('TC-UI-003: Verify after clicking a product thumbnail the correspondent main product image shows', async ({ productPage }) => {
        const thumbnailIndex = 1; // Could be randomized or better defined in future iterations
        const expectedThumbnailSrc = await productPage.thumbnailCarousel.nth(thumbnailIndex).getAttribute('src');
        await productPage.thumbnailCarousel.nth(thumbnailIndex).click();
        await productPage.page.waitForTimeout(500); // Wait for main image to load
        const updatedMainImageSrc = await productPage.productImage.getAttribute('src');
        expect(updatedMainImageSrc).toContain(expectedThumbnailSrc);
    });

    test('TC-UI-004: Verify the product description is displayed', async ({ productPage }) => {
        expect(await productPage.productDescription.innerText()).not.toBe('');
    });

    // Skipped due to the page using Cloudflare's captcha check
    test.skip('TC-UI-005: Verify Download for free button redirects to free trial page', async ({ productPage, freeTrialPage }) => {
        await productPage.downloadForFreeButton.click();
        await expect(productPage.page).toHaveURL('https://www.creativefabrica.com/b/free-trial/');
        await expect(freeTrialPage.shoppingCartHeading).toBeVisible();
    });

    test('TC-UI-006: Verify Favorite button displays login popup for guest user', async ({ productPage }) => {
        await productPage.addToFavoritesButton.click();
        await expect(productPage.loginPopup).toBeVisible();
    });

    test('TC-UI-007: Verify Follow button displays login popup for guest user', async ({ productPage }) => {
        await productPage.followButton.click();
        await expect(productPage.loginPopup).toBeVisible();
    });

    test('TC-UI-008: Ensure customer reviews section is displayed', async ({ productPage }) => {
        await expect (productPage.reviewsSection).toBeVisible(); 
    });

    // Skipped due to product page blocking reviews without logging in, selectors being assumed
    test.skip('TC-UI-009: Validate review submission', async ({ productPage }) => {
        await productPage.submitReview('This is a test review');
        expect(productPage.page.getByRole('alert')).toContainText('Thank you for your review');
    });

    test('TC-UI-010: Verify Pin (Pinterest) button works', async ({ productPage }) => {
        await productPage.pinterestButton.click();
        const [newPage] = await Promise.all([
            productPage.page.waitForEvent('popup')
        ]);
        await newPage.waitForLoadState();
        expect(newPage.url()).toMatch(/pinterest.com/);
    });

});
