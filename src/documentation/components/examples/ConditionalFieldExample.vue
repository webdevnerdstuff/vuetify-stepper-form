<template>
	<VStepperForm
		v-model="formAnswers"
		:pages="pages"
		@submit="submitForm"
	/>

	<AnswersDialog
		v-model="dialog"
		:answers="formAnswers"
	/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AnswersDialog from '../AnswersDialog.vue';

interface Props {
	open?: HTMLPreElement | null;
}

defineProps<Props>();

const dialog = ref(false);
const formAnswers = ref({
	bar: null,
	conditionalParent: null,
	foo: null,
});

const pages = [
	{
		fields: [
			{
				inline: true,
				items: [
					{
						title: 'Foo',
						value: 'foo',
					},
					{
						title: 'Bar',
						value: 'bar',
					},
				],
				label: 'Select One',
				name: 'conditionalParent',
				type: 'select' as const,
			},
			{
				label: 'Foo',
				name: 'foo',
				type: 'text' as const,
				when(answers: any) {
					return answers.conditionalParent === 'foo';
				},
			},
			{
				label: 'Bar',
				name: 'bar',
				type: 'text' as const,
				when(answers: any) {
					return answers.conditionalParent === 'bar';
				},
			},
		],
	},
];

function submitForm(): void {
	dialog.value = true;
}

const templateCode = `<template>
  <VStepperForm
    v-model="formAnswers"
    :pages="pages"
    @submit="submitForm"
  />
</template>
`;

const scriptCode = `\<script setup\>
import { ref } from 'vue';


const formAnswers = ref({
  bar: null,
  conditionalParent: null,
  foo: null,
});

const pages = [
  {
    fields: [
      {
        inline: true,
        label: 'Select One',
        name: 'conditionalParent',
        options: [
          {
            label: 'Foo',
            value: 'foo',
          },
          {
            label: 'Bar',
            value: 'bar',
          },
        ],
        type: 'select' as const,
      },
      {
        label: 'Foo',
        name: 'foo',
        type: 'text' as const,
        when(answers) {
          return answers.conditionalParent === 'foo';
        },
      },
      {
        label: 'Bar',
        name: 'bar',
        type: 'text' as const,
        when(answers) {
          return answers.conditionalParent === 'bar';
        },
      },
    ],
  },
];

function submitForm() {
  // ...do something awesome
}
\</script\>`;

defineExpose({
	exampleCode: {
		script: scriptCode,
		template: templateCode,
	},
});
</script>


<style lang="scss" scoped></style>
