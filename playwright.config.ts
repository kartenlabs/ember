import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  forbidOnly: Boolean(process.env.CI),
  use: {
    baseURL: 'http://127.0.0.1:3104',
    browserName: 'chromium',
    timezoneId: 'America/Los_Angeles',
    launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH },
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run build && npm run start -- --hostname 127.0.0.1 --port 3104',
    url: 'http://127.0.0.1:3104',
    timeout: 120_000,
  },
});
