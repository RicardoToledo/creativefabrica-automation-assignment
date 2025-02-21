import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly closeCookieButton: Locator;
    readonly closeNotificationButton: Locator;
    readonly allImages: Locator;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly productImage: Locator;
    readonly thumbnailCarousel: Locator;
    readonly productDescription: Locator;
    readonly downloadForFreeButton: Locator;
    readonly favoriteButton: Locator;
    readonly followButton: Locator;
    readonly loginPopup: Locator;
    readonly cartCounter: Locator;
    readonly checkoutButton: Locator;
    readonly reviewsSection: Locator;
    readonly pinterestButton: Locator;
    readonly breadcrumbNavigation: Locator;
    readonly thumbnails: Locator;
    readonly downloadDetails: Locator;
    readonly cartPopup: Locator;
    readonly removeFromCartButton: Locator;
    readonly reviewForm: Locator;
    readonly reviewSubmitButton: Locator;
    readonly reviewSortDropdown: Locator;
    readonly downloadButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.closeCookieButton = page.locator('#cookie-consent-close');
        this.closeNotificationButton = page.getByRole('button', { name: 'Cancel' });
        this.allImages = page.locator('img');
        this.productTitle = page.getByRole('heading', { level: 1 });
        this.productPrice = page.getByRole('heading', { level: 2 });
        
        // Ugly/bad selectors, could be improved at HTML level
        this.productImage = page.locator('.fotorama__stage__frame.fotorama__active .fotorama__img');
        this.thumbnailCarousel = page.locator('.fotorama__nav__frame .fotorama__img');

        this.productDescription = page.locator('#single-product-description p').first();
        this.downloadForFreeButton = page.getByRole('button', { name: /Download for free/i });

        this.favoriteButton = page.getByRole('button', { name: 'Add to favorites' });
        this.followButton = page.getByRole('button', { name: 'Follow Designer' });
        this.loginPopup = page.locator('#modal-register');
        this.cartCounter = page.locator('.cart-counter');
        this.checkoutButton = page.getByRole('link', { name: 'Checkout' });
        this.reviewsSection = page.locator('#review-section');
        // this.pinterestButton = page.getByTitle('Pinterest');
        this.pinterestButton = page.getByText('Pin', { exact: true });
        this.breadcrumbNavigation = page.locator('.breadcrumb');
        this.thumbnails = page.locator('.thumbnail-carousel button');
        this.downloadDetails = page.locator('.download-details');
        this.cartPopup = page.locator('.cart-popup');
        this.removeFromCartButton = page.getByRole('button', { name: 'Remove from cart' });
        this.reviewForm = page.locator('#review-form');
        this.reviewSubmitButton = page.getByRole('button', { name: 'Submit review' });
        this.reviewSortDropdown = page.locator('.review-sort-dropdown');
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
