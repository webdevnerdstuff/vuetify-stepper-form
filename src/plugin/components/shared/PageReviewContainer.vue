<template>
	<v-row v-if="page.text">
		<v-col v-html="page.text"></v-col>
	</v-row>

	<v-row>
		<v-col
			v-for="field in allFieldsArray"
			:key="field.name"
			:class="columnClasses"
		>
			<v-list lines="two">
				<v-card
					class="mb-2"
					color="background"
				>
					<v-list-item
						v-if="checkIfEditable(field)"
						@click="settingsEditable && field.editable !== false ? goToQuestion(field) : undefined"
					>
						<v-list-item-title>
							{{ field.label }}
						</v-list-item-title>

						<v-list-item-subtitle>
							<div>
								{{ field.text }}
							</div>

							<div :class="`text-${settings.color}`">
								{{ modelValue[field.name] }}
							</div>
						</v-list-item-subtitle>
					</v-list-item>

					<v-list-item
						v-else
						:ripple="false"
					>
						<v-list-item-title>
							{{ field.label }}
						</v-list-item-title>

						<v-list-item-subtitle>
							<div>
								{{ field.text }}
							</div>

							<div :class="`text-${settings.color}`">
								{{ modelValue[field.name] }}
							</div>
						</v-list-item-subtitle>
					</v-list-item>
				</v-card>
			</v-list>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import type {
	ComputedClasses,
	Field,
	Page,
	ResponsiveColumns,
} from '../../types/index';
import { useColumnClasses } from '../../composables/classes';
import {
	useGetFirstAndLastEditableFalse,
} from '../../composables/helpers';


export interface PageReviewContainerProps {
	page: Page;
	pages: Page[];
	summaryColumns: ResponsiveColumns | undefined;
}

const { summaryColumns, page, pages } = defineProps<PageReviewContainerProps>();
const settings = inject<Settings>('settings')!;

const { editable: settingsEditable } = unref(settings);

defineOptions({
	inheritAttrs: false,
});
const emit = defineEmits([
	'goToQuestion',
]);

const modelValue = defineModel<any>();

interface InternalField extends Field {
	editable: boolean;
}


// -------------------------------------------------- Flatten page fields //
const allFieldsArray = ref<InternalField[]>([]);
const { lastNonEditableIndex } = useGetFirstAndLastEditableFalse(pages);

Object.values(pages).forEach((page, index) => {
	if (page.fields) {
		Object.values(page.fields as InternalField[]).forEach((field) => {
			const internalField = field;


			if (index <= lastNonEditableIndex) {
				internalField.editable = false;
			}

			allFieldsArray.value.push(internalField);
		});
	}
});


// -------------------------------------------------- Go to question navigation //
function goToQuestion(field: InternalField) {
	let pageIndex = pages.findIndex(page => page.fields ? page.fields.some(f => f.name === field.name) : -1);

	if (pages[pageIndex]?.editable === false || field.editable === false) {
		return;
	}

	pageIndex = pageIndex + 1;

	setTimeout(() => {
		emit('goToQuestion', pageIndex);
	}, 350);
}


function checkIfEditable(field: InternalField) {
	const pageIndex = pages.findIndex(page => page.fields ? page.fields.some(f => f.name === field.name) : -1);

	return settingsEditable !== false && pages[pageIndex]?.editable !== false && field.editable !== false;
}


// -------------------------------------------------- Answer Columns //
const columnsMerged = ref<ResponsiveColumns>({
	...{
		lg: undefined,
		md: undefined,
		sm: undefined,
		xl: undefined,
	},
	...summaryColumns,
});

const columnClasses: Ref<ComputedClasses> = computed<ComputedClasses>(() => {
	return useColumnClasses({
		columnsMerged: columnsMerged.value,
	});
});
</script>

<style lang="scss" scoped></style>
