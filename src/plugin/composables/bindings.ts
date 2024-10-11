const excludedSettings: string[] = [
];


export const useBindingSettings = (settings: object): object => {
	let bindingSettings = settings;

	bindingSettings = Object.entries(bindingSettings).filter(([key]) => {
		return !excludedSettings.includes(key);
	});

	return Object.fromEntries(bindingSettings as object[][]);
};
