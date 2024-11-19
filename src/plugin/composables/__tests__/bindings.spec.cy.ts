import {
	useBindingSettings
} from '../bindings';


describe('Bindings Composable', () => {

	describe('useBindingSettings', () => {
		const settingsThatShouldBeExcluded = {
			columns: { sm: 6, md: 4, lg: 3, xl: 2 },
			options: [],
			required: true,
			rules: ['required'],
			when: () => { },
		};

		const settings = {
			...settingsThatShouldBeExcluded,
			class: 'foo',
			color: 'primary',
		};

		function checkExcludedSettings(result: any) {
			expect(result).to.not.have.property('columns');
			expect(result).to.not.have.property('options');
			expect(result).to.not.have.property('required');
			expect(result).to.not.have.property('rules');
			expect(result).to.not.have.property('when');
		}

		it('should exclude settings in excludedSettings array by default', () => {
			const result = useBindingSettings(settings);

			// Ensure the excluded settings are not present //
			checkExcludedSettings(result);

			// Ensure the allowed settings are present //
			expect(result).to.have.property('class', 'foo');
			expect(result).to.have.property('color', 'primary');
		});

		it('should exclude settings from the exclude parameter', () => {
			const exclude = ['color'];

			const result = useBindingSettings(settings, exclude);

			// Ensure the excluded settings are not present //
			checkExcludedSettings(result);

			// Ensure the allowed settings are present //
			expect(result).to.have.property('class', 'foo');

			// Ensure the additional excluded settings are not present //
			expect(result).to.not.have.property('color');
		});

		it('should not exclude any settings when exclude parameter is empty', () => {
			const exclude: string[] = ['class']; // No settings to exclude

			const result = useBindingSettings(settings, exclude);

			// Ensure the excluded settings are not present //
			checkExcludedSettings(result);

			// Ensure the allowed settings are present //
			expect(result).to.have.property('color', 'primary');

			// Ensure the additional excluded settings are not present //
			expect(result).to.not.have.property('class');
		});
	});
});
