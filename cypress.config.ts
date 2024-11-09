import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},

	component: {
		devServer: {
			bundler: 'vite',
			framework: 'vue',
		},
		viewportWidth: 1200,
	},
});
