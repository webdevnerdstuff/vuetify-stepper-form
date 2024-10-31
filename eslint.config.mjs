// eslint.config.js
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';
import typescript from '@typescript-eslint/eslint-plugin';
import AutoImportJson from "./.eslintrc-auto-import.json" with { type: "json" };
import globals from 'globals';


export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs['flat/essential'],
	{
		name: 'app/files-to-lint',
		files: ['**/*.{ts,mts,tsx,vue}'],
	},
	{
		files: ['**/*.{js,ts,vue}'],
		ignores: [
			'.eslintrc.js',
			'stylelint.config.js',
			'vite.build.config.mts',
			'vite.config.mts',
			'*.bk.vue',
			'*.spec.ts',
			'src/**/*.spec.ts',
			'src/**/*.test.ts',
		],
		languageOptions: {
			...AutoImportJson,
			ecmaVersion: 'latest',
			globals: {
				...globals.node,
				...globals.browser,
			},
			sourceType: 'module',
			parserOptions: {
				parser: tseslint.parser,
				project: './tsconfig.json',
				extraFileExtensions: ['.vue'],
				sourceType: 'module',
			},
		},
		plugins: {
			pluginVue,
			'typescript-eslint': tseslint.plugin,
			prettier,
			import: importPlugin,
		},
		rules: {
			// ESLint core and TypeScript rules //
			...eslint.configs.recommended.rules,
			...typescript.configs.recommended.rules,
			...typescript.configs['recommended-type-checked'].rules,

			// Custom rules //
			'@typescript-eslint/ban-ts-comment': 0,
			'@typescript-eslint/no-empty-function': 0,
			'@typescript-eslint/no-empty-object-type': 0,
			'@typescript-eslint/no-explicit-any': 0,
			'@typescript-eslint/no-unsafe-assignment': 0,
			'@typescript-eslint/no-unsafe-member-access': 0,
			'arrow-spacing': ['error', { after: true, before: true }],
			'brace-style': ['error', 'stroustrup'],
			'comma-dangle': ['error', 'always-multiline'],
			'default-case': [
				'error', {
					commentPattern: '^skip\\sdefault',
				},
			],
			'func-names': ['error', 'never'],
			'function-paren-newline': 0,
			'implicit-arrow-linebreak': ['warn', 'beside'],
			"import/order": [
				"error",
				{
					"groups": [
						"builtin",
						"external",
						"type",
						"internal",
						"parent",
						"sibling",
						"index",
					],
					"pathGroups": [
						{
							"pattern": "@",
							"group": "internal"
						},
						{
							"pattern": "@Libraries/**",
							"group": "internal"
						},
						{
							"pattern": "@Layouts/**",
							"group": "internal"
						},
						{
							"pattern": "@Components/Layouts/**",
							"group": "internal",
							"position": "before"
						},
						{
							"pattern": "@Components/Elements/**",
							"group": "internal",
							"position": "before"
						},
						{
							"pattern": "@Components/Pages/**",
							"group": "internal",
							"position": "before"
						},
						{
							"pattern": "@Components/EasterEggs/**",
							"group": "internal",
							"position": "before"
						},
						{
							"pattern": "@Composables/**",
							"group": "internal",
							"position": "before"
						},
						{
							"pattern": "@Plugins/*",
							"group": "internal",
							"position": "before"
						},
						{
							"pattern": "@Stores/**",
							"group": "internal",
							"position": "before"
						},
						{
							"pattern": "@Types/**",
							"group": "type"
						},
					],
					"pathGroupsExcludedImportTypes":
						["internal"],
					"alphabetize": {
						"order": "asc",
						"caseInsensitive": true
					}
				}
			],
			'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
			'import/no-self-import': 0,
			'import/prefer-default-export': 0,
			indent: [2, 'tab', { SwitchCase: 1 }],
			'linebreak-style': 0,
			'max-len': 0,

			'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
			'no-debugger': 0,
			'no-else-return': ['error', { allowElseIf: true }],
			'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 0 }],
			'no-new': 0,
			'no-param-reassign': [
				'error', {
					ignorePropertyModificationsFor: ['field', 'model', 'el', 'item', 'state'],
					props: true,
				},
			],
			'no-plusplus': [
				'error', { allowForLoopAfterthoughts: true },
			],
			'no-tabs': [0, { allowIndentationTabs: true }],
			'no-undef': 'off',
			'no-underscore-dangle': [
				'error', {
					allow: ['_data', '__dirname', '__filename', '__name'],
					allowAfterThis: true,
				},
			],
			'no-unused-vars': 1,
			'no-useless-escape': 0,
			'object-curly-newline': ['error', {
				ObjectPattern: { multiline: false },
			}],
			'operator-linebreak': ['error', 'after'],
			'prefer-destructuring': [
				'error', {
					array: false,
					object: false,
				},
				{
					enforceForRenamedProperties: false,
				},
			],
			'quotes': ['error', 'single', { avoidEscape: true }],
			'semi': ['error', 'always'],
			'sort-imports': ['error', {
				'allowSeparatedGroups': true,
				'ignoreCase': false,
				'ignoreDeclarationSort': true,
				'ignoreMemberSort': false,
				'memberSyntaxSortOrder': [
					'none',
					'single',
					'all',
					'multiple',
				],
			}],
			'space-before-function-paren': ['error', {
				anonymous: 'never',
				asyncArrow: 'always',
				named: 'never',
			}],
			'vue/attributes-order': ['error', {
				'alphabetical': true,
				'order': [
					'DEFINITION',
					'LIST_RENDERING',
					'CONDITIONALS',
					'RENDER_MODIFIERS',
					'GLOBAL',
					['UNIQUE', 'SLOT'],
					'TWO_WAY_BINDING',
					'OTHER_DIRECTIVES',
					'OTHER_ATTR',
					'EVENTS',
					'CONTENT',
				],
			}],
			'vue/component-tags-order': ['error', {
				'order': ['template', 'script', 'style'],
			}],
			'vue/html-closing-bracket-newline': 0,
			'vue/html-comment-content-spacing': ['error',
				'always',
			],
			'vue/html-indent': 0,
			'vue/html-self-closing': 0,
			'vue/max-attributes-per-line': 0,
			'vue/multi-word-component-names': 0,
			'vue/no-multiple-template-root': 0,
			'vue/no-template-shadow': 0,
			'vue/no-v-for-template-key-on-child': 0,
			'vue/no-v-html': 0,
			'vue/no-v-text-v-html-on-component': 0,
			'vue/order-in-components': ['error', {
				'order': [
					'el',
					'name',
					'key',
					'parent',
					'functional',
					['delimiters', 'comments'],
					['components', 'directives', 'filters'],
					'extends',
					'mixins',
					['provide', 'inject'],
					'ROUTER_GUARDS',
					'layout',
					'middleware',
					'validate',
					'scrollToTop',
					'transition',
					'loading',
					'inheritAttrs',
					'model',
					['props', 'propsData'],
					'emits',
					'setup',
					'asyncData',
					'data',
					'fetch',
					'head',
					'computed',
					'watch',
					'watchQuery',
					'beforeCreate',
					'created',
					'beforeMount',
					'mounted',
					'beforeUpdate',
					'updated',
					'activated',
					'deactivated',
					'beforeUnmount', // for Vue.js 3.x
					'unmounted', // for Vue.js 3.x
					'beforeDestroy',
					'destroyed',
					'renderTracked', // for Vue.js 3.x
					'renderTriggered', // for Vue.js 3.x
					'errorCaptured', // for Vue.js 2.5.0+
					'methods',
					['template', 'render'],
					'renderError',
				],
			}],
			'vue/padding-line-between-blocks': 1,
			'vue/require-name-property': 1,
			'vue/singleline-html-element-content-newline': 0,
			'vue/sort-keys': ['warn', 'asc', {
				caseSensitive: true,
				ignoreChildrenOf: ['model', 'defineProps'],
				ignoreGrandchildrenOf: ['computed', 'directives', 'inject', 'props', 'watch', 'defineProps'],
				minKeys: 2,
				natural: true,
			}],
		},
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json',
				},
			},
		},
	}
);
