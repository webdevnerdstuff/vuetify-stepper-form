<template>
	<VStepperForm
		v-model="answers"
		:header-tooltips="true"
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
	address: '123 Street',
	city: 'Some City',
	firstName: 'John',
	lastName: 'Doh',
});

const pages = [
	{
		fields: [
			{
				label: 'First Name',
				name: 'firstName',
				type: 'text' as const,
				variant: 'outlined',
			},
			{
				label: 'Last Name',
				name: 'lastName',
				type: 'text' as const,
				variant: 'outlined',
			},
		],
		pageFieldColumns: {
			md: 6,
			sm: 12,
		},
		title: 'Personal Information',
	},
	{
		fields: [
			{
				label: 'Address',
				name: 'address',
				type: 'text' as const,
				variant: 'outlined',
			},
			{
				label: 'City',
				name: 'city',
				type: 'text' as const,
				variant: 'outlined',
			},
		],
		pageFieldColumns: {
			md: 6,
			sm: 12,
		},
		title: 'Address',
	},
	{
		isSummary: true,
		text: 'Please review your information.',
		title: 'Summary',
	},
];

function submitForm(): void {
	dialog.value = true;
}

const templateCode = `<template>
  <VStepperForm
    v-model="answers"
    :header-tooltips="true"
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
  address: '123 Street',
  city: 'Some City',
  firstName: 'John',
  lastName: 'Doh',
});

const pages = [
  {
    fields: [
      {
        label: 'First Name',
        name: 'firstName',
        type: 'text',
        variant: 'outlined',
      },
      {
        label: 'Last Name',
        name: 'lastName',
        type: 'text',
        variant: 'outlined',
      },
    ],
    pageFieldColumns: {
      md: 6,
      sm: 12,
    },
    title: 'Personal Information',
  },
  {
    fields: [
      {
        label: 'Address',
        name: 'address',
        type: 'text',
        variant: 'outlined',
      },
      {
        label: 'City',
        name: 'city',
        type: 'text',
        variant: 'outlined',
      },
    ],
    pageFieldColumns: {
      md: 6,
      sm: 12,
    },
    title: 'Address',
  },
  {
    isSummary: true,
    text: 'Please review your information.',
    title: 'Summary',
  },
];

function submitForm() {
  // ...do something awesome
}
\</script\>`;

defineExpose({
	exampleCode: {
		desc: 'This example shows how to use tooltips in the header of the stepper form.',
		name: 'Tooltips',
		script: scriptCode,
		template: templateCode,
	},
});
</script>


<style lang="scss" scoped></style>
