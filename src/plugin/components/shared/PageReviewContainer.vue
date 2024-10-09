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
		<v-col>
			<v-list lines="two">
				<v-card
					v-for="field in allFieldsArray"
					:key="field.name"
					class="mb-2"
					color="background"
				>
					<v-list-item
						v-if="canReview"
						:ripple="canReview"
						:title="field.label"
						@click="canReview ? goToQuestion(field) : null"
					>
						<v-list-item-subtitle :class="`text-${settings.color}`">
							{{ modelValue[field.name] }}
						</v-list-item-subtitle>
					</v-list-item>

					<v-list-item
						v-else
						:ripple="false"
						:title="field.label"
					>
						<v-list-item-subtitle :class="`text-${settings.color}`">
							{{ modelValue[field.name] }}
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
	Settings,
} from '../../types/index';

export interface PageReviewContainerProps {
	canReview: boolean;
	page: Page;
	pages: Page[];
	settings: Settings;
}

const { page, pages } = defineProps<PageReviewContainerProps>();

const emit = defineEmits([
	'goToQuestion',
	'submit',
]);

const modelValue = defineModel<any>();

const allFieldsArray = ref<Field[]>([]);

Object.values(pages).forEach((p) => {
	Object.values(p.fields).forEach((field: Field) => {
		allFieldsArray.value.push(field as Field);
	});
});

function goToQuestion(field: Field) {
	let pageIndex = pages.findIndex(page => page.fields.some(f => f.name === field.name));

	if (pages[pageIndex]?.editable === false) {
		return;
	}

	pageIndex = pageIndex + 1;

	emit('goToQuestion', pageIndex);
}


function submitForm() {
	// console.log('PageViewContainer submitForm');

	emit('submit');
}

// function callback() {
// 	console.log('callback');
// }
</script>

<style lang="scss" scoped></style>
