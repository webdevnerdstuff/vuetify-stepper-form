<template>
	<AuthLayout>
		<VStepperForm
			v-model="formAnswers[String(answerAndPagesKey)]"
			v-bind="formSettings"
			@submit="submitForm"
		>
			<template
				v-if="answerAndPagesKey === 'allFields'"
				#[`custom.customBar`]="{ field, FieldLabel, errorMessage, blur, change, input }"
			>
				<v-text-field
					v-model="allFieldsExample.answers.customBar"
					v-bind="field"
					:error="errorMessage"
					:error-messages="errorMessage"
					@blur="blur"
					@change="change"
					@input="input"
				>
					<template #label>
						<component
							:is="FieldLabel"
							:label="field.label"
							:required="!!field.required"
						/>
					</template>
				</v-text-field>
			</template>

			<template
				v-if="answerAndPagesKey === 'allFields'"
				#[`custom.custoFoo`]="props"
			>
				<v-text-field
					v-model="allFieldsExample.answers.custoFoo"
					v-bind="props.field"
					:error="props.errorMessage"
					:error-messages="props.errorMessage"
					@blur="props.blur()"
					@change="props.change()"
					@input="props.input()"
				>
					<template #label>
						<component
							:is="props.FieldLabel"
							:label="props.field.label"
							:required="!!props.field.required"
						/>
					</template>
				</v-text-field>
			</template>

		</VStepperForm>

		<pre>
	{{ formAnswers[String(answerAndPagesKey)] }}
</pre>

	</AuthLayout>
</template>

<script setup lang="ts">
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
// import { toTypedSchema } from '@vee-validate/yup';
import {
	array as yupArray,
	number as yupNumber,
	object as yupObject,
	string as yupString,
} from 'yup';

// import * as Yup from 'yup';
// import type { VTextField } from 'vuetify/components';
// import { FieldLabel } from 'resources/js/Plugins/vuetify-stepper-form';

const keys = [
	'allFields',
	'conditional',
	'pages',
	'validation',
];

const answerAndPagesKey = keys[0];


// & -------------------------------------------------- Checkboxes //
// ------------------------- Checkbox Multiple //
const checkboxMultipleProps = {
	// density: 'compact' as const,
	// id: 'some-id',
	// indeterminate: true,
	// indeterminateIcon: 'mdi:mdi-help-box',
	// inlineSpacing: '40px', 											// * Custom Prop
	label: 'Multiple Checkbox Question',
	labelPositionLeft: true,												// * Custom Prop
	multiple: true,
	name: 'checkboxMultiple',
	options: [
		{
			id: 'option1-id',
			label: 'Option 1',
			value: 'option1',
		},
		{
			id: 'option2-id',
			label: 'Option 2',
			value: 'option2',
		},
		{
			id: 'option3-id',
			label: 'Option 3',
			value: 'option3',
		},
	],
	// trueIcon: 'mdi:mdi-plus',
	// trueValue: 'yes',
	type: 'checkbox' as const,							// *
};
// ------------------------- Checkbox Single //
const checkboxSingleProps = {
	// density: 'compact' as const,
	// id: 'some-id',
	// indeterminate: true,
	// indeterminateIcon: 'mdi:mdi-help-box',
	label: 'Checkbox Question',
	name: 'checkbooSingle',
	// trueIcon: 'mdi:mdi-plus',
	// trueValue: 'yes',
	type: 'checkbox' as const,
};

// & -------------------------------------------------- Textarea //
const textareaProps = {
	// autoGrow: true,
	// counterValue: 100,											// ! Not working
	// dirty: true,
	label: 'Description',
	name: 'desc',
	// noResize: true,
	type: 'textarea' as const,
};

