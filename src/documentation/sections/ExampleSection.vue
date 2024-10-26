<template>
	<v-row>
		<v-col
			id="examples"
			cols="12"
		>
			<h2 :class="classes.h2">
				<a
					:class="classes.headerA"
					href="#examples"
				>#</a>
				Examples
			</h2>
		</v-col>


		<ExampleContainer
			:code="getTemplateCode('SimpleExampleRef')"
			:codeBlockOptions="codeBlockOptions"
			@closePicker="closePicker('SimpleExampleRef');"
		>
			<Example.SimpleExample
				ref="SimpleExampleRef"
				:open="refElementsOpen.SimpleExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('ColumnsExampleRef')"
			:codeBlockOptions="codeBlockOptions"
			@closePicker="closePicker('ColumnsExampleRef');"
		>
			<Example.ColumnsExample
				ref="ColumnsExampleRef"
				:open="refElementsOpen.ColumnsExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('FieldSlotExampleRef')"
			:codeBlockOptions="codeBlockOptions"
			@closePicker="closePicker('FieldSlotExampleRef');"
		>
			<Example.FieldSlotExample
				ref="FieldSlotExampleRef"
				:open="refElementsOpen.FieldSlotExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			id="validation-example"
			:code="getTemplateCode('ValidationExampleRef')"
			:codeBlockOptions="codeBlockOptions"
			@closePicker="closePicker('ValidationExampleRef');"
		>
			<Example.ValidationExample
				ref="ValidationExampleRef"
				:open="refElementsOpen.ValidationExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('ConditionalExampleRef')"
			:codeBlockOptions="codeBlockOptions"
			@closePicker="closePicker('ConditionalExampleRef');"
		>
			<Example.ConditionalExample
				ref="ConditionalExampleRef"
				:open="refElementsOpen.ConditionalExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('SummaryPageExampleRef')"
			:codeBlockOptions="codeBlockOptions"
			@closePicker="closePicker('SummaryPageExampleRef');"
		>
			<Example.SummaryPageExample
				ref="SummaryPageExampleRef"
				:open="refElementsOpen.SummaryPageExampleRef"
			/>
		</ExampleContainer>
	</v-row>
</template>

<script setup>
import { inject } from 'vue';
import ExampleContainer from '../components/ExampleContainer.vue';
import * as Example from '../components/examples';


defineProps({
	codeBlockOptions: {
		required: true,
		type: Object,
	},
});


const classes = inject('classes');


const SimpleExampleRef = ref(null);
const ColumnsExampleRef = ref(null);
const FieldSlotExampleRef = ref(null);
const ValidationExampleRef = ref(null);
const ConditionalExampleRef = ref(null);
const SummaryPageExampleRef = ref(null);

const refElements = ref({
	ColumnsExampleRef,
	ConditionalExampleRef,
	FieldSlotExampleRef,
	SimpleExampleRef,
	SummaryPageExampleRef,
	ValidationExampleRef,
});

const refElementsOpen = ref({
	ColumnsExampleRef: null,
	ConditionalExampleRef: null,
	FieldSlotExampleRef: null,
	SimpleExampleRef: null,
	SummaryPageExampleRef: null,
	ValidationExampleRef: null,
});

function getTemplateCode(exampleName) {
	const el = refElements.value[exampleName];
	const example = el?.exampleCode ?? { code: '', desc: undefined, name: undefined, template: '' };

	return example;
}

function closePicker(key) {
	refElementsOpen.value[key] = new Date().getTime().toString();
}
</script>
