import type { PlaywrightTestConfig } from '@playwright/test';
import 'dotenv/config'

const config: PlaywrightTestConfig = {
	webServer: undefined,
	use: {
	baseURL: process.env.CI ? process.env.TEST_BASE_URL : 'http://localhost:3000'
	},
	projects: [
		{
			name: 'Chromium',
			use: { browserName: 'chromium' }
		},
		{
			name: 'Chromium (Mobile)',
			use: {
				browserName: 'chromium',
				viewport: { width: 375, height: 800 }
			}
		},
		{
			name: 'Firefox',
			use: { browserName: 'firefox' }
		},
		{
			name: 'WebKit',
			use: { browserName: 'webkit' }
		}
	]
};

export default config;