// & -------------------------------------------------- Text Field //
const textFieldProps = {
	label: 'Name',
	name: 'name',
	type: 'text' as const,
	variant: 'outlined',
};
// ------------------------- Color Field //
const colorFieldMasterProps = {
	// canvasHeight: 500,
	// cardFieldWidth: true,
	// cardOffsetX: 200,
	// cardOffsetY: 200,
	// cardPadding: 200,
	// cardProps: { elevation: 0 },
	// dotSize: 50,
	// iconHoverColor: 'secondary',
	// iconSize: 50,
	// open: 'top right',
	pip: true,
	// pipBorder: '5px solid #0f0',
	// pipBorderRadius: '3px',
	// pipIcon: 'mdi:mdi-cog',
	// pipSlot: 'append-inner',
	readonlyInput: true,
	// swatches: [['#FF0000']],
	// swatchesMaxHeight: 20,
	// type: 'color' as const,
};
const colorFieldProps = {
	// ...colorFieldMasterProps,
	label: 'Color',
	name: 'color',
	type: 'color' as const,
	variant: 'outlined',
};
// ------------------------- File Input //
const fileInputProps = {
	// accept: 'image/png',
	// counterSizeString: '$vuetify.fileInput.counterSize',
	// counterString: '$vuetify.fileInput.counter',
	// counterValue: 100,
	// direction: 'horizontal',
	// dirty: true,
	// hideInput: true,
	label: 'File',
	name: 'file',
	// persistentClear: true,					// * only when a file is selected
	// persistentPlaceholder: true,
	// placeholder: 'Enter your name',
	// showSize: true,
	type: 'file' as const,
};
// ------------------------- Image Input TBD //
const fileImageProps = {
	label: 'Image',
	name: 'image',
	type: 'image' as const,
};
// ------------------------- Email //
const textFieldEmailProps = {
	hint: 'Enter your email',
	label: 'E-mail',
	name: 'email',
	type: 'email' as const,
};
// ------------------------- Number //
const textFieldNumberProps = {
	label: 'Number',
	name: 'number',
	type: 'number' as const,
};
// ------------------------- Password //
const textFieldPasswordProps = {
	label: 'Password',
	name: 'password',
	type: 'password' as const,
};
// ------------------------- URL //
const textFieldUrlProps = {
	label: 'URL',
	name: 'url',
	type: 'url' as const,
};
// ------------------------- Phone //
const textFieldPhoneProps = {
	label: 'Phone',
	name: 'tel',
	type: 'tel' as const,
};

// & -------------------------------------------------- Select //
const selectProps = {
	clearable: true,
	color: 'primary',
	// focused: true,								// ?
	itemProps: () => ({
		'data-foo': 'hello world',
	}),
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
	// listProps: () => ({}),				// ?
	label: 'Select Question',
	// menuProps: () => ({}),				// ?
	name: 'selectField',
	type: 'select' as const,
	variant: 'outlined',
	// valueComparator: (a, b) => (a === b),			// ? Not sure what this does. Not applicable
};
// ------------------------- Autocomplete //
const autocompleteProps = {
	// autoSelectFirst: true,												// ?
	chips: true,
	clearable: true,
	// closeText: 'Foobar', 												// ?
	color: 'primary',
	// centerAffix: true,														// ? Broken? & Not needed
	// customFilter: () => {},											// ? Not tested
	// eager: true,																	// ?
	// filterMode: 'every' as const,								// ? Not tested
	// focused: true,																// ?
	// hideSpinButtons: true,												// ? Not applicable
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
	label: 'Autocomplete Question',
	// listProps: () => ({}),												// ! Not applicable
	// menuProps: () => ({}),												// ! Not applicable
	multiple: true,
	name: 'autocomplete',
	// openText: 'Open Me',													// ?
	type: 'autocomplete' as const,
	// validateOn: 'blur', 													// ! Need to build this out
	// valueComparator: (a, b) => (a === b),				// ? Not sure what this does. Not applicable
	variant: 'outlined',
};
// ------------------------- Combobox //
// ! Needs more testing - Missing error messages //
const comboboxProps = {
	chips: true,
	clearable: true,
	color: 'primary',
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
	label: 'Combobox Question',
	multiple: true,
	name: 'combobox',
	placeholder: 'Select an item',
	type: 'combobox' as const,
	variant: 'outlined',
};

