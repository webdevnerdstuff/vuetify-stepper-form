import {
	array as yupArray,
	number as yupNumber,
	string as yupString,
	object as yupObject,
} from 'yup';


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

function isRequired(field: string) {
	return `${field} is required`;
}


export {
	answers,
	finalAnswer,
	items,
	validationSchema,
};
