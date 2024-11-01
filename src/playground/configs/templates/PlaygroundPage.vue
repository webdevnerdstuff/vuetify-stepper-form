<template>
	<VStepperForm
		v-model="formAnswers[String(answerAndPagesKey)]"
		v-bind="formSettings"
		@submit="submitForm"
	>
		<template
			v-if="answerAndPagesKey === 'allFields'"
			#[`field.customBar`]="{ errorMessage, field, blur, change, input, FieldLabel }"
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
			#[`field.custoFoo`]="props"
		>
			<v-select
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
			</v-select>
		</template>

	</VStepperForm>

	<v-container>
		<v-row>
			<v-col
				cols="6"
				style="display: none;"
			>
				<v-select
					v-model="variantModel"
					item-value="value"
					:items="fieldVariants"
					label="Field Variants"
				/>
			</v-col>
			<v-col
				class="offset-3"
				cols="6"
			>
				<v-select
					v-model="buttonVariantModel"
					:items="buttonVariants"
					label="Button Variant"
				/>
			</v-col>
		</v-row>
	</v-container>

	<v-container>
		<VCodeBlock
			class="mt-4 mb-2"
			:code="JSON.stringify(formAnswers[String(answerAndPagesKey)], null, 2)"
			label="Answers"
			lang="javascript"
			prismjs
		/>
	</v-container>

	<AnswersDialog
		v-model="dialog"
		:answers="formAnswers[String(answerAndPagesKey)]"
	/>
</template>

<script setup lang="ts">
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import { toTypedSchema } from '@vee-validate/zod';
import { VCodeBlock } from '@wdns/vue-code-block';
import { reactive, ref } from 'vue';
import {
	array as yupArray,
	number as yupNumber,
	object as yupObject,
	string as yupString,
} from 'yup';
import * as zod from 'zod';
import AnswersDialog from '../documentation/components/AnswersDialog.vue';


const keys = [
	'allFields',
	'conditional',
	'conditionalPage',
	'pages',
	'validation',
];

const answerAndPagesKey = keys[0];

const buttonVariants = [
	{
		title: 'None',
		value: undefined,
	},
	{
		title: 'Text',
		value: 'text',
	},
	{
		title: 'Flat',
		value: 'flat',
	},
	{
		title: 'Elevated',
		value: 'elevated',
	},
	{
		title: 'Tonal',
		value: 'tonal',
	},
	{
		title: 'Outlined',
		value: 'outlined',
	},
	{
		title: 'Plain',
		value: 'plain',
	},
];
const buttonVariantModel = ref('outlined');
const fieldVariants = [
	{
		title: 'None',
		value: '',
	},
	{
		title: 'Filled',
		value: 'filled',
	},
	{
		title: 'Outlined',
		value: 'outlined',
	},
	{
		title: 'Underlined',
		value: 'underlined',
	},
	{
		title: 'Plain',
		value: 'plain',
	},
	{
		title: 'Solo',
		value: 'solo',
	},
	{
		title: 'Solo Inverted',
		value: 'solo-inverted',
	},
	{
		title: 'Solo Filled',
		value: 'solo-filled',
	},
];
const variantModel = ref('outlined');
const dialog = ref(false);


