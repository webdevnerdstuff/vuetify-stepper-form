<template>
	<VStepperForm
		v-model="answers"
		:pages="pages"
		title="Simple Form"
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
];

function submitForm(): void {
	dialog.value = true;
}

const templateCode = `<template>
  <VStepperForm
    v-model="answers"
    :pages="pages"
    title="Simple Form"
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
    title: 'Page 1',
    fields: [
      {
        label: 'Foo',
        name: 'foo',
        type: 'text' as const,
      },
    ],
  },
  {
    title: 'Page 2',
    fields: [
        {
        label: 'Bar',
        name: 'bar',
        type: 'text' as const,
        },
      ],
  }
];

function submitForm() {
  // ...do something awesome
}
\</script\>`;

defineExpose({
	exampleCode: {
		desc: 'A simple example of the <code class="ic">VStepperForm</code> component.',
		script: scriptCode,
		template: templateCode,
	},
});
</script>


<style lang="scss" scoped></style>
