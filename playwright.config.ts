import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./global-setup'),
  use: {
    baseURL: 'https://www.demoblaze.com',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },*/
    /*{
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ]
};
export default config;