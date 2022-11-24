import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: process.env.CI
		? undefined
		: {
				command: 'npm run build && npm run preview',
				port: 4173
		  },
	use: {
		baseURL: process.env.CI ? process.env.TEST_BASE_URL : 'http://localhost:4173'
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
