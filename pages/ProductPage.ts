import { Page, Locator } from '@playwright/test';

export class ProductPage {
    // General elements
    readonly page: Page;
    readonly closeCookieButton: Locator;
    readonly closeNotificationButton: Locator;
    readonly loginPopup: Locator;

    // Product specific elements
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly productImage: Locator;
    readonly thumbnailCarousel: Locator;
    readonly pinterestButton: Locator;
    readonly addToFavoritesButton: Locator;
    readonly productDescription: Locator;

    // Product page general elements
    readonly followButton: Locator;
    readonly downloadForFreeButton: Locator;
    readonly reviewsSection: Locator;
    readonly reviewForm: Locator;
    readonly allImages: Locator;
    readonly reviewSubmitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.closeCookieButton = page.locator('#cookie-consent-close');
        this.closeNotificationButton = page.getByRole('button', { name: 'Cancel' });
        this.loginPopup = page.locator('#modal-register');

        this.productTitle = page.getByRole('heading', { level: 1 });
        this.productPrice = page.getByRole('heading', { level: 2 });
        this.productImage = page.locator('.fotorama__stage__frame.fotorama__active .fotorama__img'); // UBad selector, could be fixed at HTML level
        this.thumbnailCarousel = page.locator('.fotorama__nav__frame .fotorama__img'); // Bad selector, could be fixed at HTML level
        this.pinterestButton = page.getByText('Pin', { exact: true });
        this.addToFavoritesButton = page.getByRole('button', { name: 'Add to favorites' });
        this.productDescription = page.locator('#single-product-description p').first();

        this.followButton = page.getByRole('button', { name: 'Follow Designer' });
        this.downloadForFreeButton = page.getByRole('button', { name: /Download for free/i });
        this.reviewsSection = page.locator('#review-section');
        this.reviewForm = page.locator('#review-form');
        this.reviewSubmitButton = page.getByRole('button', { name: 'Submit review' });
        this.allImages = page.locator('img');
    }

    // Using christmas-tree-lantern-bundle as the default product path for assignment purposes
    async navigate(productPath: string = '/product/christmas-tree-lantern-bundle/') {
        await this.page.goto(productPath);
        await this.dismissNotifications();
        await this.dismissCookies();
    }

    async dismissCookies() {
        if (await this.closeCookieButton.isVisible()) {
            await this.closeCookieButton.click();
        }
    }

    async dismissNotifications() {
        if (await this.closeNotificationButton.isVisible()) {
            await this.closeNotificationButton.click();
        }
    }

    async clickThumbnail(index: number) {
        const thumbnail = this.thumbnailCarousel.nth(index);
        await thumbnail.click();
    }

    async submitReview(text: string) {
        await this.reviewForm.getByRole('textbox').fill(text);
        await this.reviewSubmitButton.click();
    }

}
