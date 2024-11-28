<template>
	<VStepperForm
		v-model="formAnswers[String(answerAndPagesKey)]"
		v-bind="formSettings"
		@submit="submitForm"
	>
		<template
			v-if="answerAndPagesKey === 'allFields' || answerAndPagesKey === 'testsData'"
			#[`field.slotField`]="props"
		>
			<v-text-field
				v-model="allFieldsExample.answers.slotField"
				v-bind="props.field"
				@blur="props.blur()"
				@change="props.change()"
				@input="props.input()"
			>
				<template #label>
					<component
						:is="props.FieldLabel"
						:label="props.field.label"
						:required="props.field.required"
					/>
				</template>
			</v-text-field>
		</template>

	</VStepperForm>

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
/* eslint-disable @typescript-eslint/no-unused-vars */
// ? Ignore the testData import error, it's a false positive due to tsconfig settings //
import * as DATA from '@cypress/templates/testData';
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
	'conditionalField',
	'conditionalPage',
];

// ? Change the key to test different examples //
const answerAndPagesKey = keys[0];

const dialog = ref(false);
const testFields = DATA.defaultFields;


// ~ -------------------------------------------------- Fields //
// & ------------------------- Text //
const textFieldProps = {
	...testFields.firstName,
	type: 'text' as const,
};
const fileInputProps = {
	label: 'File',
	name: 'file',
	type: 'file' as const,
};
const textFieldEmailProps = {
	...testFields.email,
	type: 'email' as const,
};
const textFieldNumberProps = {
	...testFields.number,
	type: 'number' as const,
};
const textFieldPasswordProps = {
	...testFields.password,
	type: 'password' as const,
};
const textFieldUrlProps = {
	...testFields.url,
	type: 'url' as const,
};
const textFieldPhoneProps = {
	...testFields.phone,
	type: 'tel' as const,
};
const colorFieldProps = {
	...testFields.color,
	pip: true,
	readonlyInput: true,
	type: 'color' as const,
};
const textareaProps = {
	...testFields.textarea,
	type: 'textarea' as const,
};

// ------------------------- Select //
const selectProps = {
	...testFields.select,
	clearable: true,
	type: 'select' as const,
};
const selectMultipleProps = {
	...testFields.selectMultiple,
	clearable: true,
	type: 'select' as const,
};
const autocompleteProps = {
	...testFields.autocomplete,
	chips: true,
	clearable: true,
	multiple: true,
	type: 'autocomplete' as const,
};
const comboboxProps = {
	...testFields.combobox,
	type: 'combobox' as const,
};

// & ------------------------- Checkbox //
// ------------------------- Checkbox Multiple //
const checkboxMultipleProps = {
	...testFields.checkboxMultiple,
	// ? Custom Prop - inlineSpacing //
	// inlineSpacing: '40px',
	// ? Custom Prop - labelPositionLeft //
	// labelPositionLeft: true,
	type: 'checkbox' as const,
};
const checkboxSingleProps = {
	...testFields.checkbox,
	type: 'checkbox' as const,
};

// & ------------------------- Radio //
const radioProps = {
	...testFields.radio,
	// ? Custom Prop - inlineSpacing //
	// inlineSpacing: '40px',
	// ? Custom Prop - labelPositionLeft //
	// labelPositionLeft: true,
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
	type: 'radio' as const,
};

// & Button Field - Custom Field //
const buttonFieldProps = {
	// activeColor: 'primary-darken-1',
	align: 'center',
	// appendIcon: '$vuetify',
	// baseColor: 'secondary',
	// block: true,
	border: 'xl',
	color: 'primary',
	density: 'expanded' as const,
	// disabled: true,
	// elevation: 10,
	// exact: true,
	// flat: true,
	// gap: '2',
	// height: '400px',
	// hideDetails: true,
	// hint: 'yo',
	// ? Not allowed - href //
	// href: '',
	// icon: '$vuetify',
	// id: 'buttonField-id',
	label: 'Button Field Question',
	// loading: true,
	// maxErrors: 1,
	// maxHeight: '100px',
	// maxWidth: '100px',
	// messages: 'Msg',
	// messages: ['Msg 1', 'Msg 2'],
	// minHeight: '800px',
	// minWidth: '300px',
	multiple: true,
	name: 'buttonField',
	options: [
		{
			// class: 'text-h5',
			// icon: 'mdi:mdi-cog',
			// id: 'yes-id',
			label: 'Yes',
			// prependIcon: 'mdi:mdi-cog',
			value: 'yes',
			variant: 'filled',
		},
		{
			// appendIcon: 'mdi:mdi-circle',
			// icon: 'mdi:mdi-circle',
			// id: 'no-id',
			// label: 'foo <br /> bar',
			label: 'No',
			// prependIcon: 'mdi:mdi-circle',
			value: 'no',
		},
		{
			// icon: 'mdi:mdi-square',
			label: 'Maybe',
			value: 'maybe',
		},
		{
			// icon: 'mdi:mdi-triangle',
			label: 'Sure',
			value: 'sure',
		},
	],
	// persistentHint: true,
	// prependIcon: '$vuetify',
	// readonly: true,
	required: true,
	// ripple: false,
	// rounded: true,
	// selectedClass: 'selected-foo',
	// size: 'large',
	// slim: false,
	// stacked: true,
	// symbol: true,
	// tag: 'a',
	// text: 'foo',
	// theme: 'light',
	// tile: true,
	type: 'buttons' as const,
	// validateOn: 'change',
	// value: 'yes',
	// variant: 'outlined',
	// width: '500px',
};

