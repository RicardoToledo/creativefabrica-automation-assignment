import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    // timeout: 60000,
    reporter: [
        ['list'],
        ['html', { outputFolder: 'test-results' }]
    ],
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'https://www.creativefabrica.com',
        headless: true,
        // trace: 'on',
        // video: 'on',
        // screenshot: 'on',
        launchOptions: {
          /* Slow down Playwright operations by the specified amount of milliseconds. */
          slowMo: 1500
        }
    },

    /* Configure projects for major browsers */
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      },
  
      /* Test against mobile viewports. */
      {
        name: 'Mobile Chrome',
        use: { ...devices['Pixel 5'] },
      },
      {
        name: 'Mobile Safari',
        use: { ...devices['iPhone 12'] },
      },
  
      /* Test against branded browsers. */
      // {
      //   name: 'Microsoft Edge',
      //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
      // },
      // {
      //   name: 'Google Chrome',
      //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      // },
    ]
});
