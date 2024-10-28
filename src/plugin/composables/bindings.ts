const excludedSettings: string[] = [
	'columns',
	'options',
	'required',
	'rules',
	'when',
];


export const useBindingSettings = (settings: object, exclude?: string[]): object => {
	let bindingSettings = settings;

	bindingSettings = Object.entries(bindingSettings).filter(([key]) => {
		return !excludedSettings.includes(key) && !exclude?.includes(key);
	});

	return Object.fromEntries(bindingSettings as object[][]);
};
