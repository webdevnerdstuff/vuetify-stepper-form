// eslint.config.js
import eslint from '@eslint/js';
import wdnsConfig from '@wdns/eslint-config-wdns';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import AutoImportJson from './.eslintrc-auto-import.json' with { type: 'json' };
import vueTsEslintConfig from '@vue/eslint-config-typescript';


export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs['flat/essential'],
	...vueTsEslintConfig(),
	...wdnsConfig,
	{
		ignores: [
			'vite.build.config.mts',
			'vite.config.mts',
			'src/playground/configs/templates/PlaygroundPage.vue',
		],
	},
	{
		name: 'app/files-to-lint',
		files: ['**/*.{ts,mts,tsx,vue}'],
		languageOptions: {
			...AutoImportJson,
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				parser: tseslint.parser,
				project: './tsconfig.json',
				extraFileExtensions: ['.vue'],
				sourceType: 'module',
			},
		},
		plugins: {
			'typescript-eslint': tseslint.plugin,
		},
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json',
				},
			},
		},
	},
);
