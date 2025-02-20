import { test, expect } from '../fixtures/pageFixture';
import { FreeTrialPage } from '../pages/FreeTrialPage';

test.describe('UI & Functional Tests - Product Page', () => {

    test('TC-001: Verify product title is displayed correctly', async ({ productPage }) => {
        const title = await productPage.productTitle.innerText();
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
        const thumbnailIndex = 3; // Could be randomized or better defined in future iterations
        const expectedThumbnailSrc = await productPage.thumbnailCarousel.nth(thumbnailIndex).getAttribute('src');
        await productPage.thumbnailCarousel.nth(thumbnailIndex).click();
        const updatedMainImageSrc = await productPage.productImage.getAttribute('src');
        expect(updatedMainImageSrc).toBe(expectedThumbnailSrc);
    });

    test('TC-005: Verify the product description is displayed', async ({ productPage }) => {
        expect(await productPage.productDescription.innerText()).not.toBe('');
    });

    // Skipped due to the page using Cloudflare's captcha check
    test.skip('TC-006: Verify Download for free button redirects to free trial page', async ({ productPage, freeTrialPage }) => {
        await productPage.downloadForFreeButton.click();
        await expect(productPage.page).toHaveURL('https://www.creativefabrica.com/b/free-trial/');
        await expect(freeTrialPage.shoppingCartHeading).toBeVisible();
    });

    test('TC-007: Verify Favorite button displays login popup for guest user', async ({ productPage }) => {
        await productPage.favoriteButton.click();
        await expect(productPage.loginPopup).toBeVisible();
    });

    test('TC-000: Verify Follow button displays login popup for guest user', async ({ productPage }) => {
        await productPage.followButton.click();
        await expect(productPage.loginPopup).toBeVisible();
    });

    test('TC-015: Ensure customer reviews section is displayed', async ({ productPage }) => {
        await expect (productPage.reviewsSection).toBeVisible(); 
    });

    // Skipped due to product page blocking reviews without logging in, selectors being assumed
    test.skip('TC-016: Validate review submission', async ({ productPage }) => {
        await productPage.submitReview('This is a test review');
        expect(productPage.page.getByRole('alert')).toContainText('Thank you for your review');
    });

    test('TC-008: Verify Pin (Pinterest) button work', async ({ productPage }) => {
        await productPage.pinterestButton.click();
        const [newPage] = await Promise.all([
            productPage.page.waitForEvent('popup')
        ]);
        await newPage.waitForLoadState();
        expect(newPage.url()).toMatch(/pinterest.com/);
    });

});