// & -------------------------------------------------- Checkboxes //
// ------------------------- Checkbox Multiple //
const checkboxMultipleProps = {
	// density: 'compact' as const,
	// id: 'some-id',
	// indeterminate: true,
	// indeterminateIcon: 'mdi:mdi-help-box',
	// inlineSpacing: '40px', 											// * Custom Prop
	// inline: true,
	label: 'Multiple Checkbox Question',
	// labelPositionLeft: true,												// * Custom Prop
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
// & ------------------------- Button Field //
const buttonFieldProps = {
	// active: false, // ? Not supported
	// activeColor: 'primary-darken-1', // **
	align: 'center', // **
	// appendIcon: '$vuetify', // **
	// baseColor: 'secondary', // **
	// block: true, // * Make adjustments
	// border: 'xl', // ?
	color: 'primary', // **
	density: 'expanded' as const, // **
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
	multiple: true, // **
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
	// selectedClass: 'selectred-foo', // **
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

// & -------------------------------------------------- Custom Slots //
const customSlots = [
	{
		label: 'Custom Question Slot Bar',
		name: 'customBar',
		type: 'field' as const,
		variant: 'outlined' as const,
	},
	{
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
		label: 'Custom Question Slot Foo',
		name: 'custoFoo',
		required: true,
		type: 'field' as const,
		variant: 'outlined' as const,
	},
];


// ~ -------------------------------------------------- All Fields Example //
const allFieldsExample = reactive({
	answers: {
		autocomplete: undefined,
		// autocomplete: 'foo',
		buttonField: [],
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
		name: null,
		// radio: 'option1',
		radio: null,
		// radioMultiple: ['option1', 'option3'],
		// selectField: null,
		selectField: 'foo',
		switchQuestion: true,
		// switchQuestion: 'yes',
	},
	formSettings: {

	},
	pages: [
		{
			fields: [
				{ ...buttonFieldProps },
				// {
				// 	...comboboxProps,
				// 	columns: {
				// 		lg: 12,
				// 		md: 12,
				// 		sm: 12,
				// 		xl: 12,
				// 	},
				// },
				// {
				// 	...checkboxMultipleProps,
				// 	columns: {
				// 		xl: 12,
				// 	},
				// },
				// { ...checkboxSingleProps },
				// { ...colorFieldProps },
				// {
				// 	...fileInputProps,
				// 	columns: {
				// 		md: 6,
				// 		sm: 12,
				// 		xl: 6,
				// 	},
				// },
				// {
				// 	...textFieldEmailProps,
				// 	columns: {
				// 		md: 12,
				// 		sm: 12,
				// 		xl: 12,
				// 	},
				// },
				// {
				// 	...textFieldProps,
				// 	columns: {
				// 		// 	lg: 12,
				// 		// md: 6,
				// 		// sm: 1,
				// 		// 	xl: 12,
				// 	},
				// },
				// { ...textFieldNumberProps },
				// {
				// 	...textFieldPasswordProps,
				// 	// when: (answers: any) => {
				// 	// 	return answers?.email === 'test@test.com';
				// 	// },
				// },
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
			],
		},
	],
	validation: yupObject({
		// autocomplete: yupString().required(isRequired('Autocomplete')),
		// autocomplete: yupArray().required(isRequired('Autocomplete')),
		buttonField: yupArray().required(isRequired('Button Field')),
		// buttonField: yupString().required(isRequired('Button Field')).matches(/(yes|no)/, 'Only "yes" or "no" is allowed'),
		// checkbooSingle: yupString().required(isRequired('Checkbox Single'))
		// 	.matches(/(^true)/, isRequired('Checkbox Single')),
		// checkboxMultiple: yupArray().required(isRequired('Checkbox Multiple'))
		// 	.min(1, 'Must select at least ${min} option.'),
		// .matches(/(^false)/, 'Checkbox must be not false'),
		// color: yupString().required(isRequired('Color')),
		// combobox: yupArray().required(isRequired('Combobox'))
		// 	.length(1, 'Must select at least ${length} option.'),
		// custoFoo: yupString().required(isRequired('Custom Foo')),
		// customBar: yupString().required(isRequired('Custom Bar')),
		// desc: yupString().required(isRequired('Description')),
		// email: yupString().email('Must be a valid Email').required(isRequired('Email')),
		// fancyRadio: yupArray().required(isRequired('Fancy Radio')),
		// fancyRadio: yupString().required(isRequired('Fancy Radio')),
		// file: yupString().required(isRequired('File')),
		// name: yupString().required(isRequired('Name')),
		// number: yupNumber().required(isRequired('Number')),
		// password: yupString().required(isRequired('Password'))
		// 	.length(4, 'Password must have at least ${length} characters.'),
		// radio: yupString().required(isRequired('Radio')).matches(/(yes|no)/, 'Only "yes" or "no" is allowed'),
		// selectField: yupString().required(isRequired('Select Field')),
		// switchQuestion: yupString().required(isRequired('Switch Question')).matches(/(false)/),
		// tel: yupString().required(isRequired('Phone')),
		// url: yupString().required(isRequired('URL')).url('Must be a valid URL'),
	}),
	validationYup: yupObject({
		autocomplete: yupString().required(isRequired('Autocomplete')),
		// autocomplete: yupArray().required(isRequired('Autocomplete')),
		checkbooSingle: yupString().required(isRequired('Checkbox Single')),
		checkboxMultiple: yupArray().required(isRequired('Checkbox Multiple'))
			.length(1, 'Must select at least ${length} option.'),
		// .matches(/(^false)/, 'Checkbox must be not false'),
		color: yupString().required(isRequired('Color')),
		combobox: yupArray().required(isRequired('Combobox'))
			.length(1, 'Must select at least ${length} option.'),
		custoFoo: yupString().required(isRequired('Custom Foo')),
		customBar: yupString().required(isRequired('Custom Bar')),
		desc: yupString().required(isRequired('Description')),
		email: yupString().email('Must be a valid Email').required(isRequired('Email')),
		// fancyRadio: yupArray().required(isRequired('Fancy Radio')),
		// fancyRadio: yupString().required(isRequired('Fancy Radio')),
		fancyRadio: yupString().required(isRequired('Fancy Radio')).matches(/(yes|no)/, 'Only "yes" or "no" is allowed'),
		file: yupString().required(isRequired('File')),
		name: yupString().required(isRequired('Name')),
		number: yupNumber().required(isRequired('Number')),
		password: yupString().required(isRequired('Password'))
			.length(4, 'Password must have at least ${length} characters.'),
		radio: yupString().required(isRequired('Radio')),
		selectField: yupString().required(isRequired('Select Field')),
		switchQuestion: yupString().required(isRequired('Switch Question')).matches(/(false)/),
		tel: yupString().required(isRequired('Phone')),
		url: yupString().required(isRequired('URL')).url('Must be a valid URL'),
	}),
	validationZod: toTypedSchema(zod.object({
		autocomplete: zod.array(zod.string(), { message: isRequired('Autocomplete') })
			.min(1, { message: isRequired('Autocomplete') }),
		checkbooSingle: zod.any()
			.refine((val) => val !== null && val !== false, { message: isRequired('Checkbox Single') })
			.refine((val) => {
				if (typeof val === 'string') {
					return val.trim() !== '';
				}
				return val === true;
			}, { message: 'Checkbox Single must be a non-empty string or true' }),
		checkboxMultiple: zod.array(zod.string({ message: isRequired('Checkbox Multiple') }))
			.min(2, { message: 'Must select at least 2 options' }),
		color: zod.string({ message: isRequired('Color') }).min(1, { message: isRequired('Color') }),
		combobox: zod.array(zod.object({
			label: zod.string().min(1, { message: 'Label cannot be empty' }).optional(),
			value: zod.string().min(1, { message: 'Value cannot be empty' }),
		}), { message: isRequired('Combobox') })
			.min(1, { message: 'Must select at least 1 option' }),
		custoFoo: zod.string({ message: isRequired('Custom Foo') }),
		customBar: zod.string({ message: isRequired('Custom Bar') }),
		desc: zod.string({ required_error: isRequired('Description') })
			.min(1, { message: isRequired('Description') }),
		email: zod.string({ message: isRequired('Email') }).email({ message: 'Must be a valid email' }),
		fancyRadio: zod.string({ message: isRequired('Fancy Radio') }).refine((val) => {
			return val === 'yes' || val === 'no';
		}, { message: 'Only "yes" or "no" is allowed' }),
		file: zod.string({ message: isRequired('File') }),
		name: zod.string({ message: isRequired('Name') }),
		number: zod
			.union([
				zod.number().min(1, { message: isRequired('Number') }),
				zod.string().refine((val) => !isNaN(Number(val)), { message: 'Must be a valid number' }),
			])
			.transform((val) => {
				if (typeof val === 'string') {
					return Number(val);
				}
				return val;
			})
			.refine((val) => val !== null && val > 0, { message: isRequired('Number') }),
		password: zod.string({ message: isRequired('Password') })
			.min(4, { message: 'Password must have at least 4 characters' }),
		radio: zod.string({ message: isRequired('Radio') }),
		selectField: zod.string({ message: isRequired('Select Field') }),
		switchQuestion: zod.boolean({ message: isRequired('Switch Question') })
			.refine((val) => val === false, { message: 'Switch Question must be false' }),
		tel: zod.string({ message: isRequired('Phone') }),
		url: zod.string({ message: isRequired('URL') }).url({ message: 'Must be a valid url' }),
	})),
	validationZodConditional: toTypedSchema(zod.object({
		email: zod.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
		name: zod.string().optional(),
	})
		.superRefine((arg, ctx) => {
			if (arg.email === 'test@test.com' && !arg.name) {
				ctx.addIssue({
					code: zod.ZodIssueCode.custom,
					message: "The name field is required when the email is 'test@test.com'",
					path: ['name'],
				});
			}
		}),
	),
});


// ~ -------------------------------------------------- Conditional Example //
const conditionalPageExample = reactive({
	answers: {
		aConditional: null,
		bConditional: null,
		cConditional: null,
		conditionalParent: null,
		fooQuestion: null,
	},
	formSettings: {

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
			],
			title: 'Page 1',
		},
		{
			fields: [
				{
					label: 'A Conditional',
					name: 'aConditional',
					type: 'text' as const,
					variant: 'outlined',
					// when: (answers: any) => {
					// 	return answers?.conditionalParent === 'a';
					// },
				},
			],
			title: 'A Page',
			when: (answers: any) => {
				return answers?.conditionalParent === 'a';
			},
		},
		{
			fields: [
				{
					label: 'B Conditional',
					name: 'bConditional',
					type: 'text' as const,
					variant: 'outlined',
					// when: (answers: any) => {
					// 	return answers?.conditionalParent === 'b';
					// },
				},
			],
			title: 'B Page',
			when: (answers: any) => {
				return answers?.conditionalParent === 'b';
			},
		},
		{
			fields: [
				{
					label: 'C Conditional',
					name: 'cConditional',
					type: 'text' as const,
					variant: 'outlined',
					// when: (answers: any) => {
					// 	return answers?.conditionalParent === 'c';
					// },
				},
			],
			title: 'C Page',
			when: (answers: any) => {
				return answers?.conditionalParent === 'c';
			},
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


// ~ -------------------------------------------------- Conditional Field Example //
const conditionalExample = reactive({
	answers: {
		aConditional: null,
		bConditional: null,
		cConditional: null,
		conditionalParent: null,
		fooQuestion: null,
	},
	formSettings: {

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
		booleanQuestion: null,
		firstName: null,
		lastName: 'bar',
		question3: 'baz',
		question4: 'qux',
	},
	formSettings: {
		headerTooltips: true,
		summaryColumns: { sm: 6 },
		tooltipLocation: 'bottom',
		// tooltipTransition: 'fab-transition',
	},
	pages: [
		{
			// editable: false,
			fields: [
				{
					color: 'success',
					label: 'First Name',
					name: 'firstName',
					text: 'Enter your first name only',
					type: 'text' as const,
					variant: 'outlined',
				},
				{
					// autoPage: true,
					label: 'Last Name',
					name: 'lastName',
					text: 'Enter your last name only',
					type: 'text' as const,
					variant: 'outlined',
				},
				{
					autoPage: true,
					label: 'Boolean Question',
					// multiple: true,
					name: 'booleanQuestion',
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
					type: 'buttons' as const,
					variant: 'outlined',
				},
			],
			text: 'Page text prop',
			// title: 'Page 1',
		},
		{
			fields: [
				{
					label: 'Question 3',
					name: 'question3',
					text: 'Which one of these is your favorite?',
					type: 'text' as const,
					variant: 'outlined',
				},
				{
					// autoPage: true,
					// autoPageDelay: 1000,
					align: 'center',
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
						{
							label: 'Maybe',
							value: 'maybe',
						},
						{
							label: 'Sure',
							value: 'sure',
						},
					],
					text: 'Which one of these is your favorite?',
					type: 'buttons' as const,
					variant: 'outlined',
				},
			],
			title: 'Questions',
			when: (answers: any) => {
				return answers?.lastName === 'bob';
			},
		},
		{
			fields: [
				{
					label: 'Question 4',
					name: 'question4',
					type: 'text' as const,
					variant: 'outlined',
				},
			],
			title: 'More Questions',
		},
		{
			isReview: true,
			text: 'Here\'s the data you\'ve entered. Feel free to review it.',
			title: 'Summary',
		},
	],
	validation: yupObject({
		firstName: yupString().required('First Name is required'),
		lastName: yupString().required('Last Name is required'),
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
	formSettings: {
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
	conditionalPage: conditionalPageExample.answers,
	pages: pagesExample.answers,
	validation: validationExample.answers,
});

const formPages = {
	allFields: allFieldsExample.pages,
	conditional: conditionalExample.pages,
	conditionalPage: conditionalPageExample.pages,
	pages: pagesExample.pages,
	validation: validationExample.pages,
};

const formSchemas = {
	allFields: allFieldsExample.validation,
	conditional: conditionalExample.validation,
	conditionalPage: conditionalPageExample.validation,
	pages: pagesExample.validation,
	validation: validationExample.validation,
};

const formFormSettings = {
	allFields: allFieldsExample.formSettings,
	conditional: conditionalExample.formSettings,
	conditionalPage: conditionalPageExample.formSettings,
	pages: pagesExample.formSettings,
	validation: validationExample.formSettings,
};

const formSettings = reactive({
	...formFormSettings[String(answerAndPagesKey)],
	// autoPage: true,																	// * Custom
	// autoPageDelay: 2000,															// * Custom
	// altLabels: true,																	// * VStepper
	// bgColor: 'secondary',														// * VStepper
	// border: 'lg',																		// * VStepper
	// class: 'my-custom-form-class',										// * Attr
	color: 'primary',																	// * Global, VStepper, VStepperItem
	// completeIcon: 'fas fa-check',										// ? VStepper Not sure how this works yet
	// 'data-foo': 'foobar', 														// * Attr
	// density: 'default',															// * Global
	// direction: 'vertical',														// ! VStepper, VStepperVertical (in labs)
	// disabled: true,																	// * VStepper
	// editIcon: 'fas fa-pencil',												// ! VStepper Works. Needs style adjustments in the plugin
	// editable: false,																	// ! VStepper
	// elevation: 10,																		// * VStepper
	// errorIcon: 'fas fa-cog',													// * VStepper
	// fieldColumns: {
	// 	lg: 12,
	// 	md: 12,
	// 	sm: 12,
	// 	xl: 12,
	// },
	// flat: true,																			// * VStepper
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
	// position: 'fixed',																// ^ VStepper Not using
	// prevText: 'hop forward',													// * VStepper
	// rounded: 'pill',																	// * VStepper
	// selectedClass: 'foobar',													// * VStepper
	// summaryColumns: { sm: 6 },												// * Custom, PageReviewContainer
	// tag: 'div',																			// * VStepper
	// theme: 'light',																	// * VStepper
	// tile: true,																			// * VStepper
	title: `${answerAndPagesKey} Form`,							// *
	// transition: 'fade-transition',										// * VStepperWindowItemProps
	validateOn: 'blur' as const,											// * Global
	// validateOnMount: true,														// * VeeValidate
	validationSchema: formSchemas[String(answerAndPagesKey)],	// *
	// variant: buttonVariantModel,											// * Global
	// width: '50px',																		// * Global
});

function submitForm(): void {
	dialog.value = true;
}


provide('codeBlockSettings', {
	plugin: 'prismjs',
	theme: 'neon-bunny',
});;
</script>

<style lang="scss" scoped></style>