// & -------------------------------------------------- Switch //
const switchProps = {
	// density: 'compact' as const,
	// centerAffix: true,
	// defaultsTarget: '',
	// focused: true,
	// indeterminate: '',
	// inline: true,
	// inset: true,
	label: 'Switch Question',
	// minWidth: '600px',
	// multiple: true,							// * Works but not sure why you would use it, results in an array answer
	name: 'switchQuestion',
	ripple: false,
	type: 'switch' as const,
	// value: 'stuff',
	// valueComparator: () => {},
};

// & -------------------------------------------------- Radio //
const radioProps = {
	// appendIcon: 'mdi:mdi-cog', 								// * Radio group prop
	// defaultsTarget: '',
	// direction: 'vertical', 										// ? Might need a min width for this
	// errorMessages: ['Error 1', 'Error 2'],			// * Radio group prop
	// falseValue: 'no',
	// groupId: 'foobar',													// * Radio group container custom prop
	// hideDetails: true,													// * Radio group prop
	// hint: 'Radio stuff', 											// * Radio group prop
	// id: 'some-id',
	// inlineSpacing: '40px', 										// * Custom Prop
	label: 'Radio Question',
	// labelPositionLeft: true,										// * Custom Prop
	// maxWidth: '50px',													// * Radio group prop
	// messages: 'Msg',														// * Radio group prop
	// messages: ['Msg 1', 'Msg 2'],							// * Radio group prop
	// minWidth: '600px',													// * Radio group prop. Needs to have width prop set
	// multiple: true, 														// ? Maybe fix this
	name: 'radio',
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
	// persistentHint: true, 											// * Radio group prop
	theme: 'light', 															// * Radio group prop
	// trueValue: 'yes',
	type: 'radio' as const,
	// value: 'stuff',														// ?
	// valueComparator: () => { },								// ?
};
// & ------------------------- Fancy Radio //
const fancyRadioProps = {
	color: 'primary',
	// density: 'comfortable' as const,
	falseValue: 'no',
	// height: '100px',
	label: 'Fancy Radio Question',
	name: 'fancyRadio',
	options: [
		{
			id: 'yes-id',
			label: 'Yes',
			value: 'yes',
		},
		{
			id: 'no-id',
			label: 'No',
			// label: 'foo <br /> bar',
			value: 'no',
		},
		{
			label: 'Maybe',
			value: 'maybe',
		},
		{
			label: 'Sure',
			value: 'sure',
		},
	],
	trueValue: 'yes',
	type: 'fancyRadio' as const,
	// validateOn: 'change',
	variant: 'outlined',
	// width: '200px',
};

// & -------------------------------------------------- Custom Slots //
const customSlots = [
	{
		label: 'Custom Question Slot Bar',
		name: 'customBar',
		type: 'custom' as const,
		variant: 'outlined' as const,
	},
	{
		color: 'primary',
		label: 'Custom Question Slot Foo',
		name: 'custoFoo',
		required: true,
		type: 'custom' as const,
		variant: 'outlined' as const,
	},
];


