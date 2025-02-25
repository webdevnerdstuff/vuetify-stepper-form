<template>
	<v-container class="py-0">
		<v-row>
			<v-col cols="12">
				<v-btn @click="drawer = !drawer">Button Options</v-btn>
			</v-col>
		</v-row>
	</v-container>

	<VStepperForm
		:key="exampleKey"
		v-model="answers"
		color="primary"
		:density="buttonDensityModel"
		:pages="pages"
		:validationSchema="validationSchema"
		:variant="buttonVariantModel"
		@submit="submitForm"
	/>

	<v-navigation-drawer
		v-model="drawer"
		fixed
		location="right"
		:scrim="!mobile ? false : 'transparent'"
		:temporary="!mobile"
	>
		<v-container>
			<div class="d-flex justify-space-between align-center mb-2">
				<h3 class="text-secondary text-h6">Button Options</h3>
				<v-btn
					icon="mdi:mdi-close"
					size="small"
					variant="flat"
					@click="drawer = !drawer"
				/>
			</div>

			<v-row>
				<v-col
					class="pb-0"
					cols="12"
				>
					<h4>Form & Page Props</h4>
				</v-col>
				<v-col cols="12">
					<v-select
						v-model="buttonVariantModel"
						v-bind="optionsSettings"
						:items="buttonVariantOptions"
						label="Variant Prop"
					/>
				</v-col>
				<v-col cols="12">
					<v-select
						v-model="buttonDensityModel"
						v-bind="optionsSettings"
						:items="buttonDensityOptions"
						label="Density Prop"
					/>
				</v-col>
				<v-col cols="12">
					<v-select
						v-model="buttonAlignModel"
						v-bind="optionsSettings"
						:items="buttonAlignOptions"
						label="Align Prop"
					/>
				</v-col>
				<v-col
					class="pb-0"
					cols="12"
				>
					<h4>Field Props</h4>
				</v-col>
				<v-col
					class="py-0"
					cols="12"
				>
					<v-checkbox
						v-model="buttonBlock"
						v-bind="optionsSettings"
						label="Block"
						:true-value="true"
					/>
				</v-col>
				<v-col
					class="pb-0"
					cols="12"
				>
					<h4>Option Props</h4>
				</v-col>
				<v-col
					class="py-0"
					cols="12"
				>
					<v-checkbox
						v-model="appendIcon"
						v-bind="optionsSettings"
						label="Append Icon"
						:true-value="true"
					/>
				</v-col>
				<v-col
					class="py-0"
					cols="12"
				>
					<v-checkbox
						v-model="prependIcon"
						v-bind="optionsSettings"
						label="Prepend Icon"
						:true-value="true"
					/>
				</v-col>
				<v-col
					class="py-0"
					cols="12"
				>
					<v-checkbox
						v-model="useIcon"
						v-bind="optionsSettings"
						label="Icon"
						:true-value="true"
					/>
				</v-col>
				<v-col
					class="py-0"
					cols="12"
				>
					<v-checkbox
						v-model="useColors"
						v-bind="optionsSettings"
						label="Color"
						:true-value="true"
					/>
				</v-col>
			</v-row>
		</v-container>

	</v-navigation-drawer>

	<AnswersDialog
		v-model="dialog"
		:answers="answers"
	/>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import {
	array as yupArray,
	object as yupObject,
	string as yupString,
} from 'yup';
import AnswersDialog from '../AnswersDialog.vue';


const emit = defineEmits(['codeUpdated']);

const drawer = ref(false);
const dialog = ref(false);
const optionsSettings = {
	color: 'primary',
	density: 'comfortable' as const,
	hideDetails: true,
};
const { mobile } = useDisplay();

