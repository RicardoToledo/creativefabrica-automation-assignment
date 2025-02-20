import { test as baseTest } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { FreeTrialPage } from '../pages/FreeTrialPage';

type Fixtures = {
    productPage: ProductPage;
    freeTrialPage: FreeTrialPage;
};

export const test = baseTest.extend<Fixtures>({
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await productPage.navigate();
        await use(productPage);
    },

    freeTrialPage: async ({ page }, use) => {
        const freeTrialPage = new FreeTrialPage(page);
        await freeTrialPage.navigate();
        await use(freeTrialPage);
    },
});

export { expect } from '@playwright/test';
