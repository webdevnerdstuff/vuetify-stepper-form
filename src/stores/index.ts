import { defineStore } from 'pinia';
import packageJson from '../../package.json';


export const useCoreStore = defineStore('core', () => {
	const scopedPackageName = packageJson.name;
	const packageName = scopedPackageName.split('/')[1] || scopedPackageName;

	// Links //
	const repoBaseUrl = `https://github.com/webdevnerdstuff/${packageName}`;
	const links = {
		changeLog: `${repoBaseUrl}/blob/main/CHANGELOG.md`,
		github: repoBaseUrl,
		githubProfile: 'https://github.com/webdevnerdstuff',
		license: `${repoBaseUrl}/blob/main/LICENSE.md`,
		npm: `https://www.npmjs.com/package/${scopedPackageName}`,
		pnpm: 'https://pnpm.io/',
		vColorField: 'https://webdevnerdstuff.github.io/vuetify-color-field/',
		veeValidate: 'https://vee-validate.logaretm.com/v4/',
		vue: 'https://vuejs.org/',
		vueUse: 'https://vueuse.org/',
		vuetify: 'https://vuetifyjs.com/',
		vuetifyGithub: 'https://github.com/vuetifyjs/vuetify',
		yup: 'https://github.com/jquense/yup',
		yupWhen: 'https://github.com/jquense/yup?tab=readme-ov-file#schemawhenkeys-string--string-builder-object--values-any-schema--schema-schema',
		zod: 'https://zod.dev/',
	};

	const actions = {
		setLocalStorage(val: string): string {
			const oldValue = localStorage.getItem(packageName);
			const newValue = val ?? oldValue;

			localStorage.setItem(packageName, newValue);
			return newValue;
		},
		setTheme(val: string): string {
			const themeName = val === 'dark' ? 'light' : 'dark';
			const currentTheme = localStorage.getItem(`${packageName}-theme`);
			const newTheme = themeName ?? currentTheme;

			localStorage.setItem(`${packageName}-theme`, newTheme);
			return newTheme;
		},
	};

	const getters = {
		getLocalStorage: () => (): unknown => {
			const value = localStorage.getItem(packageName);
			return value;
		},
		getTheme: () => {
			const value = localStorage.getItem(`${packageName}-theme`);
			return value;
		},
	};

	return {
		...actions,
		...getters,
		links,
		package: packageJson,
		packageName,
		pluginVersion: packageJson.version,
	};
});
