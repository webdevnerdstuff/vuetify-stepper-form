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
				when() {
					return answers.value.conditionalParent === 'foo';
				},
			},
			{
				label: 'Bar',
				name: 'bar',
				type: 'text' as const,
				when() {
					return answers.value.conditionalParent === 'bar';
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
        when() {
          return answers.value.conditionalParent === 'foo';
        },
      },
      {
        label: 'Bar',
        name: 'bar',
        type: 'text' as const,
        when() {
          return answers.value.conditionalParent === 'bar';
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
