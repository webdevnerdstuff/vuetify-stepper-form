<template>
	<VStepperForm
		v-model="answers"
		:pages="pages"
		@submit="submitForm"
	/>

	<AnswersDialog
		v-model="dialog"
		:answers="answers"
	/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AnswersDialog from '../AnswersDialog.vue';


const dialog = ref(false);
const answers = ref({
	bar: null,
	conditionalParent: null,
	foo: null,
	qux: null,
});

const pages = [
	{
		fields: [
			{
				clearable: true,
				items: [
					{
						title: 'Foo',
						value: 'foo',
					},
					{
						title: 'Bar',
						value: 'bar',
					},
					{
						title: 'Qux',
						value: 'qux',
					},
				],
				label: 'Select Option',
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
				label: 'Foo',
				name: 'foo',
				type: 'text' as const,
				variant: 'outlined',
			},
		],
		title: 'Foo Page',
		when: (answers: any) => {
			return answers?.conditionalParent === 'foo';
		},
	},
	{
		fields: [
			{
				label: 'Bar',
				name: 'bar',
				type: 'text' as const,
				variant: 'outlined',
			},
		],
		title: 'Bar Page',
		when: (answers: any) => {
			return answers?.conditionalParent === 'bar';
		},
	},
	{
		fields: [
			{
				label: 'Qux',
				name: 'qux',
				type: 'text' as const,
				variant: 'outlined',
			},
		],
		title: 'Qux Page',
		when: (answers: any) => {
			return answers?.conditionalParent === 'qux';
		},
	},
];

function submitForm(): void {
	dialog.value = true;
}

const templateCode = `<template>
  <VStepperForm
    v-model="answers"
    :pages="pages"
    @submit="submitForm"
  />
</template>
`;

const scriptCode = `\<script setup\>
import { ref } from 'vue';


const answers = ref({
  bar: null,
  conditionalParent: null,
  foo: null,
  qux: null,
});

const pages = [
  {
    fields: [
      {
        clearable: true,
        items: [
          {
            title: 'Foo',
            value: 'foo',
          },
          {
            title: 'Bar',
            value: 'bar',
          },
          {
            title: 'Qux',
            value: 'qux',
          },
        ],
        label: 'Select Option',
        name: 'conditionalParent',
        type: 'select',
        variant: 'outlined',
      },
    ],
    title: 'Page 1',
  },
  {
    fields: [
      {
        label: 'Foo',
        name: 'foo',
        type: 'text',
        variant: 'outlined',
      },
    ],
    title: 'Foo Page',
    when: (answers: any) => {
      return answers?.conditionalParent === 'foo';
    },
  },
  {
    fields: [
      {
        label: 'Bar',
        name: 'bar',
        type: 'text',
        variant: 'outlined',
      },
    ],
    title: 'Bar Page',
    when: (answers: any) => {
      return answers?.conditionalParent === 'bar';
    },
  },
  {
    fields: [
      {
        label: 'Qux',
        name: 'qux',
        type: 'text',
        variant: 'outlined',
      },
    ],
    title: 'Qux Page',
    when: (answers: any) => {
      return answers?.conditionalParent === 'qux';
    },
  },
];

function submitForm() {
  // ...do something awesome
}
\</script\>`;

defineExpose({
	exampleCode: {
		desc: 'The <code class="ic">when</code> prop in both Page and Field components enables dynamic visibility based on specific conditions. For Page, the <code class="ic">when</code> prop controls page visibility by evaluating a condition, displaying the page only when the condition is met. Similarly, for Field, the <code class="ic">when</code> prop manages field visibility, showing the field only when its condition is satisfied.',
		name: 'Conditional Fields',
		script: scriptCode,
		template: templateCode,
	},
});
</script>


<style lang="scss" scoped></style>