// & ------------------------- Switch //
const switchProps = {
	...testFields.switch,
	type: 'switch' as const,
};

// & ------------------------- Field Slots //
const customSlots = [
	{
		label: 'Slot Field',
		name: 'slotField',
		required: true,
		type: 'field',
	},
];


// ~ -------------------------------------------------- Examples //
// & ------------------------- All Fields Example //
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

		customBar: null,
		desc: 'Hello World',
		email: null,
		file: null,
		name: null,
		// radio: 'option1',
		radio: null,
		// radioMultiple: ['option1', 'option3'],
		// selectField: null,
		selectField: 'foo',
		slotField: null,
		switchQuestion: true,
		// switchQuestion: 'yes',
	},
	formSettings: {
		fieldColumns: {
			lg: 12,
			md: 6,
			sm: 12,
			xl: 6,
		},
		// headerTooltips: true,
		jumpAhead: true,
		summaryColumns: { sm: 6 },
		// tooltipLocation: 'bottom',
		// tooltipTransition: 'fab-transition',
		title: 'All Fields Example',
	},
	pages: [
		{
			fields: [
				{ ...textFieldProps },
				{ ...fileInputProps },
				{ ...textFieldEmailProps },
				{ ...textFieldNumberProps },
				{ ...textFieldPasswordProps },
				{ ...textFieldUrlProps },
				{ ...textFieldPhoneProps },
				{ ...textareaProps },
				{ ...selectProps },
				{ ...selectMultipleProps },
			],
			title: 'Common Fields',
		},
		{
			fields: [
				{ ...autocompleteProps },
				{ ...comboboxProps },
				{ ...colorFieldProps },

			],
			title: 'Less Common Fields',
		},
		{
			fields: [
				{ ...checkboxMultipleProps },
				{ ...checkboxSingleProps },
				{ ...buttonFieldProps },
				{ ...radioProps },
				{ ...switchProps },
			],
			title: 'Radio/Checkbox/Switch Fields',
		},
		{
			fields: [
				...customSlots,
			],
			title: 'Slot Fields',
		},
		{
			isSummary: true,
			text: 'Here\'s the data you\'ve entered. Feel free to review it.',
			title: 'Summary',
		},
	],
	validation: yupObject({
		// firstName: yupString().required(isRequired('First Name')),
		// autocomplete: yupString().required(isRequired('Autocomplete')),
		// buttonField: yupString().required(isRequired('Button Field')),
		// checkboxMultiple: yupArray().required(isRequired('Checkbox Multiple'))
		// 	.min(1, 'Must select at least ${min} option.'),
		// // .matches(/(^false)/, 'Checkbox must be not false'),
		// color: yupString().required(isRequired('Color')),
		// combobox: yupArray().required(isRequired('Combobox'))
		// 	.length(1, 'Must select at least ${length} option.'),
		// slotField: yupString().required(isRequired('Custom Foo')),
		// customBar: yupString().required(isRequired('Custom Bar')),
		// desc: yupString().required(isRequired('Description')),
		// email: yupString().email('Must be a valid Email').required(isRequired('Email')),
		// file: yupString().required(isRequired('File')),
		// name: yupString().required(isRequired('Name')),
		// number: yupNumber().required(isRequired('Number')),
		// password: yupString().required(isRequired('Password'))
		// 	.length(4, 'Password must have at least ${length} characters.'),
		// radio: yupString().required(isRequired('Radio')),
		// selectField: yupString().required(isRequired('Select Field')),
		// switchQuestion: yupString().required(isRequired('Switch Question')),
		// tel: yupString().required(isRequired('Phone')),
		// url: yupString().required(isRequired('URL')).url('Must be a valid URL'),
		// slotField: yupString().required(isRequired('Slot Field')),
	}),
	validationZod: toTypedSchema(zod.object({
		autocomplete: zod.array(zod.string(), { message: isRequired('Autocomplete') })
			.min(1, { message: isRequired('Autocomplete') }),
		checkboxMultiple: zod.array(zod.string({ message: isRequired('Checkbox Multiple') }))
			.min(2, { message: 'Must select at least 2 options' }),
		color: zod.string({ message: isRequired('Color') }).min(1, { message: isRequired('Color') }),
		combobox: zod.array(zod.object({
			label: zod.string().min(1, { message: 'Label cannot be empty' }).optional(),
			value: zod.string().min(1, { message: 'Value cannot be empty' }),
		}), { message: isRequired('Combobox') })
			.min(1, { message: 'Must select at least 1 option' }),
		desc: zod.string({ required_error: isRequired('Description') })
			.min(1, { message: isRequired('Description') }),
		email: zod.string({ message: isRequired('Email') }).email({ message: 'Must be a valid email' }),
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
		slotField: zod.string({ message: isRequired('Slot Field') }),
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

// & ------------------------- Conditional Page Example //
const conditionalPageExample = reactive({
	answers: {
		aConditional: null,
		bConditional: null,
		cConditional: null,
		conditionalParent: null,
		fooQuestion: null,
	},
	formSettings: {
		title: 'Conditional Page Example',
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

// & v Conditional Field Example //
const conditionalExample = reactive({
	answers: {
		aConditional: null,
		bConditional: null,
		cConditional: null,
		conditionalParent: null,
		fooQuestion: null,
	},
	formSettings: {
		title: 'Conditional Field Example',
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
				},
				{
					label: 'A Conditional',
					name: 'aConditional',
					type: 'text' as const,
					when: (answers: any) => {
						return answers?.conditionalParent === 'a';
					},
					whenParentName: 'conditionalParent',
				},
				{
					label: 'B Conditional',
					name: 'bConditional',
					type: 'text' as const,
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


// ~ -------------------------------------------------- Playground Specific Stuff //
function isRequired(field: string) {
	return `The ${field} field is required`;
}

const formAnswers = reactive({
	allFields: { ...allFieldsExample.answers, ...DATA.answers },
	conditionalField: { ...conditionalExample.answers, ...DATA.answers },
	conditionalPage: { ...conditionalPageExample.answers, ...DATA.answers },
});

const formPages = {
	allFields: allFieldsExample.pages,
	conditionalField: conditionalExample.pages,
	conditionalPage: conditionalPageExample.pages,
};

const formSchemas = {
	allFields: allFieldsExample.validation,
	conditionalField: conditionalExample.validation,
	conditionalPage: conditionalPageExample.validation,
};

const formFormSettings = {
	allFields: allFieldsExample.formSettings,
	conditionalField: conditionalExample.formSettings,
	conditionalPage: conditionalPageExample.formSettings,
};

const attributes = {
	// class: 'my-custom-form-class',
	// 'data-foo': 'foobar',
};

function submitForm(): void {
	dialog.value = true;
}

provide('codeBlockSettings', {
	plugin: 'prismjs',
	theme: 'neon-bunny',
});

// ~ -------------------------------------------------- Form Settings //
const formSettings = reactive({
	...formFormSettings[String(answerAndPagesKey)],
	...attributes,
	// ? Custom to VStepperForm - autoPage //
	// autoPage: true,
	// ? Custom to VStepperForm - autoPageDelay //
	// autoPageDelay: 2000,
	// altLabels: true,
	// bgColor: 'secondary',
	// border: 'lg',
	color: 'primary',
	// density: 'default',
	// ? VStepper, VStepperVertical (in labs) - Only horizontal is supported //
	// direction: 'horizontal',
	// disabled: true,
	// editIcon: 'fas fa-pencil',
	// editable: false,
	// elevation: 10,
	// errorIcon: 'fas fa-cog',
	// ? Custom to VStepperForm - fieldColumns //
	// fieldColumns: {
	// 	lg: 12,
	// 	md: 12,
	// 	sm: 12,
	// 	xl: 12,
	// },
	// flat: true,
	// height: '900px',
	// hideActions: true,
	// hideDetails: true,
	// maxHeight: '50px',
	// maxWidth: '50px',
	// minHeight: '900px',
	// minWidth: '900px',
	// ? Custom to VStepperForm - navButtonSize //
	// navButtonSize: 'small',
	// nextText: 'hop back',
	pages: formPages[String(answerAndPagesKey)],
	// prevText: 'hop forward',
	// rounded: 'pill',
	// selectedClass: 'foobar',
	// ? Custom to VStepperForm - summaryColumns - PageReviewContainer //
	// summaryColumns: { sm: 6 },												// * Custom, PageReviewContainer
	// tag: 'div',
	// theme: 'light',
	// tile: true,
	// transition: 'fade-transition',										// * VStepperWindowItemProps
	validateOn: 'blur' as const,
	// ? VeeValidate Prop //
	// validateOnMount: true,
	validationSchema: formSchemas[String(answerAndPagesKey)],
	// variant: 'outlined',
	// width: '50px',
});
</script>

<style lang="scss" scoped></style>
