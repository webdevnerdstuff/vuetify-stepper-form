import { AllProps } from '../../../../utils/props';
import VSFButtonField from '../VSFButtonField.vue';

const field = {
	// active: false, // ? Not supported
	// activeColor: 'primary-darken-1', // **
	align: 'center', // **
	// appendIcon: '$vuetify', // **
	// baseColor: 'secondary', // **
	// block: true, // * Make adjustments
	// border: 'xl', // ?
	color: 'primary', // **
	// density: 'expanded' as const, // **
	// disabled: true, // **
	// elevation: 10, // **
	// error: true, // ? Not really a button prop
	// errorMessage: ['Error 1', 'Error 2'], // * Works via the Field validation
	// exact: true,
	// flat: true,
	// gap: '2', // **
	// height: '400px', // **
	// hideDetails: true, // **
	// hint: 'yo', // *
	// href: 'https://google.com', // ** Not allowed
	// icon: '$vuetify', // **
	// id: 'buttonField-id', // **
	label: 'Button Field Question',
	// loading: true, // **
	maxErrors: 1,
	// maxHeight: '100px', // *
	// maxWidth: '100px', // **
	// messages: 'Msg', // *
	// messages: ['Msg 1', 'Msg 2'], // *
	// minHeight: '800px', //*
	// minWidth: '300px', // * Set default min width to 100px
	// multiple: true, // **
	name: 'buttonField', // **
	options: [
		{
			// class: 'text-h5',
			// icon: 'mdi:mdi-cog', // *
			// id: 'yes-id', // *
			label: 'Yes',
			// prependIcon: 'mdi:mdi-cog',
			value: 'yes',
			variant: 'filled',
		},
		{
			// appendIcon: 'mdi:mdi-circle',
			// icon: 'mdi:mdi-circle', // *
			// id: 'no-id', // *
			// label: 'foo <br /> bar',
			label: 'No',
			// prependIcon: 'mdi:mdi-circle',
			value: 'no',
		},
		{
			// icon: 'mdi:mdi-square', // *
			label: 'Maybe',
			value: 'maybe',
		},
		{
			// icon: 'mdi:mdi-triangle', // *
			label: 'Sure',
			value: 'sure',
		},
	],
	// persistentHint: true, // *
	// position: 'fixed',
	// prependIcon: '$vuetify', // **
	// readonly: true, // **
	// replace: true,
	required: true,
	// ripple: false, // **
	// rounded: true, // **
	// selectedClass: 'selected-foo', // **
	// size: 'large',
	// slim: false,
	// stacked: true, // **
	// symbol: true,
	// tag: 'a', // *
	// text: 'foo',
	// theme: 'light', // **
	// tile: true, // **
	// to: 'https://google.com', // ** Not allowed
	type: 'buttons' as const,
	// value: 'yes',
	// validateOn: 'change',
	// variant: 'outlined', // **
	// width: '500px', // **
};


describe('<VSFButtonField />', () => {
	it('mounts', () => {
		cy.mount(VSFButtonField, {
			props: {
				field,
			},
			global: {
				provide: {
					settings: AllProps,
				},
			},
		});
	});
});