// ~ -------------------------------------------------- All Fields Example //
const allFieldsExample = reactive({
	answers: {
		autocomplete: null,
		// autocomplete: 'foo',
		checkboxMultiple: undefined,
		// checkboxMultiple: ['option1', 'option3'],
		checkboxSingle: null,
		// checkboxSingle: 'yes',
		color: '#ff0000',
		// combobox: null,
		// combobox: 'Foo',
		// combobox: 'foo',
		combobox: null,
		// combobox: { title: 'Foo', value: 'foo' },
		custoFoo: null,
		customBar: null,
		desc: 'Hello World',
		email: 'test@test.com',
		fancyRadio: null,
		// fancyRadio: 'yes',
		file: null,
		name: 'Bunny',
		// radio: 'option1',
		radio: null,
		// radioMultiple: ['option1', 'option3'],
		// selectField: null,
		selectField: 'foo',
		switchQuestion: true,
		// switchQuestion: 'yes',
	},
	pages: [
		{
			fields: [
				// {
				// 	...comboboxProps,
				// columns: {
				// 	lg: 12,
				// 	md: 12,
				// 	sm: 12,
				// 	xl: 12,
				// },
				// },
				// {
				// 	...checkboxMultipleProps,
				// columns: {
				// 	xl: 12,
				// },
				// },
				// { ...checkboxSingleProps },
				// { ...textFieldProps },
				// { ...colorFieldProps },
				// {
				// 	...fileInputProps,
				// columns: {
				// 	lg: 12,
				// 	md: 12,
				// 	sm: 12,
				// 	xl: 12,
				// },
				// },
				// { ...textFieldEmailProps },
				// { ...textFieldNumberProps },
				// { ...textFieldPasswordProps },
				// { ...textFieldUrlProps },
				// { ...textFieldPhoneProps },
				// { ...textareaProps },
				// { ...radioProps },
				// { ...fancyRadioProps },
				// { ...selectProps },
				// { ...autocompleteProps },
				// { ...switchProps },
				// ...customSlots,
				// { ...fileImageProps },
				// ? ------------------------- Submit Maybe //
				// {
				// 	label: 'Submit',
				// 	name: 'submit',
				// 	type: 'submit' as const,
				// },
			],
		},
	],
	validation: yupObject({
		// autocomplete: yupString().required(isRequired('Autocomplete')),
		// autocomplete: yupArray().required(isRequired('Autocomplete')),
		// checkboxMultiple: yupArray().required(isRequired('Checkbox Multiple')),
		// .length(1, 'Must select at least ${length} option.'),
		// checkbooSingle: yupString().required(isRequired('Checkbox Single')),
		// .matches(/(^false)/, 'Checkbox must be not false'),
		// color: yupString().required(isRequired('Color')),
		// combobox: yupString().required(isRequired('Combobox')),
		custoFoo: yupString().required(isRequired('Custom Foo')),
		customBar: yupString().required(isRequired('Custom Bar')),
		// desc: yupString().required(isRequired('Description')),
		// email: yupString().email('Must be a valid Email').required(isRequired('Email')),
		// fancyRadio: yupArray().required(isRequired('Fancy Radio')),
		// fancyRadio: yupString().required(isRequired('Fancy Radio')),
		// fancyRadio: yupString().required(isRequired('Fancy Radio')).matches(/(yes|no)/),
		// file: yupString().required(isRequired('File')),
		// name: yupString().required(isRequired('Name')),
		// number: yupNumber().required(isRequired('Number')),
		// password: yupString().required(isRequired('Password')),
		// radio: yupString().required(isRequired('Radio')),
		// selectField: yupString().required(isRequired('Select Field')),
		// switchQuestion: yupString().required(isRequired('Switch Question')).matches(/(false)/),
		// tel: yupString().required(isRequired('Phone')),
		// url: yupString().required(isRequired('URL')).url('Must be a valid URL'),
	}),
});


// ~ -------------------------------------------------- Conditional Example //
const conditionalExample = reactive({
	answers: {
		aConditional: null,
		bConditional: null,
		cConditional: null,
		conditionalParent: null,
		fooQuestion: null,
	},
	pages: [
		{
			fields: [
				{
					items: [
						{
							title: 'A',
							value: 'a',
						},
						{
							title: 'B',
							value: 'b',
						},
						{
							title: 'C',
							value: 'c',
						},
					],
					label: 'Select Letter',
					name: 'conditionalParent',
					type: 'select' as const,
					variant: 'outlined',
				},
				{
					label: 'A Conditional',
					name: 'aConditional',
					type: 'text' as const,
					variant: 'outlined',
					when: (answers: any) => {
						return answers?.conditionalParent === 'a';
					},
					whenParentName: 'conditionalParent',
				},
				{
					label: 'B Conditional',
					name: 'bConditional',
					type: 'text' as const,
					variant: 'outlined',
					when: (answers: any) => {
						return answers?.conditionalParent === 'b';
					},
					whenParentName: 'conditionalParent',
				},
			],
		},
		{
			fields: [
				{
					label: 'C Conditional',
					name: 'cConditional',
					rules: [
						{
							params: ['C field is required'],
							type: 'required',
						},
					],
					type: 'text' as const,
					variant: 'outlined',
					when: (answers: any) => {
						return answers?.conditionalParent === 'c';
					},
					whenParentName: 'conditionalParent',
				},
			],
		},
	],
	validation: yupObject({
		aConditional: yupString().when('conditionalParent', {
			is: (val: string) => val === 'a',
			then: (schema) => schema.required('Schema A Conditional is required'),
		}),
		bConditional: yupString()
			.min(5, 'Schema B Conditional must be at least 5 characters')
			.when('conditionalParent', {
				is: (val: string) => val === 'b',
				then: (schema) => schema.required('Schema B Conditional is required'),
			}),
		cConditional: yupString().when('conditionalParent', {
			is: (val: string) => val === 'c',
			then: (schema) => schema.required('Schema C Conditional is required'),
		}),
		conditionalParent: yupString().required('Schema Conditional Parent is required'),
	}),
});


