<template>
	<VStepperForm
		v-model="answers"
		:pages="pages"
		:settings="formSettings.settings"
		:title="formSettings.title"
	>
		<!-- :fields="formSettings.fields" -->
		<!-- <template #[`custom.customBar`]="props">
						<v-text-field
							v-model="answers.customFoo"
							v-bind="(props.field as VTextField['$props'])"
						>
							<template #label>
								<component
									:is="props.FieldLabel"
									:label="props.field.label"
									:required="!!props.field.required"
								/>
							</template>
</v-text-field>
</template> -->

		<!-- <template #[`custom.customFoo`]="props">
						<v-text-field
							v-model="answers.customFoo"
							v-bind="(props.field as VTextField['$props'])"
						>
							<template #label>
								<component
									:is="props.FieldLabel"
									:label="props.field.label"
									:required="!!props.field.required"
								/>
							</template>
						</v-text-field>

						<v-btn variant="outlined">Click Me</v-btn>
					</template> -->

	</VStepperForm>

</template>

<script setup lang="ts">
// import type { VTextField } from 'vuetify/components';
// import { FieldLabel } from 'resources/js/Plugins/vuetify-stepper-form';
const answers = ref({
	autocomplete: null,
	// autocomplete: 'foo',
	checkboxMultiple: ['option1', 'option3'],
	// checkboxSingle: null,
	checkboxSingle: 'yes',
	color: '#ff0000',
	// combobox: null,
	// combobox: 'Foo',
	// combobox: 'foo',
	combobox: { title: 'Foo', value: 'foo' },
	customBar: 'customBar',
	customFoo: 'customFoo',
	desc: 'Hello World',
	email: 'test@test.com',
	fancyRadio: 'yes',
	file: null,
	name: 'Bunny',
	radio: 'option1',
	// radioMultiple: ['option1', 'option3'],
	// selectField: null,
	selectField: 'foo',
	switchQuestion: true,
	// switchQuestion: 'yes',
});

const pages = [
	{
		fields: [
			{
				label: 'Question 1',
				name: 'q1',
				required: true,
				type: 'text' as const,
				variant: 'outlined',
			},
			{
				label: 'Question 2',
				name: 'q2',
				required: true,
				type: 'text' as const,
				variant: 'outlined',
			},
		],
		title: 'Foo Section',
	},
	{
		fields: [
			{
				label: 'Question 3',
				name: 'q3',
				required: true,
				type: 'text' as const,
				variant: 'outlined',
			},
		],
		title: 'Bar Section',
	},
	{
		fields: [
			{
				label: 'Question 4',
				name: 'q4',
				required: true,
				type: 'text' as const,
				variant: 'outlined',
			},
		],
		title: 'Baz Section',
	},
];

const colorFieldProps = {
	// canvasHeight: 500, 							// *
	// cardFieldWidth: true,						// *
	// cardOffsetX: 200,								// *
	// cardOffsetY: 200,								// *
	// cardPadding: 200,								// *
	// cardProps: { elevation: 0 },			// *
	// colorPickerProps: {	},					// *
	// dotSize: 50,											// *
	// hideCanvas: true,								// *
	// hideInputs: true,								// *
	// hideSliders: true,								// *
	// iconHoverColor: 'secondary',			// *
	// iconSize: 50,										// *
	// mode: 'hsla',										// *
	// modes: ['hsl', 'hsla'],					// *
	// open: 'top right', 							// *
	// pip: true,												// *
	// pipBorder: '5px solid #0f0',			// *
	// pipBorderRadius: '3px',					// *
	// pipIcon: 'mdi:mdi-cog',					// *
	// pipSlot: 'append-inner',					// *
	// readonlyInput: true,							// *
	// showSwatches: true,							// *
	// swatches: [['#FF0000']],					// *
	// swatchesMaxHeight: 20,						// *
};

