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
			@closePicker="closePicker('SimpleExampleRef');"
		>
			<Example.SimpleExample
				ref="SimpleExampleRef"
				:open="refElementsOpen.SimpleExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('ColumnsExampleRef')"
			@closePicker="closePicker('ColumnsExampleRef');"
		>
			<Example.ColumnsExample
				ref="ColumnsExampleRef"
				:open="refElementsOpen.ColumnsExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('FieldSlotExampleRef')"
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
			@closePicker="closePicker('ValidationExampleRef');"
		>
			<Example.ValidationExample
				ref="ValidationExampleRef"
				:open="refElementsOpen.ValidationExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('ButtonsFieldExampleRef')"
			:codeUpdatedAt="ButtonsFieldExampleCode?.updatedAt"
			:updatedCode="ButtonsFieldExampleCode?.updatedCode"
			@closePicker="closePicker('ButtonsFieldExampleRef');"
		>
			<Example.ButtonsFieldExample
				ref="ButtonsFieldExampleRef"
				:open="refElementsOpen.ButtonsFieldExampleRef"
				@codeUpdated="ButtonsFieldExampleCode = $event"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('SummaryPageExampleRef')"
			@closePicker="closePicker('SummaryPageExampleRef');"
		>
			<Example.SummaryPageExample
				ref="SummaryPageExampleRef"
				:open="refElementsOpen.SummaryPageExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('TooltipExampleRef')"
			@closePicker="closePicker('TooltipExampleRef');"
		>
			<Example.TooltipExample
				ref="TooltipExampleRef"
				:open="refElementsOpen.TooltipExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('ConditionalPageExampleRef')"
			@closePicker="closePicker('ConditionalPageExampleRef');"
		>
			<Example.ConditionalPageExample
				ref="ConditionalPageExampleRef"
				:open="refElementsOpen.ConditionalPageExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('ConditionalFieldExampleRef')"
			@closePicker="closePicker('ConditionalFieldExampleRef');"
		>
			<Example.ConditionalFieldExample
				ref="ConditionalFieldExampleRef"
				:open="refElementsOpen.ConditionalFieldExampleRef"
			/>
		</ExampleContainer>

		<ExampleContainer
			:code="getTemplateCode('DynamicAnswersQuestionsExampleRef')"
			@closePicker="closePicker('DynamicAnswersQuestionsExampleRef');"
		>
			<Example.DynamicAnswersQuestionsExample
				ref="DynamicAnswersQuestionsExampleRef"
				:open="refElementsOpen.DynamicAnswersQuestionsExampleRef"
			/>
		</ExampleContainer>
	</v-row>
</template>

<script setup lang="ts">
import type { ExampleCode } from '../components/ExampleContainer.vue';
import ExampleContainer from '../components/ExampleContainer.vue';
import * as Example from '../components/examples';

const classes = inject<Docs.GlobalClasses>('classes')!;

const SimpleExampleRef = ref(null);
const ColumnsExampleRef = ref(null);
const FieldSlotExampleRef = ref(null);
const ValidationExampleRef = ref(null);
const ConditionalFieldExampleRef = ref(null);
const ConditionalPageExampleRef = ref(null);
const SummaryPageExampleRef = ref(null);
const TooltipExampleRef = ref(null);
const DynamicAnswersQuestionsExampleRef = ref(null);

const ButtonsFieldExampleRef = ref(null);
const ButtonsFieldExampleCode = ref();

const refElements = ref({
	ButtonsFieldExampleRef,
	ColumnsExampleRef,
	ConditionalFieldExampleRef,
	ConditionalPageExampleRef,
	DynamicAnswersQuestionsExampleRef,
	FieldSlotExampleRef,
	SimpleExampleRef,
	SummaryPageExampleRef,
	TooltipExampleRef,
	ValidationExampleRef,
});

const refElementsOpen = ref({
	ButtonsFieldExampleRef: null,
	ColumnsExampleRef: null,
	ConditionalFieldExampleRef: null,
	ConditionalPageExampleRef: null,
	DynamicAnswersQuestionsExampleRef: null,
	FieldSlotExampleRef: null,
	SimpleExampleRef: null,
	SummaryPageExampleRef: null,
	TooltipExampleRef: null,
	ValidationExampleRef: null,
});

function getTemplateCode(exampleName: string): ExampleCode {
	const el = refElements.value[exampleName];
	const example = el?.exampleCode ?? { code: '', desc: undefined, name: undefined, template: '' };

	return example;
}

function closePicker(key: string) {
	refElementsOpen.value[key] = new Date().getTime().toString();
}
</script>