// ~ -------------------------------------------------- Paged Example //
const pagesExample = reactive({
	answers: {
		q1: null,
		q2: 'bar',
		q2a: null,
		q3: 'baz',
		q3a: null,
		q4: 'qux',
	},
	pages: [
		{
			editable: false,
			fields: [
				{
					color: 'success',
					label: 'First Name',
					name: 'q1',
					text: 'Enter your first name only',
					type: 'text' as const,
					validateOn: 'change',
					// variant: 'outlined',
				},
				{
					// autoPage: true,
					label: 'Last Name',
					name: 'q2',
					text: 'Enter your last name only',
					type: 'text' as const,
					variant: 'outlined',
				},
				{
					autoPage: true,
					label: 'Question 2 a',
					multiple: true,
					name: 'q2a',
					options: [
						{
							label: 'Yes',
							value: 'yes',
						},
						{
							label: 'No',
							value: 'no',
						},
					],
					type: 'checkbox' as const,
					variant: 'outlined',
				},
			],
			text: 'Page text prop',
			title: 'Foo Section',
		},
		{
			fields: [
				{
					// autoPage: true,
					label: 'Question 3',
					name: 'q3',
					type: 'text' as const,
					variant: 'outlined',
				},
				{
					// autoPage: true,
					autoPageDelay: 0,
					label: 'Question 3',
					name: 'q3a',
					options: [
						{
							label: 'Yes',
							value: 'yes',
						},
						{
							label: 'No',
							value: 'no',
						},
					],
					type: 'fancyRadio' as const,
					variant: 'outlined',
				},
			],
			title: 'Page 1 Title',
		},
		{
			fields: [
				{
					label: 'Question 4',
					name: 'q4',
					type: 'text' as const,
					variant: 'outlined',
				},
			],
			title: 'Page 2 Title',
		},
		{
			fields: [],
			isReview: true,
			text: 'Here\'s the data you\'ve entered. Feel free to review it.',
			title: 'Summary',
		},
	],
	validation: yupObject({
		q1: yupString().required('First Name is required'),
		q2: yupString().required('Last Name is required'),
		q3: yupString().required('Question 3 is required'),
		q3a: yupString().required('Question 3 a is required'),
		q4: yupString().required('Question 4 is required'),
	}),
});


