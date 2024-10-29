<template>
	<v-row v-if="page.title">
		<v-col>
			<h3>
				{{ page.title }}
			</h3>
		</v-col>
	</v-row>

	<v-row v-if="page.text">
		<v-col>
			{{ page.text }}
		</v-col>
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
						v-if="settings.canReview && checkIfEditable(field)"
						@click="settings.canReview ? goToQuestion(field) : null"
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


export interface PageReviewContainerProps {
	page: Page;
	pages: Page[];
	summaryColumns: ResponsiveColumns | undefined;
}

const { summaryColumns, page, pages } = defineProps<PageReviewContainerProps>();
const settings = inject<Settings>('settings')!;

const emit = defineEmits([
	'goToQuestion',
	'submit',
]);

const modelValue = defineModel<any>();


// -------------------------------------------------- Flatten page fields //
const allFieldsArray = ref<Field[]>([]);

Object.values(pages).forEach((p) => {
	if (p.fields) {
		Object.values(p.fields).forEach((field: Field) => {
			allFieldsArray.value.push(field);
		});
	}
});


// -------------------------------------------------- Go to question navigation //
function goToQuestion(field: Field) {
	let pageIndex = pages.findIndex(page => page.fields ? page.fields.some(f => f.name === field.name) : -1);

	if (pages[pageIndex]?.editable === false) {
		return;
	}

	pageIndex = pageIndex + 1;

	setTimeout(() => {
		emit('goToQuestion', pageIndex);
	}, 350);
}


function checkIfEditable(field: Field) {
	const pageIndex = pages.findIndex(page => page.fields ? page.fields.some(f => f.name === field.name) : -1);

	return pages[pageIndex]?.editable !== false;
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