const buttonVariantOptions = [
	{
		title: 'None',
		value: undefined,
	},
	{
		title: 'Text',
		value: 'text',
	},
	{
		title: 'Flat',
		value: 'flat',
	},
	{
		title: 'Elevated',
		value: 'elevated',
	},
	{
		title: 'Tonal',
		value: 'tonal',
	},
	{
		title: 'Outlined',
		value: 'outlined',
	},
	{
		title: 'Plain',
		value: 'plain',
	},
];
const buttonVariantModel = ref('outlined');
const buttonAlignModel = ref('center');
const buttonAlignOptions = [
	{
		title: 'Start',
		value: 'start',
	},
	{
		title: 'Center',
		value: 'center',
	},
	{
		title: 'End',
		value: 'end',
	},
	{
		title: 'Space Between',
		value: 'space-between',
	},
	{
		title: 'Space Around',
		value: 'space-around',
	},
	{
		title: 'Space Evenly',
		value: 'space-evenly',
	},
];
const buttonBlock = ref(false);
const buttonDensityModel = ref('default' as const);
const buttonDensityOptions = [
	{
		title: 'Default',
		value: 'default',
	},
	{
		title: 'Comfortable',
		value: 'comfortable',
	},
	{
		title: 'Compact',
		value: 'compact',
	},
	{
		title: 'Expanded',
		value: 'expanded',
	},
	{
		title: 'Oversized',
		value: 'oversized',
	},
];
const useIcon = ref(false);


const answers = ref<{
	animalsILike: string[] | null | undefined;
	iLikeButtons: string | null | undefined;
}>({
	animalsILike: null,
	iLikeButtons: null,
});

const appendIcon = ref(false);
const prependIcon = ref(false);
const useColors = ref(false);


watch(() => [useIcon.value, useColors.value, appendIcon.value, prependIcon.value], () => {
	answers.value = {
		animalsILike: null,
		iLikeButtons: null,
	};
});


const pages = computed(() => [
	{
		fields: [
			{
				align: buttonAlignModel.value,
				block: buttonBlock.value,
				label: 'I like buttons',
				name: 'iLikeButtons',
				options: [
					{
						appendIcon: appendIcon.value ? 'mdi:mdi-check' : undefined,
						color: useColors.value ? 'success' : undefined,
						icon: useIcon.value ? 'mdi:mdi-check' : undefined,
						label: 'Yes',
						prependIcon: prependIcon.value ? 'mdi:mdi-check' : undefined,
						value: 'yes',
					},
					{
						appendIcon: appendIcon.value ? 'mdi:mdi-cancel' : undefined,
						color: useColors.value ? 'error' : undefined,
						icon: useIcon.value ? 'mdi:mdi-cancel' : undefined,
						label: 'No',
						prependIcon: prependIcon.value ? 'mdi:mdi-cancel' : undefined,
						value: 'no',
					},
					{
						appendIcon: appendIcon.value ? 'mdi:mdi-help' : undefined,
						icon: useIcon.value ? 'mdi:mdi-help' : undefined,
						label: 'Maybe',
						prependIcon: prependIcon.value ? 'mdi:mdi-help' : undefined,
						value: 'maybe',
					},
				],
				required: true,
				type: 'buttons' as const,
			},
			{
				align: buttonAlignModel.value,
				block: buttonBlock.value,
				label: 'I like...',
				multiple: true,
				name: 'animalsILike',
				options: [
					{
						appendIcon: appendIcon.value ? 'mdi:mdi-rabbit' : undefined,
						color: useColors.value ? 'white' : undefined,
						icon: useIcon.value ? 'mdi:mdi-rabbit' : undefined,
						label: 'Bunnies',
						prependIcon: prependIcon.value ? 'mdi:mdi-rabbit' : undefined,
						value: 'bunnies',
					},
					{
						appendIcon: appendIcon.value ? 'mdi:mdi-tortoise' : undefined,
						color: useColors.value ? 'success' : undefined,
						icon: useIcon.value ? 'mdi:mdi-tortoise' : undefined,
						label: 'Turtles',
						prependIcon: prependIcon.value ? 'mdi:mdi-tortoise' : undefined,
						value: 'turtles',
					},
					{
						appendIcon: appendIcon.value ? 'mdi:mdi-duck' : undefined,
						color: useColors.value ? 'yellow' : undefined,
						icon: useIcon.value ? 'mdi:mdi-duck' : undefined,
						label: 'duck',
						prependIcon: prependIcon.value ? 'mdi:mdi-duck' : undefined,
						value: 'duck',
					},
				],
				required: true,
				type: 'buttons' as const,
			},
		],
		title: 'Page 1',
	},
]);

