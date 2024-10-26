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
	foo: null,
	radioOption: null,
});

const pages = [
	{
		fields: [
			{
				inline: true,
				label: 'Select One',
				name: 'radioOption',
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
				type: 'radio' as const,
			},
			{
				label: 'Foo',
				name: 'foo',
				type: 'text' as const,
				when() {
					return answers.value.radioOption === 'foo';
				},
			},
			{
				label: 'Bar',
				name: 'bar',
				type: 'text' as const,
				when() {
					return answers.value.radioOption === 'bar';
				},
			},
		],
	},
];

function submitForm() {
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
  foo: null,
  radioOption: null,
});

const pages = [
  {
    fields: [
      {
        inline: true,
        label: 'Select One',
        name: 'radioOption',
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
        type: 'radio' as const,
      },
      {
        label: 'Foo',
        name: 'foo',
        type: 'text' as const,
        when() {
          return answers.value.radioOption === 'foo';
        },
      },
      {
        label: 'Bar',
        name: 'bar',
        type: 'text' as const,
        when() {
          return answers.value.radioOption === 'bar';
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
		desc: 'The field <code class="ic">when</code> prop allows you to show or hide form fields based on certain conditions dynamically. It works by evaluating a condition and displaying the field only when that condition is met. The Yup schema also has ',
		name: 'Conditional Fields',
		script: scriptCode,
		template: templateCode,
	}
});
</script>


<style lang="scss" scoped></style>
