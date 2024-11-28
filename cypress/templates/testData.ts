import {
	array as yupArray,
	number as yupNumber,
	string as yupString,
	object as yupObject,
} from 'yup';
import { useDeepMerge } from '../../src/plugin/composables/helpers';
import { pluginOptionsInjectionKey } from '../../src/plugin/utils/globals';


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Shared //
const items = [
	{ title: 'Bear', value: 'bear' },
	{ title: 'Bearded Dragon', value: 'bearded-dragon' },
	{ title: 'Budgie', value: 'budgie' },
	{ title: 'Bulldog', value: 'bulldog' },
	{ title: 'Cat', value: 'cat' },
	{ title: 'Chicken', value: 'chicken' },
	{ title: 'Chinchilla', value: 'chinchilla' },
	{ title: 'Cobra', value: 'cobra' },
	{ title: 'Cockatiel', value: 'cockatiel' },
	{ title: 'Cow', value: 'cow' },
	{ title: 'Dog', value: 'dog' },
	{ title: 'Donkey', value: 'donkey' },
	{ title: 'Dragon', value: 'dragon' },
	{ title: 'Duck', value: 'duck' },
	{ title: 'Eagle', value: 'eagle' },
	{ title: 'Elephant', value: 'elephant' },
	{ title: 'Ferret', value: 'ferret' },
	{ title: 'Fox', value: 'fox' },
	{ title: 'Goat', value: 'goat' },
	{ title: 'Gorilla', value: 'gorilla' },
	{ title: 'Guinea Pig', value: 'guinea-pig' },
	{ title: 'Hamster', value: 'hamster' },
	{ title: 'Horse', value: 'horse' },
	{ title: 'Leopard', value: 'leopard' },
	{ title: 'Lion', value: 'lion' },
	{ title: 'Otter', value: 'otter' },
	{ title: 'Panda', value: 'panda' },
	{ title: 'Parrot', value: 'parrot' },
	{ title: 'Penguin', value: 'penguin' },
	{ title: 'Pig', value: 'pig' },
	{ title: 'Pomeranian', value: 'pomeranian' },
	{ title: 'Poodle', value: 'poodle' },
	{ title: 'Rabbit', value: 'rabbit' },
	{ title: 'Shark', value: 'shark' },
	{ title: 'Sheep', value: 'sheep' },
	{ title: 'Sphynx', value: 'sphynx' },
	{ title: 'Tarantula', value: 'tarantula' },
	{ title: 'Tiger', value: 'tiger' },
	{ title: 'Whale', value: 'whale' },
	{ title: 'Wolf', value: 'wolf' },
];

const defaultFields = {
	firstName: {
		label: 'First Name',
		name: 'firstName',
		type: 'text' as const,
		required: true,
	},
	lastName: {
		label: 'Last Name',
		name: 'lastName',
		type: 'text' as const,
		required: true,
	},
	email: {
		label: 'Email',
		name: 'email',
		type: 'email' as const,
		required: true,
	},
	password: {
		label: 'Password',
		name: 'password',
		type: 'password' as const,
		required: true,
	},
	phone: {
		label: 'Phone',
		name: 'phone',
		type: 'tel' as const,
		required: true,
	},
	url: {
		label: 'URL',
		name: 'url',
		type: 'url' as const,
		required: true,
	},
	number: {
		label: 'Number',
		name: 'number',
		type: 'number' as const,
		required: true,
	},
	select: {
		items,
		label: 'Select Animal',
		name: 'selectAnimal',
		type: 'select' as const,
		required: true,
	},
	selectMultiple: {
		chips: true,
		items,
		itemValue: 'value',
		label: 'Select Multiple Animals',
		multiple: true,
		name: 'selectsMultipleAnimals',
		type: 'select' as const,
		required: true,
	},
	textarea: {
		label: 'Description',
		name: 'description',
		type: 'textarea' as const,
		required: true,
	},
	autocomplete: {
		items,
		label: 'Autocomplete Animal',
		name: 'autocompleteAnimal',
		type: 'autocomplete' as const,
		required: true,
	},
	autocompleteMultiple: {
		chips: true,
		clearOnSelect: true,
		items,
		label: 'Autocomplete Multiple Animal',
		multiple: true,
		name: 'autoCompleteMultipleAnimals',
		type: 'autocomplete' as const,
		required: true,
	},
	combobox: {
		chips: true,
		clearable: true,
		items: items,
		label: 'Combobox Question',
		multiple: true,
		name: 'combobox',
		placeholder: 'Select an item',
		type: 'combobox' as const,
		variant: 'outlined',
	},
	color: {
		label: 'Color',
		name: 'color',
		pip: true,
		type: 'color' as const,
	},
	date: {
		label: 'Date',
		name: 'date',
		pip: true,
		type: 'date' as const,
	},
	checkbox: {
		label: 'Checkbox Single',
		name: 'isThisBoxChecked',
		type: 'checkbox' as const,
		trueValue: 'yes',
		required: true,
	},
	checkboxMultiple: {
		inline: true,
		label: 'Checkbox Multiple',
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
		type: 'checkbox' as const,
		required: true,
	},
	radio: {
		label: 'Radio Single',
		name: 'isSingleRadioSelected',
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
		],
		type: 'radio' as const,
		trueValue: 'yes',
		required: true,
	},
	switch: {
		label: 'Switch Question',
		falseValue: 'no',
		name: 'switchQuestion',
		trueValue: 'yes',
		type: 'switch' as const,
	},
	hidden: {
		name: 'hidden',
		type: 'hidden' as const,
	},
	address: {
		label: 'Address',
		name: 'address',
		type: 'text' as const,
	},
	city: {
		label: 'City',
		name: 'city',
		type: 'text' as const,
	},
	zipcode: {
		label: 'Zipcode',
		name: 'zipcode',
		type: 'number' as const,
	},
};

