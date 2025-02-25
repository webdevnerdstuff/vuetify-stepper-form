<template>
	<VStepperForm
		v-model="answers"
		:pages="pages"
		:validationSchema="validationSchema"
		@submit="submitForm"
	>
	</VStepperForm>

	<v-container>
		<VCodeBlock
			class="mt-4 mb-2"
			:code="JSON.stringify(answers, null, 2)"
			label="Answers"
			lang="javascript"
			prismjs
		/>
	</v-container>
</template>

<script setup lang="ts">
import type { MaybeRef } from 'vue';
import { VCodeBlock } from '@wdns/vue-code-block';
import {
	object as yupObject,
	string as yupString,
} from 'yup';


const answers = ref<{
	animal: string | null;
	name: string | null;
	slug: string | null;
}>({
	animal: null,
	name: null,
	slug: null,
});

const fooItems = [
	{
		title: 'Foo',
		value: 'foo',
	},
	{
		title: 'Fiz',
		value: 'fiz',
	},
];

const barItems = [
	{
		title: 'Baz',
		value: 'baz',
	},
	{
		title: 'Biz',
		value: 'biz',
	},
];

const selectItems = ref(fooItems);

const pages = computed(() => {
	return [
		{
			fields: [
				{
					label: 'Name',
					name: 'name',
					type: 'text' as const,
				},
				{
					label: 'Slug',
					name: 'slug',
					type: 'text' as const,
				},
				{
					items: selectItems.value,
					label: 'Foobar',
					name: 'animal',
					type: 'select' as const,
				},
			],
		},
	];
});

const validationSchema = yupObject({
	name: yupString().required('First Name'),
	slug: yupString().required('Slug'),
});

const useSlugifyString: UseSlugifyString = (string, divider = '_') => {
	if (divider !== '_' && divider !== '-') {
		throw new Error('[slugifyStringHelper]: Divider must be either "_" or "-"');
	}

	const unrefString = unref(string);

	const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/-,:;';
	const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
	const p = new RegExp(a.split('').join('|'), 'g');

	let response = unrefString.toString().toLowerCase()
		// Replace spaces with divider //
		.replace(/\s+/g, divider)
		.replace(p, (c) => b.charAt(a.indexOf(c)))
		.replace(/&/g, `${divider}and${divider}`)
		.replace(/[^\w-]+/g, '');

	if (divider === '_') {
		response = response.replace(/-+/g, '_')
			.replace(/__+/g, '_')
			.replace(/^_/, '')
			.replace(/^-+/, '')
			.replace(/-+$/, '');
	}

	if (divider === '-') {
		response = response.replace(/_+/g, '-')
			.replace(/--+/g, '-')
			.replace(/^-/, '')
			.replace(/^_+/, '')
			.replace(/_+$/, '');
	}

	return response;
};

watch(() => answers.value.name, (newVal) => {
	if (answers.value.slug === 'foo' || answers.value.slug === '') {
		selectItems.value = fooItems;
	}

	if (answers.value.slug === 'bar') {
		selectItems.value = barItems;
	}

	setTimeout(() => {
		answers.value.slug = newVal ? useSlugifyString(newVal) : '';
	}, 1);
});


export interface UseSlugifyString {
	(
		string: MaybeRef<string>,
		divider?: string,
	): string;
};

function submitForm() {
	console.log('submitForm', answers.value);
}
</script>

<style lang="scss" scoped></style>
