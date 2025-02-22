import { test } from '@playwright/test'
import { ai } from '@zerostep/playwright'

test.describe('@headed @chomium AI UI & Functional Tests - Product Page', () => {

    test.skip('TC-AI-001: Verify header and footer are displayed correctly', async ({ page }) => {
        await page.goto('https://www.creativefabrica.com/product/christmas-tree-lantern-bundle/')
        await ai('Allow notifications', { page, test })
        await ai('Close cookies message', { page, test })
        await ai('Verify that header is displayed', { page, test })
        await ai('Verify that footer is displayed', { page, test })
    });

});
