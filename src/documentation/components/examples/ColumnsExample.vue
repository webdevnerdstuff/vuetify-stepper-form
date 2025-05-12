<template>
	<VStepperForm
		v-model="answers"
		:field-columns="{
			sm: 12,
			md: 12,
			lg: 6,
			xl: 6,
		}"
		:pages="pages"
		@submit="submitForm"
	/>

	<AnswersDialog
		v-model="dialog"
		:answers="answers"
	/>
</template>

<script setup lang="ts">
import AnswersDialog from '../AnswersDialog.vue';

interface Props {
	open?: HTMLPreElement | null;
}

defineProps<Props>();

const links = inject<Docs.Links>('links')!;
const dialog = ref(false);

const answers = ref({
	bar: null,
	baz: null,
	biz: null,
	foo: null,
});

const pages = [
	{
		fields: [
			{
				columns: {
					sm: 4,
					xl: 6,
				},
				label: 'Foo',
				name: 'foo',
				type: 'text' as const,
			},
			{
				columns: {
					sm: 4,
					xl: 6,
				},
				label: 'Bar',
				name: 'bar',
				type: 'text' as const,
			},
		],
	},
	{
		fields: [
			{
				label: 'Biz',
				name: 'biz',
				type: 'text' as const,
			},
			{
				label: 'Baz',
				name: 'baz',
				type: 'text' as const,
			},
		],
		pageFieldColumns: {
			lg: 3,
			xl: 3,
		},
	},
];

function submitForm(): void {
	dialog.value = true;
}

const templateCode = `<template>
  <VStepperForm
    v-model="answers"
    :field-columns="{
      sm: 12,
      md: 12,
      lg: 6,
      xl: 6,
    }"
    :pages="pages"
    title="Responsive Columns"
    @submit="submitForm"
  />
</template>
`;

const scriptCode = `\<script setup\>
import { ref } from 'vue';


const answers = ref({
  bar: null,
  baz: null,
  biz: null,
  foo: null,
});

const pages = [
  {
    fields: [
      {
        columns: {
          sm: 4,
          xl: 6,
        },
        label: 'Foo',
        name: 'foo',
        required: true,
        type: 'text',
      },
      {
        columns: {
          sm: 4,
          xl: 6,
        },
        label: 'Bar',
        name: 'bar',
        required: true,
        type: 'text',
      },
    ],
  },
  {
    fields: [
      {
        label: 'Biz',
        name: 'biz',
        required: true,
        type: 'text',
      },
      {
        label: 'Baz',
        name: 'baz',
        required: true,
        type: 'text',
      },
    ],
    pageFieldColumns: {
      lg: 3,
      xl: 3,
    },
  },
];

function submitForm() {
  // ...do something awesome
}
\</script\>`;

defineExpose({
	exampleCode: {
		desc: `This example leverages the Vuetify <a href="${links.vuetify}en/components/grids/" target="_blank" nofollow>Grid System.</a> to create a flexible layout. The <code class="ic">field-columns</code> prop lets you set how many columns each field should occupy across various breakpoints. You can also define <code class="ic">pageFieldColumns</code> specific to each page, while the <code class="ic">columns</code> prop on individual fields enables overrides for the default settings. The hierarchy of column settings is as follows: individual fields take precedence, followed by page-specific settings, and finally, the default field columns.`,
		name: 'Responsive Columns',
		script: scriptCode,
		template: templateCode,
	},
});
</script>


<style lang="scss" scoped></style>
