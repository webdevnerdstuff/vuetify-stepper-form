const excludedSettings: string[] = [
	'columns',
	'options',
	'required',
	'rules',
	'when',
];


export const useBindingSettings = (
	settings: Partial<Settings>,
	exclude: string[] = [],
): Partial<Settings> => {
	const bindingSettings = Object.entries(settings).filter(([key]) => {
		return !excludedSettings.includes(key) && !exclude?.includes(key);
	});

	return Object.fromEntries(bindingSettings);
};
