<template>
	<div
		:class="containerClasses"
		:style="containerStyle"
	>
		<v-container fluid>
			<v-row v-if="title">
				<v-col>
					<h2>
						{{ title }}
					</h2>
				</v-col>
			</v-row>
		</v-container>

		<v-container
			class="d-flex flex-column justify-center align-center"
			fluid
		>
			<v-stepper
				v-model="stepperModel"
				:color="settings.color || 'primary'"
				editable
				width="100%"
			>
				<template #default="{ prev, next }">
					<v-stepper-header>
						<template
							v-for="(page, i) in pages"
							:key="`${i}-step`"
						>
							<v-stepper-item
								:color="settings.color || 'primary'"
								:title="page.title"
								:value="getIndex(i)"
							></v-stepper-item>

							<v-divider
								v-if="getIndex(i) !== Object.keys(pages).length"
								:key="getIndex(i)"
							></v-divider>
						</template>
					</v-stepper-header>

					<v-stepper-window>
						<v-stepper-window-item
							v-for="page, i in pages"
							:key="`${page}-content`"
							reverse
							transition="fade-transition"
							:value="getIndex(i)"
						>
							<v-container>
								<PageContainer
									v-model="modelValue"
									:index="getIndex(i)"
									:page="page"
									:settings="settings"
								/>
							</v-container>
						</v-stepper-window-item>
					</v-stepper-window>

					<v-stepper-actions
						:disabled="foobar"
						@click:next="next"
						@click:prev="prev"
					></v-stepper-actions>
				</template>
			</v-stepper>
		</v-container>
	</div>
</template>

<script setup lang="ts">
import { AllProps } from './utils/props';
import { Props } from '@/plugin/types';
import {
	useContainerClasses,
} from './composables/classes';
import {
	useContainerStyle,
} from './composables/styles';
import componentEmits from './utils/emits';
import { globalOptions } from './';
// import { watchDeep } from '@vueuse/core';
import PageContainer from './components/shared/PageContainer.vue';




const attrs = useAttrs();
const slots = useSlots();
const emit = defineEmits([...componentEmits]);
const injectedOptions = inject(globalOptions, {});

// -------------------------------------------------- Props //
const props = withDefaults(defineProps<Props>(), { ...AllProps });


const stepperSettings = reactive({ ...attrs, ...props, ...injectedOptions });
const { fields, title } = toRefs(props);



const settings = ref({
	...stepperSettings.settings,
	...props.settings,
});

// console.log('settings.value', settings.value);



// -------------------------------------------------- Data #
const modelValue = defineModel<any>();

const stepperModel = ref(1);

const foobar = computed(() => {
	return stepperModel.value === 1 ? 'prev' : stepperModel.value === Object.keys(props.pages).length ? 'next' : undefined;
});



onMounted(() => {
	callback();
});


function getIndex(i: number): number {
	return i + 1;
}


// watch(() => fields.value, () => {
// 	console.log('xxxxxxxxxxxxx fields update', fields.value);
// }), {
// 	deep: true,
// };

// watchDeep(fields.value, () => {
// 	console.log('xxxxxxxxxxxxx fields update', fields.value);
// });


function callback() {
	Object.values(fields.value).forEach((field) => {
		if (field.when) {
			const response = field.when(modelValue.value);
			const fieldIdx = fields.value.findIndex((f) => f.name === field.name);

			if (fields.value[fieldIdx]) {
				fields.value[fieldIdx].disabled = response;
			}
		}
	});
}

console.log({
	emit,
	modelValue,
	props,
	slots,
	stepperSettings,
});

// ------------------------------------------------ Class & Styles //
const containerClasses = computed(() => useContainerClasses({
	isOption: true,
}));

const containerStyle = computed(() => useContainerStyle({
	displayType: 'block',
}));
</script>

<style lang="scss" scoped></style>