const exampleKey = ref(String(Math.random()));

watch(() => pages.value, () => {
	exampleKey.value = String(Math.random());
});

const validationSchema = yupObject({
	animalsILike: yupArray().required('This field is required.')
		.min(1, 'Must select at least ${min} option.'),
	iLikeButtons: yupString().required('This field is required.'),
});

function submitForm(): void {
	dialog.value = true;
}

const templateCode = computed(() => (
	`<template>
  <VStepperForm
    v-model="answers"
    color="primary"
    :pages="pages"
    :density="${buttonDensityModel.value}"
    @submit="submitForm"
    :variant="${buttonVariantModel.value}"
    @submit="submitForm"
  />
</template>`
));

interface Options {
	color?: string;
	icon?: string;
	label: string;
	value: string;
}

function buildOption(options: Options): string {
	const { label, icon, color, value } = options;
	let output = '';

	if (appendIcon.value) {
		output += `\n            appendIcon: '${icon}',`;
	}
	if (useColors.value && color) {
		output += `\n            color: '${color}',`;
	}
	if (useIcon.value) {
		output += `\n            icon: '${icon}',`;
	}

	output += `\n            label: '${label}',`;

	if (prependIcon.value) {
		output += `\n            prependIcon: '${icon}',`;
	}

	output += `\n            value: '${value}',`;

	return output;
}

const yesOption = computed(() => buildOption({
	color: 'success',
	icon: 'mdi:mdi-check',
	label: 'Yes',
	value: 'yes',
}));

const noOption = computed(() => buildOption({
	color: 'error',
	icon: 'mdi:mdi-cancel',
	label: 'No',
	value: 'no',
}));

const maybeOption = computed(() => buildOption({
	icon: 'mdi:mdi-help',
	label: 'Maybe',
	value: 'maybe',
}));

const bunniesOption = computed(() => buildOption({
	color: 'white',
	icon: 'mdi:mdi-rabbit',
	label: 'Bunnies',
	value: 'bunnies',
}));

const turtlesOption = computed(() => buildOption({
	color: 'success',
	icon: 'mdi:mdi-tortoise',
	label: 'Turtles',
	value: 'turtles',
}));

const duckOption = computed(() => buildOption({
	color: 'yellow',
	icon: 'mdi:mdi-duck',
	label: 'duck',
	value: 'duck',
}));


const exampleAnswer = computed<string>(() => {
	if (!answers.value.iLikeButtons) {
		return 'null';
	}

	return `'${answers.value.iLikeButtons}'`;
});

const scriptCode = computed(() => (
	`\<script setup\>
const answers = ref({
  iLikeButtons: ${exampleAnswer.value},
});

const pages = computed(() => [
  {
    fields: [
      {
        align: '${buttonAlignModel.value}',
        block: ${buttonBlock.value},
        label: 'I like buttons',
        name: 'iLikeButtons',
        options: [
          {${yesOption.value}
          }
          {${noOption.value}
          }
          {${maybeOption.value}
          },
        ],
        type: 'buttons',
      },
      {
        align: '${buttonAlignModel.value}',
        block: ${buttonBlock.value},
        label: 'Animals I Like',
        multiple: true,
        name: 'animalsILike',
        options: [
          {${bunniesOption.value}
          }
          {${turtlesOption.value}
          },
          {${duckOption.value}
          }
        ],
        type: 'buttons',
      },
    ],
    title: 'Page 1',
  },
]);
\</script\>`
));

watch(() => [scriptCode.value, templateCode.value], () => {
	emit('codeUpdated', {
		updatedAt: String(Math.random()),
		updatedCode: exampleCode.value,
	});
});

const exampleCode = computed(() => ({
	desc: 'This example utilizes a custom-built component designed for this form, allowing users to select a value through buttons.',
	name: 'Buttons Field',
	script: scriptCode.value,
	template: templateCode.value,
}));

defineExpose({
	exampleCode: exampleCode.value,
});
</script>


<style lang="scss" scoped></style>
