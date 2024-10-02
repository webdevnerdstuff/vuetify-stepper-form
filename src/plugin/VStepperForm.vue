<template>
	<div
		:class="containerClasses"
		:style="containerStyle"
	>
		<v-container>
			<v-row v-if="title">
				<v-col>
					<h2>
						{{ title }}
					</h2>
				</v-col>
			</v-row>
		</v-container>

		<template
			v-for="field in fields"
			:key="field.name"
		>
			<input
				v-if="field.type === 'hidden'"
				v-model="modelValue[field.name]"
				type="hidden"
			/>

			<v-container v-else>
				<!-- <Fields.VSFTextarea
					v-if="field.type === 'textarea'"
					v-model="modelValue[field.name]"
					:field="field"
				/> -->


				<Fields.VSFTextField
					v-if="field.type === 'text' || field.type === 'textField' || field.type === 'number'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
				/>

				<Fields.VSFTextarea
					v-if="field.type === 'textarea'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
				/>




				<!-- <v-textarea
					v-if="field.type === 'textarea'"
					v-model="modelValue[field.name]"
					:density="field.density || settings.density"
					:hint="field.hint"
					:label="field.label"
					:placeholder="field.placeholder || undefined"
					:required="field.required"
				>
					<template #label>
						<FieldLabel
							:label="field.label"
							:required="field.required"
						/>
					</template>
</v-textarea> -->

				<!-- <v-radio-group
					v-if="field.type === 'radio'"
					v-model="modelValue[field.name]"
					:inline="field.inline"
				>
					<template #label>
						{{ field.label }} <span
							v-if="field.required"
							class="text-error ms-1"
						>*</span>
					</template>
					<v-radio
						v-for="option in field.options"
						:key="option.value"
						:density="field.density || stepperSettings.density"
						:label="option.label"
						:value="option.value"
					></v-radio>
				</v-radio-group> -->

				<!-- <template v-if="field.type === 'checkbox'">
					<div class="v-input v-input--horizontal v-input--center-affix v-radio-group">
						<div class="v-input__control">

							<v-label>
								<FieldLabel
									:label="field.label"
									:required="field.required"
								/>
							</v-label>

							<div
								class="v-selection-control-group"
								style="padding-inline-start: 4px;"
							>
								<v-checkbox
									v-for="option in field.options"
									:key="option.value"
									v-model="modelValue[field.name]"
									:density="field.density || stepperSettings.density"
									hide-details
									:label="option.label"
									:value="option.value"
								>
								</v-checkbox>
							</div>
						</div>
					</div>

				</template> -->

				<!-- <Fields.VSFSwitch
					v-if="field.type === 'switch'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
				/> -->

			</v-container>
		</template>
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
import * as Fields from './components/index';
import { globalOptions } from '@/plugin/';




const attrs = useAttrs();
const slots = useSlots();
const emit = defineEmits([...componentEmits]);
const injectedOptions = inject(globalOptions, {});
// console.log('injectedOptions', injectedOptions);

// -------------------------------------------------- Props //
const props = withDefaults(defineProps<Props>(), { ...AllProps });
// console.log('AllProps', props);
// console.log('props', AllProps);
const stepperSettings = reactive({ ...attrs, ...props, ...injectedOptions });
const { title } = toRefs(props);

const settings = ref({
	...stepperSettings.settings,
	...props.settings,
});

// console.log('settings.value', settings.value);



// -------------------------------------------------- Data #
const modelValue = defineModel<any>();




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