const formSettings = ref({
	fields: [
		// & ------------------------- Combobox //
		// ! Needs more testing
		{
			// active: true,																// ? Broken & Not needed
			// appendIcon: 'mdi:mdi-cog', 									// *
			// appendInnerIcon: 'mdi:mdi-cog',							// *
			// autoSelectFirst: true,												// ?
			// baseColor: 'warning',												// *
			// bgColor: 'secondary',												// *
			chips: true,																	// *
			// clearIcon: 'mdi:mdi-close-box',							// *
			// clearOnSelect: true,													// *
			clearable: true,															// *
			// closableChips: true,													// *
			// closeText: 'Foobar', 												// ?
			color: 'primary',														// *
			// centerAffix: true,														// ? Broken? & Not needed
			// counter: true,																// *
			// counterValue: 100, 													// *
			// customFilter: () => {},											// ? Not tested
			// density: 'compact' as const,									// *
			// direction: 'vertical',												// *
			// dirty: true,																	// ? Not applicable
			// disabled: true, 															// *
			// eager: true,																	// ?
			// error: true,																	// *
			// errorMessages: ['Error 1', 'Error 2'],				// *
			// filterKeys: ['value'],												// *
			// filterMode: 'every' as const,								// ? Not tested
			// flat: true,																	// *
			// focused: true,																// ?
			// hideDetails: true,														// *
			// hideNoData: true, 														// ? Not working?
			// hideSpinButtons: true,												// ? Not applicable
			// hint: 'This is your combo', 									// *
			// id: 'some-id',																// *
			// itemColor: 'success',												// *
			// itemProps: () => ({ 'data-foo': 'foo' }),		// *
			// itemTitle: 'title',													// *
			// itemValue: 'value',													// *
			// items: ['Foo', 'Bar', 'Maybe', 'Sure'],				// *
			items: [
				{
					title: 'Foo',
					value: 'foo',
				},
				{
					title: 'Bar',
					// label: 'foo <br /> bar',
					value: 'bar',
				},
				{
					title: 'Maybe',
					value: 'maybe',
				},
				{
					title: 'Sure',
					value: 'sure',
				},
			],
			label: 'Combobox Question', 								// *
			// listProps: () => ({}),												// ! Not applicable
			// loading: true,																// *
			// maxErrors: 2,																// *
			// maxWidth: '50px',														// *
			// menu: true,																	// *
			// menuProps: () => ({}),												// ! Not applicable
			// menuIcon: 'mdi:mdi-cog',											//
			// messages: ['Msg 1', 'Msg 2'],								// *
			// messages: 'Msg',															// *
			// minWidth: '600px',														// *
			multiple: true,															// *
			name: 'combobox',															// *
			// noDataText: 'no data stuff',									// ! Not working?
			// noFilter: true,															// *
			// openOnClear: true,														// *
			// openText: 'Open Me',													// ?
			// persistentClear: true,												// *
			// persistentCounter: true,											// *
			// persistentHint: true, 												// *
			// persistentPlaceholder: true,									// *
			// placeholder: 'Select Stuff',									// *
			// prefix: 'Animal:',														// *
			// prependIcon: 'mdi:mdi-cog',									// *
			// prependInnerIcon: 'mdi:mdi-cog',							// *
			// readonly: true,															// *
			required: true,
			// returnObject: false,													// *
			// reverse: true,																// *
			// rounded: 'pill', 														// *
			// role: 'combobox',														// ? Not working? Not applicable
			// singleLine: true,														// *
			// suffix: 'Rabbit', 														// *
			// theme: 'light', 															// *
			// tile: true,																	// *
			// transition: 'fab-transition',								// *
			// type: 'combobox' as const,										// *
			// validateOn: 'blur', 													// ! Need to build this out
			// valueComparator: (a, b) => (a === b),				// ? Not sure what this does. Not applicable
			variant: 'outlined',													// *
			// width: '200px',															// *
		},
		// & -------------------------------------------------- Checkbox Multiple //
		{
			// appendIcon: 'mdi:mdi-cog', 						// *
			// baseColor: 'warning',									// *
			// centerAffix: true,											// ! Broken? & Not needed
			// color: 'secondary', 										// *
			// defaultsTarget: '', 										// ? Not sure what this does
			density: 'compact' as const,
			// direction: 'vertical', 								// *
			// disabled: true, 												// *
			// error: true,														// *
			// errorMessages: ['Error 1', 'Error 2'],	// *
			// falseIcon: 'mdi:mdi-minus', 						// *
			// falseValue: 'no',											// ? Not used for this example
			// focused: true,													// *
			// hideDetails: true,											// *
			// hideSpinButtons: true,									// ? Not applicable
			// hint: 'Some Hint',											// *
			// id: 'some-id',													// ! Puts the id on every input
			// indeterminate: true,										// *
			// indeterminateIcon: 'mdi:mdi-help-box',	// *
			// inline: true,													// *
			// inlineSpacing: '40px',
			label: 'Multiple Checkbox Question',		// *
			// labelPositionLeft: true,								// *
			// maxErrors: 2,													// *
			// maxWidth: '50px',											// *
			// messages: ['Msg 1', 'Msg 2'],					// *
			// messages: 'Msg',												// *
			// minWidth: '600px',											// * Needs to have width prop set
			multiple: true, 												// *
			name: 'checkboxMultiple',							// *
			options: [
				{
					label: 'Option 1',
					value: 'option1',
				},
				{
					label: 'Option 2',
					value: 'option2',
				},
				{
					label: 'Option 3',
					value: 'option3',
				},
			],
			// persistentHint: true, 									// *
			// prependIcon: 'mdi:mdi-cog',						// *
			// readonly: true, 												// *
			required: true,												// ^ TBD
			// ripple: true, 													// *
			// theme: 'light', 												// *
			// trueIcon: 'mdi:mdi-plus',							// *
			// trueValue: 'yes',											// ? Do not use for this example
			// type: 'checkbox' as const,							// *
			// value: 'stuff', 												// ? Not sure what this does exactly
			// valueComparator: () => {},							// ? Not sure what this does exactly
			// width: '500px', 												// *
		},
		// & -------------------------------------------------- Checkbox Single //
		{
			// appendIcon: 'mdi:mdi-cog', 						// *
			// baseColor: 'warning',									// *
			// centerAffix: true,											// ! Broken? & Not needed
			// color: 'secondary', 										// *
			// defaultsTarget: '', 										// ? Not sure what this does
			// density: 'compact' as const,						// *
			// direction: 'vertical', 								// *
			// disabled: true, 												// *
			// error: true,														// *
			// errorMessages: ['Error 1', 'Error 2'],	// *
			// falseIcon: 'mdi:mdi-minus', 						// *
			// falseValue: 'no',											// *
			// focused: true,													// *
			// hideDetails: true,											// *
			// hideSpinButtons: true,									// ? Not applicable
			// hint: 'Some Hint',											// *
			// id: 'some-id',													// *
			// indeterminate: true,										// *
			// indeterminateIcon: 'mdi:mdi-help-box',	// *
			label: 'Checkbox Question',						// *
			// maxErrors: 2,													// *
			// maxWidth: '50px',											// *
			// messages: ['Msg 1', 'Msg 2'],					// *
			// messages: 'Msg',												// *
			// minWidth: '600px',											// * Needs to have width prop set
			// multiple: true, 												// ? Not using for this example
			name: 'checkboxSingle',								// *
			// persistentHint: true, 									// *
			// prependIcon: 'mdi:mdi-cog',						// *
			// readonly: true, 												// *
			required: true,												// ^ TBD
			// ripple: true, 													// *
			// theme: 'light', 												// *
			// trueIcon: 'mdi:mdi-plus',							// *
			// trueValue: 'yes',											// *
			// type: 'checkbox' as const,							// *
			// value: 'stuff', 												// ? Not sure what this does exactly
			// valueComparator: () => {},							// ? Not sure what this does exactly
			// width: '500px', 												// *
		},
		// & -------------------------------------------------- Text Field //
		{
			// active: true,																// *
			// baseColor: 'warning',												// *
			// bgColor: 'secondary',												// *
			// color: 'success', 														// *
			// appendIcon: 'mdi:mdi-cog', 									// *
			// appendInnerIcon: 'mdi:mdi-cog',							// *
			// centerAffix: true,														// ! Broken? & Not needed
			// clearIcon: 'mdi:mdi-close-box',							// *
			// clearable: true,															// *
			// counter: true,																// *
			// counterValue: 100, 													// *
			// density: 'compact' as const, 								// *
			// error: true,																	// *
			// errorMessages: ['Error 1', 'Error 2'],				// *
			// dirty: true,																	// ?
			// direction: 'horizontal',											// *
			// disabled: true, 															// *
			// flat: true,																	// *
			// focused: true,																// *
			// hideDetails: true,														// *
			// hideSpinButtons: true,												// *
			// hint: 'This is your name', 									// *
			// id: 'some-id',																// *
			label: 'Name',																// *
			// maxErrors: 2,																// *
			// maxWidth: '50px',														// *
			// minWidth: '600px',														// *
			// loading: true,																// *
			// messages: ['Msg 1', 'Msg 2'],								// *
			// messages: 'Msg',															// *
			name: 'name', 																// *
			// persistentClear: true,												// *
			// persistentHint: true, 												// *
			// persistentPlaceholder: true,									// *
			// placeholder: 'Enter your name',							// *
			// prefix: 'Animal:',														// *
			// prependIcon: 'mdi:mdi-cog',									// *
			// prependInnerIcon: 'mdi:mdi-cog',							// *
			// readonly: true,															// *
			required: true,															// ^ TBD
			// rounded: 'pill', 														// *
			// reverse: true,																// *
			// singleLine: true,														// *
			// suffix: 'Rabbit', 														// *
			// theme: 'light', 															// *
			// tile: true,																	// *
			// type: 'text' as const,												// *
			// validate: (field: any, value: string) => {
			// 	// console.group('validate');
			// 	// console.log('field', field);
			// 	// console.log('value', value);
			// 	// console.groupEnd();

			// 	return value === 'Bunny';
			// },
			// validateOn: 'input',													// ! Need to build this out
			variant: 'outlined',															// *
			// width: '300px',															// *
		},
		// & ------------------------- Color Picker Field //
		{
			...colorFieldProps,
			// active: true,																// ! Not working?
			// baseColor: 'warning',												// *
			// bgColor: 'secondary',												// *
			// color: 'success', 														// *
			// appendIcon: 'mdi:mdi-cog', 									// *
			// appendInnerIcon: 'mdi:mdi-cog',							// *
			// clearIcon: 'mdi:mdi-close-box',							// *
			// clearable: true,															// *
			// counter: true,																// *
			// counterValue: 100, 													// *
			// density: 'compact' as const, 								// *
			// error: true,																	// *
			// errorMessages: ['Error 1', 'Error 2'],				// *
			// dirty: true,																	//
			// direction: 'horizontal',											// ? Not added prop
			// disabled: true, 															// *
			// flat: true,																	// *
			// focused: true,																// *
			// hideDetails: true,														// *
			// hint: 'This is your color', 									// *
			// id: 'some-id',																// *
			label: 'Color',																// *
			// maxErrors: 2,																// *
			// maxWidth: '50px',														// *
			// minWidth: '600px',														// *
			// loading: true,																// *
			// messages: ['Msg 1', 'Msg 2'],								// *
			// messages: 'Msg',															// *
			name: 'color', 																// *
			// persistentClear: true,												// *
			// persistentHint: true, 												// *
			// persistentPlaceholder: true,									// *
			// placeholder: 'Enter your color',							// *
			// prefix: 'Animal:',														// *
			// prependIcon: 'mdi:mdi-cog',									// *
			// prependInnerIcon: 'mdi:mdi-cog',							// *
			// readonly: true,															// *
			required: true,															// ^ TBD
			// rounded: 'pill', 														// *
			// reverse: true,																// *
			// singleLine: true,														//
			// suffix: 'Rabbit', 														// *
			// theme: 'light', 															// *
			// tile: true,																	// *
			// type: 'color' as const,												// *
			// validateOn: 'input',													// ! Need to build this out
			variant: 'outlined',													// *
			// width: '200px',															// *
		},
		// & ------------------------- File Input //
		{
			// active: true,													// *
			// accept: 'image/png', 									// *
			// appendIcon: 'mdi:mdi-paperclip', 			// *
			// appendInnerIcon: 'mdi:mdi-paperclip',	// *
			// baseColor: 'warning',									// *
			// bgColor: 'secondary',									// *
			// centerAffix: true,											// ! Broken? & Not needed
			// chips: true,														// *
			// clearIcon: 'mdi:mdi-close-box',				// *
			// clearable: true,												// *
			// color: 'success', 											// *
			// counter: true,													// ?
			// counterSizeString: '$vuetify.fileInput.counterSize', // ?
			// counterString: '$vuetify.fileInput.counter', 				// ?
			// counterValue: 100, 										// ?
			// density: 'compact' as const, 					// *
			// direction: 'horizontal',								// ?
			// dirty: true,														// ?
			// disabled: true, 												// *
			// error: true,														// *
			// errorMessages: ['Error 1', 'Error 2'],	// *
			// flat: true,														// *
			// focused: true,													// *
			// hideInput: true, 											// ?
			// hideDetails: true,											// *
			// hideSpinButtons: true,									// ! Not applicable
			// hint: 'This is your file', 						// *
			// id: 'some-id',													// *
			label: 'File',													// *
			// loading: true,													// *
			// maxErrors: 1,													// *
			// maxWidth: '50px',											// *
			// minWidth: '600px',											// *
			// messages: ['Msg 1', 'Msg 2'],					// *
			// messages: 'Msg',												// *
			// multiple: true,												// *
			name: 'file', 													// *
			// persistentClear: true,									// * only when a file is selected
			// persistentHint: true, 									// *
			// persistentPlaceholder: true,						// ? not a prop
			// placeholder: 'Enter your name',				// ?  not a prop
			// prefix: 'Animal:',											// *
			// prependIcon: 'mdi:mdi-paperclip',			// *
			// prependInnerIcon: 'mdi:mdi-paperclip',	// *
			// readonly: true,												// *
			required: true,												// ^ TBD
			// reverse: true, 												// *
			// rounded: 'pill', 											// *
			// showSize: true, 												// *
			// singleLine: true,											// *
			// suffix: 'Rabbit', 											// *
			// theme: 'light', 												// *
			// tile: true,														// *
			// type: 'file' as const,									// *
			// variant: 'solo',												// *
			// width: '500px',												// *
		},
		// & -------------------------------------------------- Textarea //
		{
			// active: true,													// *
			// autoGrow: true,												// *
			// baseColor: 'warning',									// *
			// bgColor: 'secondary',									// *
			// color: 'success', 											// *
			// appendIcon: 'mdi:mdi-cog', 						// *
			// appendInnerIcon: 'mdi:mdi-cog',				// *
			// centerAffix: true,											// ! Broken? & Not needed
			// clearIcon: 'mdi:mdi-close-box',				// *
			// clearable: true,												// *
			// counter: true,													// *
			// counterValue: 100, 										// ! Broken? & Not needed
			// density: 'compact' as const, 					// *
			// error: true,														// *
			// errorMessages: ['Error 1', 'Error 2'],	// *
			// dirty: true,														// ?
			// direction: 'vertical',									// *
			// disabled: true, 												// *
			// flat: true,														// *
			// focused: true,													// *
			// hideDetails: true,											// *
			// hideSpinButtons: true,									// ? Not applicable
			// hint: 'This is stuff', 								// *
			// id: 'some-id',													// *
			label: 'Description',									// *
			// loading: true,													// *
			// maxErrors: 1,													// *
			// maxWidth: '500px',											// *
			// messages: ['Msg 1', 'Msg 2'],					// *
			// messages: 'Msg',												// *
			name: 'desc', 													// *
			// noResize: true,												// *
			// persistentClear: true,									// *
			// persistentCounter: true,								// *
			// persistentHint: true, 									// *
			// persistentPlaceholder: true,						// *
			// placeholder: 'Enter stuff',						// *
			// prefix: 'Animal:',											// *
			// prependIcon: 'mdi:mdi-cog',						// *
			// prependInnerIcon: 'mdi:mdi-cog',				// *
			// readonly: true,												// *
			required: true,												// ^ TBD
			// rounded: 'pill', 											// *
			// reverse: true,													// *
			// singleLine: true,											// *
			// suffix: 'Rabbit', 											// *
			// theme: 'light', 												// *
			// tile: true,														// *
			// type: 'textarea' as const,							// *
			// variant: 'solo',												// *
			// width: '500px',												// *
		},
		// & -------------------------------------------------- Radio //
		{
			// appendIcon: 'mdi:mdi-cog', 						// * Radio group prop
			// baseColor: 'warning',									// *
			// centerAffix: true,											// ! Broken? & Not needed
			// color: 'secondary', 										// *
			// defaultsTarget: '', 										// ? Not sure what this does
			density: 'compact' as const,							// *
			// direction: 'vertical', 								// ! Broken? & Not needed. Radio group prop
			// disabled: true, 												// *
			// error: true,														// *
			// errorMessages: ['Error 1', 'Error 2'],	// * Radio group prop
			// falseIcon: 'mdi:mdi-minus', 						// *
			// falseValue: 'no',											// ? Not used for this example
			// height: '50px',												// ! Broken? & Not needed. Radio group prop
			// id: 'some-id',													// ! Puts the id on every input
			// hideDetails: true,											// * Radio group prop
			// hint: 'Radio stuff', 									// ! Not working and part of radio group props
			// inline: true,													// *
			// inlineSpacing: '40px',									// *
			label: 'Radio Question',								// *
			// labelPositionLeft: true,								// *
			// maxErrors: 2,													// *
			// maxWidth: '50px',											// * Radio group prop
			// messages: ['Msg 1', 'Msg 2'],					// * Radio group prop
			// messages: 'Msg',												// * Radio group prop
			// minWidth: '600px',											// * Radio group prop. Needs to have width prop set
			// multiple: true, 												// ?
			name: 'radio',													// *
			options: [
				{
					label: 'Option 1',
					value: 'option1',
				},
				{
					label: 'Option 2',
					value: 'option2',
				},
				{
					label: 'Option 3',
					value: 'option3',
				},
			],
			// persistentHint: true, 									// ! Not working and part of radio group props
			// prependIcon: 'mdi:mdi-cog',						// *
			// readonly: true, 												// *
			required: true,												// ^ TBD
			// ripple: false, 												// *
			// theme: 'light', 												// * Radio group prop
			// trueIcon: 'mdi:mdi-plus',							// *
			// trueValue: 'yes',											// ? Do not used for this example
			// type: 'radio' as const,								// *
			// value: 'stuff', 												// ? Not sure what this does exactly
			// valueComparator: () => {},							// ? Not sure what this does exactly
			// width: '500px', 												// ! Radio group prop, do not use with labelPositionLeft
		},
		// & ------------------------- Fancy Radio //
		{
			color: 'primary',
			density: 'comfortable' as const,
			falseValue: 'no',
			// height: '100px',
			label: 'Fancy Radio Question',
			name: 'fancyRadio',
			options: [
				{
					label: 'Yes',
					value: 'yes',
				},
				{
					label: 'No',
					// label: 'foo <br /> bar',
					value: 'no',
				},
				// {
				// 	label: 'Maybe',
				// 	value: 'maybe',
				// },
				// {
				// 	label: 'Sure',
				// 	value: 'sure',
				// },
			],
			required: true,
			trueValue: 'yes',
			// type: 'fancyRadio' as const,
			variant: 'outlined',
			// width: '200px',
		},
		// & -------------------------------------------------- Select //
		{
			// active: true,																//
			// appendIcon: 'mdi:mdi-cog', 									// *
			// appendInnerIcon: 'mdi:mdi-cog',							// * Not listed
			// baseColor: 'warning',												// *
			// bgColor: 'secondary',												// *
			// chips: true,																	// *
			// clearIcon: 'mdi:mdi-close-box',							// *
			clearable: true,															// *
			// closableChips: true,													// *
			// closeText: 'Foobar', 												// ? Might be for autocomplete or combobox
			color: 'primary',														// *
			// centerAffix: true,														// ? Broken? & Not needed
			// counter: true,																// *
			// counterValue: 100, 													// *
			// density: 'compact' as const,									// *
			// direction: 'horizontal',											// *
			// direction: 'vertical',												// *
			// dirty: true,																	//
			// disabled: true, 															// *
			// eager: true,																	// ?
			// error: true,																	// *
			// errorMessages: ['Error 1', 'Error 2'],				// *
			// flat: true,																	// *
			// focused: true,																// ?
			// hideDetails: true,														// *
			// hideNoData: true, 														// *
			// hideSpinButtons: true,												// ? Not applicable
			// hint: 'This is your name', 									// *
			// id: 'some-id',																// *
			// itemColor: 'success',												// *
			itemProps: () => ({
				'data-foo': 'hello world',
			}),
			// itemTitle: 'bar',														// *
			// itemValue: 'foo',														// *
			items: [
				{
					title: 'Foo',
					value: 'foo',
				},
				{
					title: 'Bar',
					// label: 'foo <br /> bar',
					value: 'bar',
				},
				{
					title: 'Maybe',
					value: 'maybe',
				},
				{
					title: 'Sure',
					value: 'sure',
				},
			],
			label: 'Select Question', 								// *
			// listProps: () => ({}),												// ! Not applicable
			// loading: true,																// *
			// maxErrors: 2,																// *
			// maxWidth: '50px',														// *
			// menu: true,																	// *
			// menuProps: () => ({}),												// ! Not applicable
			// menuIcon: 'mdi:mdi-cog',											// *
			// messages: ['Msg 1', 'Msg 2'],								// *
			// messages: 'Msg',															// *
			// minWidth: '600px',														// *
			// multiple: true,															// *
			name: 'selectField',
			// noDataText: 'no data stuff',									// *
			// openOnClear: true,														// *
			// openText: 'Open Me',													// *
			// persistentClear: true,												// *
			// persistentCounter: true,											// *
			// persistentHint: true, 												// *
			// persistentPlaceholder: true,									// *
			// placeholder: 'Select Stuff',									// *
			// prefix: 'Animal:',														// *
			// prependIcon: 'mdi:mdi-cog',									// *
			// prependInnerIcon: 'mdi:mdi-cog',							// *
			// readonly: true,															// *
			required: true,
			// returnObject: true,													// *
			// reverse: true,																// *
			// rounded: 'pill', 														// *
			// role: 'combobox',														// ? Not working? Not applicable
			// singleLine: true,														// *
			// suffix: 'Rabbit', 														// *
			// theme: 'light', 															// *
			// tile: true,																	// *
			// transition: 'fab-transition',								// *
			// type: 'select' as const,
			// validateOn: 'blur', 													// ! Need to build this out
			// valueComparator: (a, b) => (a === b),				// ? Not sure what this does. Not applicable
			variant: 'outlined',													// *
			// width: '200px',															// *
		},
		// & ------------------------- Autocomplete //
		{
			// active: true,																//
			// appendIcon: 'mdi:mdi-cog', 									// *
			// appendInnerIcon: 'mdi:mdi-cog',							// * Not listed
			// autoSelectFirst: true,												// ?
			// baseColor: 'warning',												// *
			// bgColor: 'secondary',												// *
			// chips: true,																	// *
			// clearIcon: 'mdi:mdi-close-box',							// *
			// clearOnSelect: true,													// *
			clearable: true,															// *
			// closableChips: true,													// *
			// closeText: 'Foobar', 												// ?
			color: 'primary',														// *
			// centerAffix: true,														// ? Broken? & Not needed
			// counter: true,																// *
			// counterValue: 100, 													// *
			// customFilter: () => {},											// ? Not tested
			// density: 'compact' as const,									// *
			// direction: 'vertical',												// *
			// dirty: true,																	//
			// disabled: true, 															// *
			// eager: true,																	// ?
			// error: true,																	// *
			// errorMessages: ['Error 1', 'Error 2'],				// *
			// filterKeys: ['value	'],											// *
			// filterMode: 'every' as const,								// ? Not tested
			// flat: true,																	// *
			// focused: true,																// ?
			// hideDetails: true,														// *
			// hideNoData: true, 														// *
			// hideSpinButtons: true,												// ? Not applicable
			// hint: 'This is your auto', 									// *
			// id: 'some-id',																// *
			// itemColor: 'success',												// *
			// itemProps: () => ({ 'data-foo': 'foo' }),		// *
			// itemTitle: 'bar',														// *
			// itemValue: 'foo',														// *
			items: [
				{
					title: 'Foo',
					value: 'foo',
				},
				{
					title: 'Bar',
					// label: 'foo <br /> bar',
					value: 'bar',
				},
				{
					title: 'Maybe',
					value: 'maybe',
				},
				{
					title: 'Sure',
					value: 'sure',
				},
			],
			label: 'Autocomplete Question', 								// *
			// listProps: () => ({}),												// ! Not applicable
			// loading: true,																// *
			// maxErrors: 2,																// *
			// maxWidth: '50px',														// *
			// menu: true,																	// *
			// menuProps: () => ({}),												// ! Not applicable
			// menuIcon: 'mdi:mdi-cog',											// *
			// messages: ['Msg 1', 'Msg 2'],								// *
			// messages: 'Msg',															// *
			// minWidth: '600px',														// *
			// multiple: true,															// *
			name: 'autocomplete',
			// noDataText: 'no data stuff',									// *
			// noFilter: true,															// *
			// openOnClear: true,														// *
			// openText: 'Open Me',													// ?
			// persistentClear: true,												// *
			// persistentCounter: true,											// *
			// persistentHint: true, 												// *
			// persistentPlaceholder: true,									// *
			// placeholder: 'Select Stuff',									// *
			// prefix: 'Animal:',														// *
			// prependIcon: 'mdi:mdi-cog',									// *
			// prependInnerIcon: 'mdi:mdi-cog',							// *
			// readonly: true,															// *
			required: true,
			// returnObject: true,													// *
			// reverse: true,																// *
			// rounded: 'pill', 														// *
			// role: 'combobox',														// ? Not working? Not applicable
			// singleLine: true,														// *
			// suffix: 'Rabbit', 														// *
			// theme: 'light', 															// *
			// tile: true,																	// *
			// transition: 'fab-transition',								// *
			// type: 'autocomplete' as const,
			// validateOn: 'blur', 													// ! Need to build this out
			// valueComparator: (a, b) => (a === b),				// ? Not sure what this does. Not applicable
			variant: 'outlined',													// *
			// width: '200px',															// *
		},
		// & -------------------------------------------------- Switch //
		{
			// appendIcon: 'mdi:mdi-cog', 						// *
			// baseColor: 'warning',									// *
			// centerAffix: true,											// ! Broken? & Not needed
			// color: 'secondary', 										// *
			// defaultsTarget: '', 										// ? Not sure what this does
			density: 'compact' as const,						// *
			// direction: 'vertical', 								// *
			// disabled: true, 												// *
			// error: true,														// *
			// errorMessages: ['Error 1', 'Error 2'],	// *
			// falseIcon: 'mdi:mdi-minus', 						// *
			// falseValue: 'no',											// *
			// flat: true,														// *
			// focused: true,													// ? Not applicable
			// hideDetails: true,											// *
			// hideSpinButtons: true,									// ? Not applicable
			// hint: 'Some Hint',											// *
			// id: 'some-id',													// *
			// indeterminate: '',
			// inline: true, 													// ? Not sure
			// inset: true,														// *
			label: 'Switch Question',							// *
			// loading: true,													// *
			// maxErrors: 2,													// *
			// maxWidth: '50px',											// *
			// messages: ['Msg 1', 'Msg 2'],					// *
			// messages: 'Msg',												// *
			// minWidth: '600px',											// ? Not sure if works
			// multiple: true, 												// * Works but not sure why you would use it, results in an array answer
			name: 'switchQuestion',								// *
			// persistentHint: true, 									// *
			// prependIcon: 'mdi:mdi-cog',						// *
			// readonly: true, 												// *
			required: true,												// ^ TBD
			ripple: false, 														// *
			// theme: 'light', 												// *
			// trueIcon: 'mdi:mdi-plus',							// *
			// trueValue: 'yes',											// *
			// type: 'switch' as const,								// *
			// value: 'stuff', 												// ? Not sure what this does exactly
			// valueComparator: () => {},							// ? Not sure what this does exactly
			// width: '500px', 												// *
		},
		// & -------------------------------------------------- Custom / Slots //
		// {
		// 	label: 'Custom Question Slot Bar',
		// 	name: 'customBar',
		// 	type: 'custom' as const,
		// 	variant: 'outlined' as const,
		// },
		// {
		// 	color: 'primary',
		// 	label: 'Custom Question Slot Foo',
		// 	name: 'customFoo',
		// 	required: true,
		// 	type: 'custom' as const,
		// 	variant: 'outlined' as const,
		// },
		// & ------------------------- Email //
		{
			hint: 'Enter your email',
			label: 'E-mail',
			name: 'email',
			required: true,
			type: 'email' as const,
		},
		// & ------------------------- Password //
		{
			label: 'Password',
			name: 'password',
			required: true,
			type: 'password' as const,
		},
		// & ------------------------- Phone //
		{
			label: 'Phone',
			name: 'tel',
			required: true,
			type: 'tel' as const,
		},
		// & ------------------------- URL //
		{
			label: 'URL',
			name: 'url',
			required: true,
			type: 'url' as const,
		},
		// & ------------------------- Image ? //
		// {
		// 	label: 'Image',
		// 	name: 'image',
		// 	required: true,
		// 	type: 'image' as const,
		// },
		// & ------------------------- Submit //
		{
			label: 'Submit',
			name: 'submit',
			required: true,
			type: 'submit' as const,
		},
		// & ------------------------- Conditional "when" testing
		// {
		// 	label: 'Foo',
		// 	name: 'foo',
		// 	// type: 'text' as const,
		// 	when: (answers: any) => {
		// 		return answers?.boolean === 'yes';
		// 	},
		// },
	],
	settings: {
		// density: 'compact',
	} as const,
	title: 'Hello World Form',
});


</script>

<style lang="scss" scoped></style>