// ~ -------------------------------------------------- Validation Example //
const validationExample = reactive({
	answers: {
		aConditional: null,
		bConditional: null,
		cConditional: null,
		conditionalParent: null,
		fooQuestion: null,
	},
	pages: [
		{
			error: false,
			fields: [
				{
					items: [
						{
							title: 'A',
							value: 'a',
						},
						{
							title: 'B',
							value: 'b',
						},
						{
							title: 'C',
							value: 'c',
						},
					],
					label: 'Select Letter',
					name: 'conditionalParent',
					rules: [
						{
							params: ['This field is required'],
							type: 'required',
						},
					],
					type: 'select' as const,
					// validateOn: 'blur',
					variant: 'outlined',
				},
				{
					// autoPage: true,
					clearable: true,
					error: false,
					label: 'Foo Question',
					name: 'fooQuestion',
					rules: [
						{
							params: ['This field is required'],
							type: 'required',
						},
						{
							params: [5, 'Foo Question needs to be at least 5 characters.'],
							type: 'min',
						},
						{
							params: [10, 'Foo Question cannot be more than 10 characters'],
							type: 'max',
						},
					],
					type: 'text' as const,
					// validateOn: 'blur',
					variant: 'underlined',
				},
			],
			title: 'Validation Page',
		},
		{
			fields: [
				{
					label: 'A Conditional',
					name: 'aConditional',
					rules: [
						{
							params: ['this field is required'],
							type: 'required',
						},
					],
					type: 'text' as const,
					// validateOn: 'blur',
					variant: 'outlined',
				},
			],
		},
	],
	validation: yupObject({
		aConditional: yupString().when('conditionalParent', {
			is: (val: string) => val === 'a',
			then: (schema) => schema.required('Schema A Conditional is required'),
		}),
		bConditional: yupString()
			.min(5, 'Schema B Conditional must be at least 5 characters')
			.when('conditionalParent', {
				is: (val: string) => val === 'b',
				then: (schema) => schema.required('Schema B Conditional is required'),
			}),
		cConditional: yupString().when('conditionalParent', {
			is: (val: string) => val === 'c',
			then: (schema) => schema.required('Schema C Conditional is required'),
		}),
		conditionalParent: yupString().required('Schema Conditional Parent is required'),
	}),
});


// & -------------------------------------------------- Form Settings //
function isRequired(field: string) {
	return `The ${field} field is required`;
}

const formAnswers = reactive({
	allFields: allFieldsExample.answers,
	conditional: conditionalExample.answers,
	pages: pagesExample.answers,
	validation: validationExample.answers,
});

const formPages = {
	allFields: allFieldsExample.pages,
	conditional: conditionalExample.pages,
	pages: pagesExample.pages,
	validation: validationExample.pages,
};

const formSchemas = {
	allFields: allFieldsExample.validation,
	conditional: conditionalExample.validation,
	pages: pagesExample.validation,
	validation: validationExample.validation,
};

const formSettings = ref({
	// autoPage: true,																	// * Custom
	// autoPageDelay: 2000,															// * Custom
	// altLabels: true,																	// * VStepper
	// bgColor: 'secondary',														// * VStepper
	// border: 'lg',																		// * VStepper
	// canReview: false,																// ! VStepper - Needs more testing and refining
	// color: 'yellow',																	// * Global, VStepper, VStepperItem
	// completeIcon: 'fas fa-check',										// ? VStepper Not sure how this works yet
	// density: 'default',															// * Global
	// direction: 'vertical',														// ! VStepper, VStepperVertical (in labs)
	// disabled: true,																	// * VStepper
	// editIcon: 'fas fa-pencil',												// ! VStepper Works. Needs style adjustments in the plugin
	// editable: false,																	// * VStepper
	// errorIcon: 'fas fa-cog',													// * VStepper
	fieldColumns: {
		lg: 6,
		md: 4,
		sm: 6,
		xl: 6,
	},
	// flat: true,																			// * VStepper
	// elevation: 10,																		// * VStepper
	// height: '900px',																	// * VStepper
	// hideActions: true,																// * VStepperActions (VStepper prop
	// hideDetails: true,																// * Global
	// itemTitle: 'title',															// ! VStepper Not using
	// itemValue: 'value',															// ! VStepper Not using
	// items: [],																				// ! VStepper Not using
	// location: 'top',																	// ! VStepper Not using
	// mandatory: true,																	// ? VStepper Not sure how this works yet
	// max: 10,																					// ! VStepper Not using. Not sure how this works.
	// maxHeight: '50px',																// * VStepper
	// maxWidth: '50px',																// * VStepper
	// minHeight: '900px',															// * VStepper
	// minWidth: '900px',																// * VStepper
	// navButtonSize: 'small',													// * Custom, VStepperActions
	// nextText: 'hop back',														// * VStepper
	pages: formPages[String(answerAndPagesKey)],			// *
	// position: 'fixed',																// ! VStepper Not using
	// prevText: 'hop forward',													// * VStepper
	// rounded: 'pill',																	// * VStepper
	// selectedClass: 'foobar',													// * VStepper
	// summaryColumns: { sm: 2 },												// * Custom, PageReviewContainer
	// tag: 'div',																			// ! VStepper Not using
	// theme: 'light',																	// * VStepper
	// tile: true,																			// * VStepper
	title: `${answerAndPagesKey} Form`,							// *
	// transition: 'fade-transition',										// * VStepperWindowItemProps
	validateOn: 'blur',															// * Global
	// validateOnMount: true,														// * VeeValidate
	validationSchema: formSchemas[String(answerAndPagesKey)],	// *
	// variant: 'outlined',															// * Global
	// width: '50px',																		// * Global
});

