<template>
	<VStepperForm
		v-model="answers"
		:pages="pages"
		title="Validation"
		validate-on="blur"
		:validationSchema="validationSchema"
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
import {
	string as yupString,
	object as yupObject,
} from 'yup';

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
				required: true,
				type: 'text',
			},
		],
		title: 'Page 1',
	},
	{
		fields: [
			{
				label: 'Bar',
				name: 'bar',
				required: true,
				type: 'text',
			},
		],
		title: 'Page 2',
	}
];

const validationSchema = yupObject({
	bar: yupString().required(),
	foo: yupString().required(),
});

function submitForm() {
	dialog.value = true;
}

const templateCode = `<template>
  <VStepperForm
    v-model="answers"
    :pages="pages"
    title="Validation"
    validate-on="blur"
    :validationSchema="validationSchema"
    @submit="submitForm"
  />
</template>
`;

const scriptCode = `\<script setup\>
import { ref } from 'vue';
import {
  string as yupString,
  object as yupObject,
} from 'yup';


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
  	    required: true,
  	    type: 'text',
  	  },
  	],
  	title: 'Page 1',
  },
  {
    fields: [
      {
        label: 'Bar',
        name: 'bar',
        required: true,
        type: 'text',
      },
    ],
    title: 'Page 2',
  }
];

const validationSchema = yupObject({
  bar: yupString().required(),
  foo: yupString().required(),
});
\</script\>`;

defineExpose({
	exampleCode: {
		desc: 'A straightforward example of a form that incorporates validation using Yup.',
		name: 'Validation',
		script: scriptCode,
		template: templateCode,
	}
});
</script>


<style lang="scss" scoped></style>
