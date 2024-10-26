<template>
	<v-row>
		<v-col
			id="props"
			cols="12"
		>
			<h2 :class="classes.h2">
				<a
					:class="classes.headerA"
					href="#props"
				>#</a>
				Props
			</h2>

			<div>
				For component specific props, please refer to the <a
					:href="store.links.vuetify"
					target="_blank"
				>Vuetify</a> documentation.
			</div>
		</v-col>

		<v-col cols="12">
			<PropsTable
				:headers="propsStore.propsHeaders"
				:items="propsStore.componentProps"
				section-id="component-props"
				section-title="Component Props"
				subtitle="These props are used by the component."
			/>
		</v-col>
	</v-row>

	<v-row>
		<v-col
			id="props-pages"
			cols="12"
		>
			<h3 :class="classes.h3">
				<a
					:class="classes.headerA"
					href="#props-pages"
				>#</a>
				Pages Prop
			</h3>
		</v-col>

		<v-col cols="12">
			<p class="mb-4">
				The <code class="ic">pages</code> prop is an array of objects used to define the structure and content of each
				step in the stepper form.
			</p>
			<p>
				Each object within the array represents a specific page and contains the fields to be displayed on that page.
				These fields are configured to capture and validate user input, ensuring a smooth multi-step form experience. By
				organizing the form into discrete pages, the stepper can guide users through a structured flow, validating
				inputs and managing visibility based on the form's logic.
			</p>
		</v-col>

		<v-col cols="12">
			<VCodeBlock
				:code="pagesObject"
				:highlightjs="codeBlockSettings.plugin === 'highlightjs'"
				label="Example Page Object"
				lang="javascript"
				:prismjs="codeBlockSettings.plugin === 'prismjs'"
				:theme="codeBlockSettings.theme"
			/>
		</v-col>

		<v-col cols="12">
			<VCodeBlock
				:code="pageTypings"
				:highlightjs="codeBlockSettings.plugin === 'highlightjs'"
				label="Page typings"
				lang="typescript"
				:prismjs="codeBlockSettings.plugin === 'prismjs'"
				:theme="codeBlockSettings.theme"
			/>
		</v-col>

		<v-col
			id="props-fields"
			cols="12"
		>
			<h3 :class="classes.h3">
				<a
					:class="classes.headerA"
					href="#props-fields"
				>#</a>
				Fields Array
			</h3>
		</v-col>

		<v-col cols="12">
			<p class="mb-4">
				The <code class="ic">fields</code> array is composed of objects that define both the structure and behavior of
				each input field within the stepper form. For Vuetify-specific components, nearly all of their props are fully
				supported, ensuring seamless integration. This includes the <code class="ic">VColorField</code> component, which
				also supports the majority of its props, allowing for flexible and customizable form inputs tailored to your
				needs.
			</p>
		</v-col>

		<v-col cols="12">
			<VCodeBlock
				:code="fieldObject"
				:highlightjs="codeBlockSettings.plugin === 'highlightjs'"
				label="Example Field Object"
				lang="javascript"
				:prismjs="codeBlockSettings.plugin === 'prismjs'"
				:theme="codeBlockSettings.theme"
			/>
		</v-col>

		<v-col cols="12">
			<VCodeBlock
				:code="fieldTypings"
				:highlightjs="codeBlockSettings.plugin === 'highlightjs'"
				label="Field typings"
				lang="typescript"
				:prismjs="codeBlockSettings.plugin === 'prismjs'"
				:theme="codeBlockSettings.theme"
			/>
		</v-col>

		<v-col
			id="props-field-types"
			cols="12"
		>
			<h3 :class="classes.h3">
				<a
					:class="classes.headerA"
					href="#props-field-types"
				>#</a>
				Field Types
			</h3>
		</v-col>

		<v-col cols="12">
			<p class="mb-4">
				The <code class="ic">type</code> property is a string that specifies which type of input field will be rendered.
				Refer to the code example below to see which component corresponds to each field type. Additionally, the order
				of the fields in the array determines the order in which they will appear on the page.
			</p>
		</v-col>

		<v-col cols="12">
			<VCodeBlock
				:code="fieldTypes"
				:highlightjs="codeBlockSettings.plugin === 'highlightjs'"
				label="Field types"
				lang="typescript"
				:prismjs="codeBlockSettings.plugin === 'prismjs'"
				:theme="codeBlockSettings.theme"
			/>
		</v-col>
	</v-row>
</template>

<script setup>
import { defineProps, inject } from 'vue';
import { useCoreStore } from '@/stores/index';
import { usePropsStore } from '@/stores/props';
import PropsTable from '@/documentation/components/PropsTable.vue';


const props = defineProps({
	codeBlockOptions: {
		required: true,
		type: Object,
	},
});

const classes = inject('classes');
const store = useCoreStore();
const propsStore = usePropsStore();
const codeBlockSettings = computed(() => props.codeBlockOptions);


const pagesObject = `const pages = [
  {
    title: 'Page 1'
    text: 'This is the page one text',
    fields: [
      // ...field objects
    ],
    autoPage: true,
    editable: true,
    error: false,
  }
]
`;

const pageTypings = `interface Page {
  autoPage?: boolean;
  editable?: VStepperItem['editable'];
  error?: boolean;
  fields: Field[];
  isReview?: boolean;
  text?: string;
  title?: string;
}`;

const fieldObject = `{
  color: 'primary',
  label: 'First Name',
  name: 'firstName',
  text: 'Enter your first name only',
  type: 'text',
  validateOn: 'blur',
  variant: 'outlined',
}`;

const fieldTypings = `interface Field {
  autoPage?: Props['autoPage'];
  autoPageDelay?: Props['autoPageDelay'];
  canReview?: Props['canReview'];
  color?: Props['color'];
  columns?: Props['fieldColumns'];
  density?: Props['density'];
  disabled?: boolean | ((value: any) => boolean);
  error?: boolean;
  errorMessages?: string | string[];
  hidden?: boolean;
  hideDetails?: GlobalHideDetails;
  id?: string;
  inline?: boolean;
  inlineSpacing?: string;
  items?: readonly any[] | undefined;
  label?: string;
  labelPositionLeft?: boolean;
  name: string;
  options?: KeyStringAny;
  required?: boolean | undefined;
  text?: string;
  type?: FieldTypes;
  validateOn?: 'blur' | 'change' | 'click' | 'input';
  when?: (value: any) => boolean;
}

type GlobalHideDetails = boolean | 'auto' | undefined

interface KeyStringAny<T = any> {
  [key: string]: T;
}`;

const fieldTypes = `type FieldTypes =
    'autocomplete'  // VAutocomplete
  | 'checkbox'      // VCheckbox
  | 'color'         // VColorField (from @wdns/vuetify-color-field)
  | 'combobox'      // VCombobox
  | 'date'          // VDateInput (current not supported as the component is in labs)
  | 'email'         // VTextField with type="email"
  | 'fancyRadio'    // VFancyRadio is a custom component with this plugin
  | 'field'         // Used for the field slot
  | 'file'          // VFileInput
  | 'hidden'        // input with type="hidden"
  | 'number'        // VTextField with type="number"
  | 'password'      // VTextField with type="password"
  | 'radio'         // VRadio
  | 'select'        // VSelect
  | 'switch'        // VSwitch
  | 'tel'         	// VTextField with type="tel"
  | 'text'        	// VTextField with type="text"
  | 'textarea'    	// VTextarea
  | 'url'         	// VTextField with type="url"
  | undefined;`;
</script>

<style lang="scss" scoped></style>
