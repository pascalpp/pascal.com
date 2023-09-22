import { devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';

// set custom viewport for all desktop browsers.
// mobile devices will use their own default viewport.
const desktopOptions = {
	viewport: { width: 1024, height: 800 },
};

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	fullyParallel: true,
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				...desktopOptions,
			},
		},

		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
				...desktopOptions,
			},
		},

		{
			name: 'safari',
			use: {
				...devices['Desktop Safari'],
				...desktopOptions,
			},
		},

		{
			name: 'iphone',
			use: {
				...devices['iPhone 12'],
			},
		},
	],
};

export default config;
