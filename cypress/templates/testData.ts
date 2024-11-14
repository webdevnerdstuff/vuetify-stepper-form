import {
	array as yupArray,
	number as yupNumber,
	string as yupString,
	object as yupObject,
} from 'yup';
import { useDeepMerge } from '../../src/plugin/composables/helpers';
import { max } from 'cypress/types/lodash';


const answers = {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Page 1 //
	firstName: null,
	lastName: null,
	email: null,
	password: null,
	phone: null,
	url: null,
	number: null,
	selectAnimal: null,
	selectsMultipleAnimals: null,
	autocompleteAnimal: null,
	autoCompleteMultipleAnimals: null,
	description: null,

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Page 2 //
	isThisBoxChecked: null,
	checkboxMultiple: null,
	isSingleRadioSelected: null,
	switchQuestion: null,
	// autocomplete: undefined,
	// autocomplete: 'foo',
	// buttonField: [],
	// color: '#ff0000',
	// combobox: null,
	// combobox: 'Foo',
	// combobox: 'foo',
	// combobox: null,
	// combobox: { title: 'Foo', value: 'foo' },
	// customFoo: null,
	// customBar: null,
	// file: null,
	// radioMultiple: ['option1', 'option3'],
	// selectField: null,
	// selectField: 'foo',
};

const finalAnswer = {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Page 1 //
	firstName: 'Bunny',
	lastName: 'Rabbit',
	email: 'test@test.com',
	password: 'password1',
	phone: '555-555-5555',
	url: 'https://test.com',
	number: 100,
	selectAnimal: 'rabbit',
	selectsMultipleAnimals: ['rabbit', 'duck'],
	autocompleteAnimal: 'rabbit',
	autoCompleteMultipleAnimals: ['rabbit', 'duck'],
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec pur',

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Page 2 //
	isThisBoxChecked: 'yes',
	checkboxMultiple: ['option1', 'option3'],
	isSingleRadioSelected: 'yes',
	switchQuestion: 'yes',
};

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

const validationSchema = yupObject({
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Page 1 //
	firstName: yupString().required(isRequired('First Name')),
	lastName: yupString().required(isRequired('Last Name')),
	email: yupString().email('Must be a valid Email').required(isRequired('Email')),
	password: yupString().required(isRequired('Password'))
		.min(5, 'Password must have at least ${min} characters'),
	phone: yupString().required(isRequired('Phone')),
	url: yupString().required(isRequired('URL'))
		.url('Must be a valid URL'),
	number: yupNumber().required(isRequired('Number'))
		.min(finalAnswer.number, 'Number must be at least ${min}'),
	description: yupString().required(isRequired('Description')),
	selectAnimal: yupString().required(isRequired('Select Animal')),
	selectsMultipleAnimals: yupArray().required(isRequired('Select Multiple Animals')),
	autocompleteAnimal: yupString().required(isRequired('Autocomplete Animal')),
	autoCompleteMultipleAnimals: yupArray().required(isRequired('Autocomplete Multiple Animal')),

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Page 2 //
	isThisBoxChecked: yupString().required(isRequired('Checkbox Single')),
	checkboxMultiple: yupArray().required(isRequired('Checkbox Multiple'))
		.min(2, 'Must select at least ${min} options'),
	isSingleRadioSelected: yupString().required(isRequired('Radio Single'))
		.matches(/(yes|no)/, 'Only "yes" or "no" is allowed'),
	switchQuestion: yupString().required(isRequired('Switch Question'))
		.matches(/(yes)/, 'Only "yes" is allowed'),

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	// autocomplete: yupString().required(isRequired('Autocomplete')),
	// autocomplete: yupArray().required(isRequired('Autocomplete')),
	// buttonField: yupArray().required(isRequired('Button Field')),
	// buttonField: yupString().required(isRequired('Button Field')).matches(/(yes|no)/, 'Only "yes" or "no" is allowed'),
	// 	.matches(/(^true)/, isRequired('Checkbox Single')),
	// .matches(/(^false)/, 'Checkbox must be not false'),
	// color: yupString().required(isRequired('Color')),
	// combobox: yupArray().required(isRequired('Combobox'))
	// 	.length(1, 'Must select at least ${length} option.'),
	// customFoo: yupString().required(isRequired('Custom Foo')),
	// customBar: yupString().required(isRequired('Custom Bar')),
	// file: yupString().required(isRequired('File')),
	// selectField: yupString().required(isRequired('Select Field')),
});

const themeColors = [
	'primary',
	'secondary',
	'success',
	'info',
	'warning',
	'error',
];

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
	variants: ['text', 'elevated', 'tonal', 'outlined', 'plain'],
};

function isRequired(field: string) {
	return `${field} is required`;
}


export {
	answers,
	buttonFieldOptions,
	finalAnswer,
	items,
	themeColors,
	validationSchema,
};
