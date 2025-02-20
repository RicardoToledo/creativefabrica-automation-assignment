import { test, expect } from '@playwright/test';

const API_URL = 'https://api.creativefabrica.com/product/{id}';

test.describe('API Tests - Product Data Validation', () => {
    
    test('TC-API-001: Validate Product API Response', async ({ request }) => {
        const response = await request.get(API_URL);
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(body.name).toContain('Christmas Tree Lantern Bundle');
        expect(body.price).toBeGreaterThan(0);
        expect(body.images.length).toBeGreaterThan(0);
    });

    test('TC-API-002: Verify API Returns Expected Headers', async ({ request }) => {
        const response = await request.get(API_URL);
        expect(response.headers()['content-type']).toContain('application/json');
    });

    test('TC-API-003: Ensure API Response Time is Below 500ms', async ({ request }) => {
        const start = Date.now();
        await request.get(API_URL);
        const duration = Date.now() - start;
        expect(duration).toBeLessThan(500);
    });

});