function isRequired(field: string) {
	return `${field} is required`;
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ VStepperForm.cy.ts //

// & ------------------------- Stepper Form //
const stepperProps = {
	altLabels: true,
	autoPage: true,
	autoPageDelay: 3000,
	bgColor: 'secondary',
	border: 'lg',
	color: 'primary',
	density: 'default' as const,
	disabled: false,
	editIcon: 'fas fa-pencil',
	editable: false,
	elevation: 10,
	errorIcon: 'fas fa-cog',
	fieldColumns: {
		lg: 12,
		md: 12,
		sm: 12,
		xl: 12,
	},
	flat: true,
	headerTooltips: true,
	height: '900px',
	hideActions: true,
	hideDetails: true,
	keepValuesOnUnmount: false,
	maxHeight: '50px',
	maxWidth: '50px',
	minHeight: '900px',
	minWidth: '900px',
	nextText: 'hop forward',
	prevText: 'hop backwards',
	rounded: 'pill',
	selectedClass: 'bunnies',
	summaryColumns: { sm: 6 },
	tag: 'div',
	theme: 'light',
	tile: true,
	tooltipLocation: 'end' as const,
	tooltipOffset: 10,
	tooltipTransition: 'fade-transition',
	transition: 'fade-transition',
	validateOn: 'blur' as const,
	validateOnMount: true,
	variant: 'outlined',
};

const answers = {
	// ? ------------------------- Common Fields //
	firstName: null,
	lastName: null,
	email: null,
	password: null,
	phone: null,
	url: null,
	number: null,
	selectAnimal: null,
	selectsMultipleAnimals: null,
	description: null,
	// hidden: "I'm a hidden field answer",

	// ? ------------------------- Less Common Fields //
	autocompleteAnimal: null,
	autoCompleteMultipleAnimals: null,
	color: null,
	// date: null,
	// file: null,

	// ? ------------------------- Radio/Checkbox/Switch Fields //
	isThisBoxChecked: null,
	checkboxMultiple: null,
	isSingleRadioSelected: null,
	switchQuestion: null,
	// buttonField: [],

	// ? ------------------------- Slot Fields //
	// customFoo: null,
	// customBar: null,

};

const finalAnswer = {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Common Fields Page //
	firstName: 'Bunny',
	lastName: 'Rabbit',
	email: 'test@test.com',
	password: '7#L%W^7FC*8W#Xt7LvZCHU$%^Sxn&*PjUo',
	phone: '555-555-5555',
	url: 'https://test.com',
	number: '100',
	selectAnimal: 'rabbit',
	selectsMultipleAnimals: ['rabbit', 'duck'],
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec pur',
	// hidden: "I'm a hidden field answer",

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Less Common Fields Page //
	autocompleteAnimal: 'rabbit',
	autoCompleteMultipleAnimals: ['rabbit', 'duck'],
	combobox: [{ title: "Rabbit", value: "rabbit" }, { title: "Duck", value: "duck" }],
	color: '#804040',
	// date: 'Wed May 25 1977 00:00:00 GMT-0700 (Pacific Daylight Time)',
	// date: new Date('05/25/1977'),

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Radio/Checkbox/Switch Fields Page //
	isThisBoxChecked: 'yes',
	checkboxMultiple: ['option1', 'option3'],
	isSingleRadioSelected: 'yes',
	switchQuestion: 'yes',
};

const validationSchema = yupObject({
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Common Fields Page //
	firstName: yupString().required(isRequired('First Name')),
	lastName: yupString().required(isRequired('Last Name')),
	email: yupString().email('Must be a valid Email').required(isRequired('Email')),
	password: yupString().required(isRequired('Password'))
		.min(5, 'Password must have at least ${min} characters'),
	phone: yupString().required(isRequired('Phone')),
	url: yupString().required(isRequired('URL'))
		.url('Must be a valid URL'),
	number: yupNumber().required(isRequired('Number'))
		.min(Number(finalAnswer.number), 'Number must be at least ${min}'),
	description: yupString().required(isRequired('Description')),
	selectAnimal: yupString().required(isRequired('Select Animal')),
	selectsMultipleAnimals: yupArray().required(isRequired('Select Multiple Animals')),

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Less Common Fields Page //
	autocompleteAnimal: yupString().required(isRequired('Autocomplete Animal')),
	autoCompleteMultipleAnimals: yupArray().required(isRequired('Autocomplete Multiple Animal')),
	combobox: yupArray().required(isRequired('Combobox'))
		.min(2, 'Must select at least ${min} options'),
	color: yupString().required(isRequired('Color')),
	// date: yupString().required(isRequired('Date')),

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Radio/Checkbox/Switch Fields Page //
	isThisBoxChecked: yupString().required(isRequired('Checkbox Single')),
	checkboxMultiple: yupArray().required(isRequired('Checkbox Multiple'))
		.min(2, 'Must select at least ${min} options'),
	isSingleRadioSelected: yupString().required(isRequired('Radio Single'))
		.matches(/(yes|no)/, 'Only "yes" or "no" is allowed'),
	switchQuestion: yupString().required(isRequired('Switch Question'))
		.matches(/(yes)/, 'Only "yes" is allowed'),

	// buttonField: yupArray().required(isRequired('Button Field')),
	// buttonField: yupString().required(isRequired('Button Field')).matches(/(yes|no)/, 'Only "yes" or "no" is allowed'),
	// 	.matches(/(^true)/, isRequired('Checkbox Single')),
	// .matches(/(^false)/, 'Checkbox must be not false'),

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Slot Fields Page //
	// customFoo: yupString().required(isRequired('Custom Foo')),
	// customBar: yupString().required(isRequired('Custom Bar')),
});


// & ------------------------- Field Columns //
const fieldColumnsPagesPageColumns = { lg: 8, md: 10, sm: 12, xl: 6 };
const fieldColumnsPages = [
	{
		fields: [defaultFields.firstName],
		title: 'Page 1',
	},
	{
		fields: [
			defaultFields.lastName,
			defaultFields.email,
		],
		pageFieldColumns: fieldColumnsPagesPageColumns,
		title: 'Page 2',
	},
	{
		fields: [
			{
				...defaultFields.address,
				columns: { lg: 4, md: 4, sm: 4, xl: 4 },
			},
			{
				...defaultFields.city,
				columns: { lg: 6, md: 6, sm: 6, xl: 6 },
			},
			{
				...defaultFields.zipcode,
				columns: { lg: 2, md: 2, sm: 2, xl: 2 },
			},
		],
		title: 'Page 3',
	},
	{
		isSummary: true,
		title: 'Summary',
	}
];


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ VSFButtonField.cy.ts //
const baseOptions = [
	{
		class: 'flower-class',
		id: 'flower-id',
		label: 'Flower',
		value: 'flower',
	},
	{
		class: 'cookie-class',
		id: 'cookie-id',
		label: 'Cookie',
		value: 'cookie',
	},
	{
		class: 'coffee-class',
		id: 'coffee-id',
		label: 'Coffee',
		value: 'coffee',
	},
	{
		class: 'heart-class',
		id: 'heart-id',
		label: 'Heart',
		value: 'heart',
	},
];

const buttonFieldOptions = {
	aligns: [
		'start',
		'left',
		'center',
		'end',
		'right',
		'space-between',
		'space-around',
		'space-evenly',
	],
	borders: [
		'xs',
		'sm',
		'md',
		'lg',
		'xl',
	],
	colors: [
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'error',
	],
	densities: [
		'compact',
		'comfortable',
		'default',
		'expanded',
		'oversized',
	],
	options: {
		animals: [
			{
				appendIcon: 'mdi:mdi-rabbit',
				color: 'white',
				label: 'Bunnies',
				prependIcon: 'mdi:mdi-rabbit',
				value: 'bunnies',
			},
			{
				appendIcon: 'mdi:mdi-tortoise',
				color: 'success',
				label: 'Turtles',
				prependIcon: 'mdi:mdi-tortoise',
				value: 'turtles',
			},
			{
				appendIcon: 'mdi:mdi-duck',
				color: 'yellow',
				label: 'duck',
				prependIcon: 'mdi:mdi-duck',
				value: 'duck',
			},
		],
		basic: baseOptions,
		colors: useDeepMerge(baseOptions, [
			{ color: 'primary' },
			{ color: 'secondary' },
			{ color: 'success' },
			{ color: 'info' },
		]),
		heightAndWidth: useDeepMerge(baseOptions, [
			{ height: '125', width: '100' },
			{ height: '175', width: '150' },
			{ height: '225', width: '200' },
			{ height: '275', width: '250' },
		]),
		minHeightAndWidth: useDeepMerge(baseOptions, [
			{ height: '100', minHeight: '125', minWidth: '125', width: '100' },
			{ height: '150', minHeight: '175', minWidth: '175', width: '150' },
			{ height: '200', minHeight: '225', minWidth: '225', width: '200' },
			{ height: '250', minHeight: '275', minWidth: '275', width: '250' },
		]),
		maxHeightAndWidth: useDeepMerge(baseOptions, [
			{ height: '125', maxHeight: '100', maxWidth: '100', width: '125' },
			{ height: '175', maxHeight: '150', maxWidth: '150', width: '175' },
			{ height: '225', maxHeight: '200', maxWidth: '200', width: '225' },
			{ height: '275', maxHeight: '250', maxWidth: '250', width: '275' },
		]),
		icon: useDeepMerge(baseOptions, [
			{ icon: 'mdi:mdi-flower' },
			{ icon: 'mdi:mdi-cookie' },
			{ icon: 'mdi:mdi-coffee' },
			{ icon: 'mdi:mdi-heart' },
		]),
		appendPrependIcon: useDeepMerge(baseOptions, [
			{ appendIcon: 'mdi:mdi-flower', prependIcon: 'mdi:mdi-flower-outline' },
			{ appendIcon: 'mdi:mdi-cookie', prependIcon: 'mdi:mdi-cookie-outline' },
			{ appendIcon: 'mdi:mdi-coffee', prependIcon: 'mdi:mdi-coffee-outline' },
			{ appendIcon: 'mdi:mdi-heart', prependIcon: 'mdi:mdi-heart-outline' },
		]),
	},
	rounded: [
		'0',
		'xs',
		'sm',
		'md',
		'lg',
		'xl',
		'pill',
		'circle',
		'shaped',
	],
	sizes: [
		'x-small',
		'small',
		'default',
		'large',
		'x-large',
	],
	variants: ['text', 'elevated', 'tonal', 'outlined', 'plain'],
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Navigation //
const navigationTest = {
	answers: {
		firstName: null,
		lastName: null,
		email: null,
		url: null,
	},
	global: {
		provide: {
			[pluginOptionsInjectionKey]: {
				color: 'primary',
				validateOn: 'blur',
				variant: 'outlined',
			},
		},
	},
	pages: [
		{
			editable: true,
			fields: [
				defaultFields.firstName,
			],
			title: 'Page 1',
		},
		{
			editable: true,
			fields: [
				defaultFields.lastName,
			],
			title: 'Page 2',
		},
		{
			editable: true,
			fields: [
				defaultFields.email,
			],
			title: 'Page 3',
		},
		{
			editable: true,
			fields: [
				defaultFields.url,
			],
			title: 'Page 4',
		},
		// {
		// 	editable: true,
		// 	fields: [
		// 		defaultFields.password,
		// 	],
		// 	title: 'Page 5',
		// },
		{
			editable: true,
			isSummary: true,
			title: 'Summary',
		},
	]
};


export {
	answers,
	buttonFieldOptions,
	defaultFields,
	fieldColumnsPages,
	fieldColumnsPagesPageColumns,
	finalAnswer,
	isRequired,
	items,
	navigationTest,
	stepperProps,
	validationSchema,
};
