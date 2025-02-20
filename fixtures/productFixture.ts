import { test as baseTest } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

type Fixtures = {
    productPage: ProductPage;
};

export const test = baseTest.extend<Fixtures>({
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await productPage.navigate();
        await use(productPage);
    },
});

export { expect } from '@playwright/test';