function submitForm() {
	console.log('Playground submitForm');
}


// ^ -------------------------------------------------- Master Props List //
const propsMasterList = {
	// messages: ['Msg 1', 'Msg 2'],
	// items: ['Foo', 'Bar', 'Maybe', 'Sure'],
	active: true,
	appendIcon: 'mdi:mdi-cog',
	appendInnerIcon: 'mdi:mdi-cog',
	autoSelectFirst: true,
	baseColor: 'warning',
	bgColor: 'secondary',
	centerAffix: true,
	chips: true,
	clearIcon: 'mdi:mdi-close-box',
	clearOnSelect: true,
	clearable: true,
	closableChips: true,
	closeText: 'Foobar',
	color: 'primary',
	colorPickerProps: {},
	counter: true,
	counterValue: 100,
	customFilter: () => { },											// ? Not tested
	defaultsTarget: '', 													// ? Not sure what this does
	density: 'compact' as const,
	direction: 'horizontal',
	dirty: true,
	disabled: true,
	dotSize: 50,
	eager: true,																	// ? Not sure how to test
	error: true,
	falseIcon: 'mdi:mdi-minus',
	falseValue: 'no',
	filterKeys: ['value	'],
	filterMode: 'every' as const,									// ? Not tested
	flat: true,
	focused: true,
	hideCanvas: true,
	hideDetails: true,
	hideInputs: true,
	hideNoData: true,
	hideSliders: true,
	hideSpinButtons: true,
	hint: 'Some Hint',
	id: 'some-id',
	indeterminate: true,
	indeterminateIcon: 'mdi:mdi-help-box',
	inline: true,
	inlineSpacing: '40px', 												// * Custom Prop
	itemColor: 'success',
	itemProps: () => ({ 'data-foo': 'foo' }),
	itemTitle: 'bar',
	itemValue: 'foo',
	items: [],
	label: 'Label',
	labelPositionLeft: true,											// * Custom Prop
	listProps: () => ({}),
	loading: true,
	maxErrors: 2,
	maxWidth: '50px',
	menu: true,
	menuIcon: 'mdi:mdi-cog',
	menuProps: () => ({}),
	messages: 'Msg',
	minWidth: '600px',
	mode: 'hsla',
	modes: ['hsl', 'hsla'],
	multiple: true,
	name: 'someName',
	noDataText: 'no data stuff',
	noFilter: true,
	openOnClear: true,
	openText: 'Open Me',
	persistentClear: true,
	persistentCounter: true,
	persistentHint: true,
	persistentPlaceholder: true,
	placeholder: 'Placeholder Stuff',
	prefix: 'Animal:',
	prependIcon: 'mdi:mdi-cog',
	prependInnerIcon: 'mdi:mdi-cog',
	readonly: true,
	returnObject: true,
	reverse: true,
	ripple: true,
	role: 'foobar',
	rounded: 'pill',
	showSwatches: true,
	singleLine: true,
	suffix: 'Rabbit',
	theme: 'light',
	tile: true,
	transition: 'fab-transition',
	trueIcon: 'mdi:mdi-plus',
	trueValue: 'yes',
	type: 'text' as const,
	validateOn: 'blur',
	value: 'stuff', 															// ? Not sure what this does exactly
	valueComparator: () => { },										// ? Not sure what this does exactly
	variant: 'outlined',
	width: '200px',
};

</script>

<style lang="scss" scoped></style>
