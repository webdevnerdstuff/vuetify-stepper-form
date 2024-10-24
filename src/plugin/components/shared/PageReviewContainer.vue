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

	<v-row>
		<v-col>
			<v-btn
				:color="settings.color"
				@click="submitForm"
			>Submit</v-btn>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import type {
	Field,
	Page,
	ResponsiveColumns,
	Settings,
} from '../../types/index';


export interface PageReviewContainerProps {
	page: Page;
	pages: Page[];
	settings: Settings;
	summaryColumns: ResponsiveColumns | undefined;
}

const { summaryColumns, page, pages } = defineProps<PageReviewContainerProps>();

const emit = defineEmits([
	'goToQuestion',
	'submit',
]);

const modelValue = defineModel<any>();


// -------------------------------------------------- Flatten page fields //
const allFieldsArray = ref<Field[]>([]);

Object.values(pages).forEach((p) => {
	Object.values(p.fields).forEach((field: Field) => {
		allFieldsArray.value.push(field as Field);
	});
});


// -------------------------------------------------- Go to question navigation //
function goToQuestion(field: Field) {
	let pageIndex = pages.findIndex(page => page.fields.some(f => f.name === field.name));

	if (pages[pageIndex]?.editable === false) {
		return;
	}

	pageIndex = pageIndex + 1;

	setTimeout(() => {
		emit('goToQuestion', pageIndex);
	}, 350);
}


function checkIfEditable(field: Field) {
	const pageIndex = pages.findIndex(page => page.fields.some(f => f.name === field.name));

	return pages[pageIndex]?.editable !== false;
}


// -------------------------------------------------- Answer Columns //
const columnDefaults = {
	lg: 12,
	md: 12,
	sm: 12,
	xl: 6,
};

const columnsMerged = ref<ResponsiveColumns>({
	...columnDefaults,
	...summaryColumns,
});

const columnClasses = computed(() => {
	return {
		'py-0': true,
		'v-col-12': true,
		'v-cols': true,
		[`v-col-sm-${columnsMerged.value.sm}`]: true,
		[`v-col-md-${columnsMerged.value.md}`]: true,
		[`v-col-lg-${columnsMerged.value.lg}`]: true,
		[`v-col-xl-${columnsMerged.value.xl}`]: true,
	};
});


// -------------------------------------------------- Submit Form //
function submitForm() {
	emit('submit');
}
</script>

<style lang="scss" scoped></style>
