import { test, expect } from '@playwright/test';

// Hardcoded URL should be replaced with logic handling the product ID to test
const productid = 'example-product-id';
const API_URL = `https://www.creativefabrica.com/product/${productid}`;

// Exmaple of API tests, skipped due not proper endpoint ot test
test.describe.skip('API Tests - Product Data Validation', () => {
    
    test('TC-API-001: Validate Product API Response', async ({ request }) => {
        const response = await request.get(API_URL);
        expect(response.status()).toBe(200);
        const body = await response.json();
        // Verification of correct data in body
        expect(body.name).toContain('Christmas Tree Lantern Bundle');
        expect(body.price).toBeGreaterThan(0); // Or expected controlled price
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

    test('TC-API-004: Validate Product API Response Structure', async ({ request }) => {
        const response = await request.get(API_URL);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('price');
        expect(body).toHaveProperty('images');
    });

    test('TC-API-005: Check for Missing Fields in Product API Response', async ({ request }) => {
        const response = await request.get(API_URL);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.name).toBeDefined();
        expect(body.price).toBeDefined();
        expect(body.images).toBeDefined();
    });

    test('TC-API-006: Validate Product Price Format', async ({ request }) => {
        const response = await request.get(API_URL);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(typeof body.price).toBe('number');
    });

    test('TC-API-007: Check for Unauthorized Access', async ({ request }) => {
        const response = await request.get(API_URL, {
            headers: {
                'Authorization': 'InvalidToken'
            }
        });
        expect(response.status()).toBe(401);
    });

    test('TC-API-008: Validate Product Images URLs', async ({ request }) => {
        const response = await request.get(API_URL);
        expect(response.status()).toBe(200);
        const body = await response.json();
        for (const imageUrl of body.images) {
            const imageResponse = await request.get(imageUrl);
            expect(imageResponse.status()).toBe(200);
        }
    });

});
