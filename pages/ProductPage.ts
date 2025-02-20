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
    readonly addToCartButton: Locator;
    readonly favoriteButton: Locator;
    readonly cartCounter: Locator;
    readonly checkoutButton: Locator;
    readonly reviewsSection: Locator;
    readonly socialShareButtons: Locator;
    readonly breadcrumbNavigation: Locator;
    readonly thumbnails: Locator;
    readonly skuOrProductId: Locator;
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

        this.productDescription = page.getByRole('paragraph');
        this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
        this.favoriteButton = page.getByRole('button', { name: /favorite/i });
        this.cartCounter = page.getByRole('status');
        this.checkoutButton = page.getByRole('link', { name: /checkout/i });
        this.reviewsSection = page.getByRole('region', { name: /customer reviews/i });
        this.socialShareButtons = page.getByRole('group', { name: /share/i });
        this.breadcrumbNavigation = page.getByRole('navigation', { name: /breadcrumbs/i });
        this.thumbnails = page.getByRole('button', { name: /thumbnail/i });
        this.skuOrProductId = page.getByRole('paragraph', { name: /sku|product id/i });
        this.downloadDetails = page.getByRole('region', { name: /download details/i });
        this.cartPopup = page.getByRole('dialog');
        this.removeFromCartButton = page.getByRole('button', { name: /remove/i });
        this.reviewForm = page.getByRole('form', { name: /write a review/i });
        this.reviewSubmitButton = page.getByRole('button', { name: /submit review/i });
        this.reviewSortDropdown = page.getByRole('button', { name: /sort by most recent/i });
        this.downloadButton = page.getByRole('button', { name: /download/i });
    }

    // Using christmas-tree-lantern-bundle as the default product path for assignment purposes
    async navigate(productPath: string = '/product/christmas-tree-lantern-bundle/') {
        await this.page.goto(productPath);
        await this.dismissCookies();
        await this.dismissNotifications();
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

    async addToCart() {
        await this.addToCartButton.click();
    }

    async addToFavorites() {
        await this.favoriteButton.click();
    }

    async getCartCount() {
        return this.cartCounter.innerText();
    }

    async clickThumbnail(index: number) {
        const thumbnail = this.thumbnailCarousel.nth(index);
        await thumbnail.click();
    }

    async getProductTitle() {
        return this.productTitle.innerText();
    }

    async getProductDescription() {
        return this.productDescription.innerText();
    }

    async getProductPrice() {
        return this.productPrice.innerText();
    }

    async getSkuOrProductId() {
        return this.skuOrProductId.innerText();
    }

    async checkCartPopup() {
        return this.cartPopup.innerText();
    }

    async removeFromCart() {
        await this.removeFromCartButton.click();
    }

    async submitReview(text: string) {
        await this.reviewForm.getByRole('textbox').fill(text);
        await this.reviewSubmitButton.click();
    }

    async sortReviewsByMostRecent() {
        await this.reviewSortDropdown.click();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async clickDownloadButton() {
        await this.downloadButton.click();
    }
}
