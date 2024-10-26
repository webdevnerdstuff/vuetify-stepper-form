<template>
	<VStepperForm
		v-model="answers"
		v-bind="formSettings"
		@submit="submitForm"
	/>
</template>

<script setup lang="ts">
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


const formSettings = ref({
	// autoPage: true,
	// autoPageDelay: 2000,
	// altLabels: true,
	// bgColor: 'secondary',
	// border: 'lg',
	// canReview: false,
	// color: 'yellow',
	// density: 'default',
	// disabled: true,
	// editable: false,
	// errorIcon: 'fas fa-cog',
	// fieldColumns: {
	// 	lg: 12,
	// 	md: 12,
	// 	sm: 12,
	// 	xl: 12,
	// },
	// flat: true,
	// elevation: 10,
	// height: '900px',
	// hideActions: true,
	// hideDetails: true,

	// maxHeight: '50px',
	// maxWidth: '50px',
	// minHeight: '900px',
	// minWidth: '900px',
	// navButtonSize: 'small',
	// nextText: 'hop back',
	pages: pages,
	// prevText: 'hop forward',
	// rounded: 'pill',
	// selectedClass: 'foobar',
	// summaryColumns: { sm: 2 },
	// theme: 'light',
	// tile: true,
	title: 'Basic Form',
	validateOn: 'blur',
	// validateOnMount: true,
	validationSchema: validationSchema,
	// variant: 'outlined',
	// width: '50px',
});

function submitForm() {
	console.log('submitForm');
}

const templateCode = `<template>
  <VColorField v-model="color" />
</template>
`;

const scriptCode = `\<script setup\>
  const color = ref(null);
\</script\>`;

defineExpose({
	exampleCode: {
		desc: 'A simple example of a color picker field using the <code class="ic">VTextField</code> component. Clicking on the icon will open the color picker.',
		script: scriptCode,
		template: templateCode,
	}
});
</script>


<style lang="scss" scoped></style>
