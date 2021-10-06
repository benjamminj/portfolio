import { PlaywrightTestConfig } from '@playwright/test'
import env from 'dotenv'

env.config({
  path: '.env.local',
})

const config: PlaywrightTestConfig = {
  use: {
    baseURL: process.env.TEST_BASE_URL || 'http://localhost:3000',
  },

  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Chromium (Mobile)',
      use: {
        browserName: 'chromium',
        viewport: { width: 375, height: 800 },
      },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' },
    },
  ],
}

export default config
