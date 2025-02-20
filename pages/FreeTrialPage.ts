import { Page, Locator } from '@playwright/test';

export class FreeTrialPage {
    readonly page: Page;
    readonly shoppingCartHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        // Hardcoded selector, a counter logic should be handling number of cart items
        this.shoppingCartHeading = page.getByRole('heading', { name: 'Your shopping cart (1 item)' });
    }

    async navigate() {
        await this.page.goto('/free-trial');
    }

    async verifyShoppingCartHeading() {
        await this.shoppingCartHeading.isVisible();
    }
}