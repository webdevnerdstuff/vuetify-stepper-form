<template>
	<VStepperForm
		v-model="answers"
		v-bind="formSettings"
		:validationSchema="validationSchema"
		@submit="submitForm"
	/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
	object as yupObject,
	string as yupString,
} from 'yup';


interface Props {
	open?: HTMLPreElement | null;
}

defineProps<Props>();

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
				required: true,
				type: 'text' as const,
			},
		],
		title: 'Page 2',
	},
];

const validationSchema = yupObject({
	bar: yupString().required(),
	foo: yupString().required(),
});


const formSettings = ref({
	// altLabels: true,
	// autoPage: true,
	// autoPageDelay: 2000,
	// bgColor: 'secondary',
	// border: 'lg',
	// color: 'yellow',
	// density: 'default' as const,
	// disabled: true,
	// editable: false,
	// elevation: 10,
	// errorIcon: 'fas fa-cog',
	// fieldColumns: {
	// 	lg: 12,
	// 	md: 12,
	// 	sm: 12,
	// 	xl: 12,
	// },
	// flat: true,
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
	validateOn: 'blur' as const,
	// validateOnMount: true,
	// variant: 'outlined',
	// width: '50px',
});

function submitForm(): void {
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
	},
});
</script>


<style lang="scss" scoped></style>
