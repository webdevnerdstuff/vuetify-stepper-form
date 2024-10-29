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
			:codeBlockSettings="codeBlockSettings"
			@closePicker="closePicker('SimpleExampleRef');"
		>
			<Example.SimpleExample
				ref="SimpleExampleRef"
				:open="refElementsOpen.SimpleExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('ColumnsExampleRef')"
			:codeBlockSettings="codeBlockSettings"
			@closePicker="closePicker('ColumnsExampleRef');"
		>
			<Example.ColumnsExample
				ref="ColumnsExampleRef"
				:open="refElementsOpen.ColumnsExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('FieldSlotExampleRef')"
			:codeBlockSettings="codeBlockSettings"
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
			:codeBlockSettings="codeBlockSettings"
			@closePicker="closePicker('ValidationExampleRef');"
		>
			<Example.ValidationExample
				ref="ValidationExampleRef"
				:open="refElementsOpen.ValidationExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('ConditionalExampleRef')"
			:codeBlockSettings="codeBlockSettings"
			@closePicker="closePicker('ConditionalExampleRef');"
		>
			<Example.ConditionalExample
				ref="ConditionalExampleRef"
				:open="refElementsOpen.ConditionalExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('SummaryPageExampleRef')"
			:codeBlockSettings="codeBlockSettings"
			@closePicker="closePicker('SummaryPageExampleRef');"
		>
			<Example.SummaryPageExample
				ref="SummaryPageExampleRef"
				:open="refElementsOpen.SummaryPageExampleRef"
			/>
		</ExampleContainer>
	</v-row>
</template>

<script setup lang="ts">
import ExampleContainer from '../components/ExampleContainer.vue';
import * as Example from '../components/examples';


const codeBlockSettings = inject<Docs.CodeBlockSettings>('codeBlockSettings')!;
const classes = inject<Docs.GlobalClasses>('classes')!;


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
