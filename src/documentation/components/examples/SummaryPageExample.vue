<template>
	<VStepperForm
		v-model="answers"
		:can-review="true"
		:pages="pages"
		:summary-columns="{
			lg: 6,
		}"
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
});

const pages = [
	{
		fields: [
			{
				label: 'Foo',
				name: 'foo',
				type: 'text' as const,
			},
		],
		title: 'Page 1',
	},
	{
		fields: [
			{
				label: 'Bar',
				name: 'bar',
				type: 'text' as const,
			},
		],
		title: 'Page 2',
	},
	{
		isSummary: true,
		text: 'Here\'s the data you\'ve entered. Feel free to review it.',
		title: 'Summary',
	},
];

function submitForm(): void {
	dialog.value = true;
}

const templateCode = `<template>
  <VStepperForm
    v-model="answers"
    :can-review="true"
    :pages="pages"
    :summary-columns="{
      lg: 6,
    }"
    @submit="submitForm"
  />
</template>
`;

const scriptCode = `\<script setup\>
import { ref } from 'vue';


const answers = ref({
  bar: null,
  foo: null,
});

const pages = [
  {
    fields: [
      {
        label: 'Foo',
        name: 'foo',
        type: 'text' as const,
      },
    ],
    title: 'Page 1',
  },
  {
    fields: [
      {
        label: 'Bar',
        name: 'bar',
        type: 'text' as const,
      },
    ],
    title: 'Page 2',
  },
  {
    isSummary: true,
    text: 'Here\'s the data you\'ve entered. Feel free to review it.',
    title: 'Summary',
  },
];

function submitForm() {
  // ...do something awesome
}
\</script\>`;

defineExpose({
	exampleCode: {
		desc: 'This example walks through creating a form with multiple fields and a final summary page to review the submitted information before completion. The <code class="ic">summaryColumns</code> prop works similarly to the <code class="ic">fieldColumns</code> prop by allowing you to define a column layout, but it specifically applies to the summary page. While <code class="ic">fieldColumns</code> arranges the form fields during input, <code class="ic">summaryColumns</code> customizes the layout of the final review, making it easy to structure and display the user\'s responses in a clear, organized format.',
		name: 'Summary Page',
		script: scriptCode,
		template: templateCode,
	},
});
</script>


<style lang="scss" scoped></style>
