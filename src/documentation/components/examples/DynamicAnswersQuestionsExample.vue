<template>
	<VStepperForm
		v-model="answers"
		color="primary"
		:pages="pages"
		@submit="submitForm"
	/>

	<AnswersDialog
		v-model="dialog"
		:answers="answers"
	/>
</template>

<script setup lang="ts">
import type { MaybeRef } from 'vue';
import AnswersDialog from '../AnswersDialog.vue';


const dialog = ref(false);
const answers = ref<{
	foobar: string | null;
	name: string | null;
	slug: string | null;
}>({
	foobar: null,
	name: null,
	slug: null,
});

watch(() => answers.value.name, (newVal) => {
	setTimeout(() => {
		answers.value.slug = newVal ? useSlugifyString(newVal) : '';
	}, 1);

	if (newVal === 'foo' || answers.value.slug === '') {
		selectItems.value = fooItems;
	}

	if (newVal === 'bar') {
		selectItems.value = barItems;
	}
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
					name: 'foobar',
					type: 'select' as const,
				},
			],
		},
	];
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

export interface UseSlugifyString {
	(
		string: MaybeRef<string>,
		divider?: string,
	): string;
};

function submitForm(): void {
	dialog.value = true;
}

const templateCode = computed(() => (
	`<template>
  <VStepperForm
    v-model="answers"
    color="primary"
    :pages="pages"
    @submit="submitForm"
  />
</template>`
));

const scriptCode = computed(() => (
	`\<script setup\>
const answers = ref<{
  foobar: string | null;
  name: string | null;
  slug: string | null;
}>({
  foobar: null,
  name: null,
  slug: null,
});

watch(() => answers.value.name, (newVal) => {
  // Ensure the slug value updates correctly by using a setTimeout //
  setTimeout(() => {
    answers.value.slug = newVal ? useSlugifyString(newVal) : '';
  }, 1);

  if (newVal === 'foo' || answers.value.slug === '') {
    selectItems.value = fooItems;
  }

  if (newVal === 'bar') {
    selectItems.value = barItems;
  }
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
          name: 'foobar',
          type: 'select' as const,
        },
      ],
    },
  ];
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
    .replace(/&/g, \`$\{divider}and$\{divider}\`)
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

export interface UseSlugifyString {
  (
    string: MaybeRef<string>,
    divider?: string,
  ): string;
};
\</script\>`
));

const exampleCode = computed(() => ({
	desc: 'This example showcases how to build a form with dynamic questions and responses. When you enter "foo" or "bar" in the name field, the select field updates automatically.<br /><br />To ensure the "slug" value updates correctly, use a setTimeout function within the watcher to modify its value after the name field changes.',
	name: 'Dynamic Answers and Questions',
	script: scriptCode.value,
	template: templateCode.value,
}));

defineExpose({
	exampleCode: exampleCode.value,
});
</script>


<style lang="scss" scoped></style>
