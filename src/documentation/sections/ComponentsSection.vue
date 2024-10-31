<template>
	<v-row>
		<v-col
			id="components"
			cols="12"
		>
			<h2 :class="classes.h2">
				<a
					:class="classes.headerA"
					href="#components"
				>#</a>
				Components
			</h2>
		</v-col>

		<v-col cols="12">
			Many of the Vuetify Components are built into the form. The following components are available:
		</v-col>

		<v-col cols="12">
			<template
				v-for="component in componentList"
				:key="component.title"
			>
				<code class="ic mr-2">{{ component.title }}</code>
			</template>
		</v-col>

		<v-col
			id="components-additional"
			cols="12"
		>
			<h4 :class="classes.h4">
				<a
					:class="classes.headerA"
					href="#components-additionalops-pages"
				>#</a>
				Additional Fields
			</h4>
		</v-col>

		<v-col cols="12">
			My <code class="ic">VColorField</code> component is also available for use via the <a
				:href="links.vColorField">@wdns/vuetify-color-field</a> package.
		</v-col>

		<v-col
			id="components-buttons-field"
			cols="12"
		>
			<h3 :class="classes.h3">
				<a
					:class="classes.headerA"
					href="#components-buttons-field"
				>#</a>
				Buttons Field
			</h3>
		</v-col>

		<v-col cols="12">
			The <code class="ic">buttons</code> field is a custom component integrated into this form, utilizing the <code
				class="ic"
			>VBtn</code> component to easily display booleans, text, icons, or any other content where a button-style
			interface is preferred over traditional checkboxes, radio buttons, or switches.
		</v-col>

		<v-col cols="12">
			This component supports most of the <code class="ic">VBtn</code> props, which can be added directly to the Field
			object. Additionally, some props are accessible within the option object.
		</v-col>

		<v-col cols="12">
			<VCodeBlock
				:code="buttonsFieldType"
				:highlightjs="codeBlockSettings.plugin === 'highlightjs'"
				lang="typescript"
				:prismjs="codeBlockSettings.plugin === 'prismjs'"
				:theme="codeBlockSettings.theme"
			>
				<template #label>
					<div v-html="buttonFieldTypesLabel" />
				</template>
			</VCodeBlock>
		</v-col>

		<v-col cols="12">
			<VCodeBlock
				:code="buttonsFieldOptions"
				:highlightjs="codeBlockSettings.plugin === 'highlightjs'"
				label="Option Types"
				lang="typescript"
				:prismjs="codeBlockSettings.plugin === 'prismjs'"
				:theme="codeBlockSettings.theme"
			/>
		</v-col>

		<v-col cols="12">
			An example of its usage can be found in the <a href="#examples-buttons-field">Buttons Field</a> example within the
			Examples section below.
		</v-col>

		<!-- <v-col
			id="components-field-label"
			cols="12"
		>
			<h3 :class="classes.h3">
				<a
					:class="classes.headerA"
					href="#components-field-label"
				>#</a>
				Field Label
			</h3>
		</v-col> -->
	</v-row>
</template>

<script setup lang="ts">
const codeBlockSettings = inject<Docs.CodeBlockSettings>('codeBlockSettings')!;
const classes = inject<Docs.GlobalClasses>('classes')!;
const links = inject<Docs.Links>('links')!;

const componentList = [
	{
		subTitle: '',
		title: 'VAutocomplete',
	},
	{
		subTitle: '',
		title: 'VCheckbox',
	},
	{
		subTitle: '',
		title: 'VCombobox',
	},
	// {
	// 	subTitle: '',
	// 	title: 'VDatePicker',
	// },
	{
		subTitle: '',
		title: 'VFileInput',
	},
	{
		subTitle: '',
		title: 'VRadio',
	},
	{
		subTitle: '',
		title: 'VSelect',
	},
	{
		subTitle: '',
		title: 'VSwitch',
	},
	{
		subTitle: '',
		title: 'VTextarea',
	},
	{
		subTitle: '',
		title: 'VTextField',
	},
];

const buttonFieldTypesLabel = 'Field Types. The Buttons Field also extends the <a href="#props-field-interface">Field Interface.</a>.';
const buttonsFieldType = `{
  activeColor?: VBtn['activeColor'];
  align?: string;
  appendIcon?: VBtn['appendIcon'];
  block?: VBtn['block'];
  border?: VBtn['border'];
  gap?: string | number;
  height?: VBtn['height'];
  hint?: string;
  icon?: VBtn['icon'];
  justify?: string;
  messages?: string | string[];
  minWidth?: VBtn['minWidth'];
  multiple?: boolean;
  options?: Option[];
  persistentHint?: boolean;
  prependIcon?: VBtn['prependIcon'];
  selectedClass?: string;
  size?: VBtn['size'];
  stacked?: boolean;
  variant?: VBtn['variant'];
  width?: VBtn['width'];
}`;

const buttonsFieldOptions = `interface Option {
  appendIcon?: VBtn['appendIcon'];
  class?: string;
  color?: VBtn['color'];
  height?: VBtn['height'];
  icon?: VBtn['icon'];
  id?: Field['id'];
  label: Field['label'];
  maxWidth?: VBtn['maxWidth'];
  minWidth?: VBtn['minWidth'];
  prependIcon?: VBtn['prependIcon'];
  value: string | number;
  width?: VBtn['width'];
}`;
</script>

<style lang="scss" scoped>
.component-list {
	> .v-list-item {
		grid-template-columns: min-content 1fr !important;
	}

	:deep(.v-list-item__prepend) {
		align-items: flex-start;
		align-self: flex-start;
		font-size: .5em;
		padding-top: 5px;
		width: 22px;
	}
}
</style>
