import { defineStore } from 'pinia';
import { useCoreStore } from './';


export const usePropsStore = defineStore('props', () => {
	const { links } = useCoreStore();

	const propsHeaders = [
		{
			align: 'start',
			filterable: true,
			key: 'name',
			sortable: true,
			title: 'Name',
			width: '20%',
		},
		{
			align: 'start',
			filterable: false,
			key: 'type',
			sortable: false,
			title: 'Type',
			width: '20%',
		},
		{
			align: 'start',
			filterable: false,
			key: 'default',
			sortable: false,
			title: 'Default',
		},
		{
			align: 'start',
			filterable: false,
			key: 'desc',
			sortable: false,
			title: 'Description',
		},
	];

	const columnsType = `<pre><code>{
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
}</code></pre>`;
	const columnsDefault = `<pre><code>{
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
}</code></pre>`;

	const vStepperPropDesc = 'See <a href="https://vuetifyjs.com/en/api/v-stepper/" target="_blank" nofollow>VStepper documentation</a> for more information.';
	const vStepperWindowItemPropDesc = 'See <a href="https://vuetifyjs.com/en/api/v-stepper-window-item/" target="_blank" nofollow>VStepperWindowItem documentation</a> for more information.';
	const transitionsText = 'Can be one of the <a href="https://vuetifyjs.com/en/styles/transitions/" target="_blank" nofollow> built in</a> transitions.';

	const componentProps = [
		{
			default: 'false',
			desc: vStepperPropDesc,
			name: 'altLabels',
			type: 'boolean',
		},
		{
			default: 'undefined',
			desc: 'Sets the form to auto advance to the next page after the last field is filled out.',
			name: 'autoPage',
			type: 'boolean',
		},
		{
			default: '250',
			desc: 'Sets the delay before the form auto advances to the next page.',
			name: 'autoPageDelay',
			type: 'number',
		},
		{
			default: 'undefined',
			desc: vStepperPropDesc,
			name: 'bgColor',
			type: 'string',
		},
		{
			default: 'false',
			desc: vStepperPropDesc,
			name: 'border',
			type: 'string | number | boolean',
		},
		{
			default: 'undefined',
			desc: 'Applies specified color to the control and fields - supports utility colors (for example success or purple) or css color (#033 or rgba(255, 0, 0, 0.5)).',
			name: 'color',
			type: 'string',
		},
		{
			default: 'default',
			desc: 'Adjusts the vertical height used by the field components.',
			name: 'density',
			type: "| null<br /> | 'default'<br /> | 'comfortable'<br /> | 'compact'",
		},
		{
			default: 'horizontal',
			desc: 'The direction of the stepper form. Currently only horizontal is supported.',
			name: 'direction',
			type: 'horizontal | vertical',
		},
		{
			default: 'false',
			desc: vStepperPropDesc,
			name: 'disabled',
			type: 'boolean',
		},
		{
			default: 'undefined',
			desc: vStepperPropDesc,
			name: 'editIcon',
			type: 'string',
		},
		{
			default: 'false',
			desc: vStepperPropDesc,
			name: 'editable',
			type: 'boolean',
		},
		{
			default: 'undefined',
			desc: vStepperPropDesc,
			name: 'elevation',
			type: 'string | number',
		},
		{
			default: '$error',
			desc: vStepperPropDesc,
			name: 'errorIcon',
			type: "VStepperItem['errorIcon']",
		},
		{
			default: columnsDefault,
			desc: 'Sets the responsive columns for the fields.',
			name: 'fieldColumns',
			type: columnsType,
		},
		{
			default: 'false',
			desc: vStepperPropDesc,
			name: 'flat',
			type: 'boolean',
		},
		{
			default: 'false',
			desc: 'Display each page\'s questions in tooltips on the respective headers.',
			name: 'headerTooltips',
			type: 'boolean',
		},
		{
			default: 'undefined',
			desc: vStepperPropDesc,
			name: 'height',
			type: 'string | number',
		},
		{
			default: 'false',
			desc: vStepperPropDesc,
			name: 'hideActions',
			type: 'boolean',
		},
		{
			default: 'false',
			desc: 'Hides hint and validation errors. When set to auto messages will be rendered only if there\'s a message (hint, error message, counter value etc) to display.',
			name: 'hideDetails',
			type: 'boolean',
		},
		{
			default: false,
			desc: 'Allows jumping ahead to pages that are not yet filled out.',
			name: 'jumpAhead',
			type: 'boolean',
		},
		{
			default: 'undefined',
			desc: vStepperPropDesc,
			name: 'maxHeight',
			type: 'string | number',
		},
		{
			default: 'false',
			desc: 'Keep the form values when the component is unmounted.',
			name: 'keepValuesOnUnmount',
			type: 'boolean',
		},
		{
			default: 'undefined',
			desc: vStepperPropDesc,
			name: 'maxWidth',
			type: 'string | number',
		},
		{
			default: 'undefined',
			desc: vStepperPropDesc,
			name: 'minHeight',
			type: 'string | number',
		},
		{
			default: 'undefined',
			desc: vStepperPropDesc,
			name: 'minWidth',
			type: 'string | number',
		},
		{
			default: 'large',
			desc: 'Sets the height and width of the navigation buttons. Default unit is px. Can also use the following predefined sizes: x-small, small, default, large, and x-large.',
			name: 'navButtonSize',
			type: "VBtn['size']",
		},
		{
			default: 'tonal',
			desc: 'Applies a distinct style to the navigation buttons.',
			name: 'navButtonVariant',
			type: "VBtn['variant']",
		},
		{
			default: '$vuetify.stepper.next',
			desc: vStepperPropDesc,
			name: 'nextText',
			type: 'string',
		},
		{
			default: 'undefined',
			desc: 'The object that contains the pages and fields for the form. See below for more on typing.',
			name: 'pages',
			type: 'Page[]',
		},
		{
			default: '$vuetify.stepper.prev',
			desc: vStepperPropDesc,
			name: 'prevText',
			type: 'string',
		},
		{
			default: 'v-stepper-item--selected',
			desc: vStepperPropDesc,
			name: 'selectedClass',
			type: 'string',
		},
		{
			default: columnsDefault,
			desc: 'Sets the responsive columns for the summary page.',
			name: 'summaryColumns',
			type: columnsType,
		},
		{
			default: 'undefined',
			desc: vStepperPropDesc,
			name: 'theme',
			type: 'string',
		},
		{
			default: 'false',
			desc: vStepperPropDesc,
			name: 'tile',
			type: 'boolean',
		},
		{
			default: 'undefined',
			desc: 'The title of the form.',
			name: 'title',
			type: 'string',
		},
		{
			default: 'end',
			desc: 'Specifies the anchor point for positioning the tooltip, using directional cues to align it either horizontally, vertically, or both…',
			name: 'tooltipLocation',
			type: "VTooltip['location']",
		},
		{
			default: '10',
			desc: 'A single value that offsets content away from the target based upon what side it is on.',
			name: 'tooltipOffset',
			type: "VTooltip['offset']",
		},
		{
			default: 'false',
			desc: `Sets the tooltip transition. ${transitionsText}`,
			name: 'tooltipTransition',
			type: "VTooltip['transition']",
		},
		{
			default: 'fade-transition',
			desc: `The transition used when the component progressing through pages.<br /> ${transitionsText}. ${vStepperWindowItemPropDesc}`,
			name: 'transition',
			type: 'string',
		},
		{
			default: 'undefined',
			desc: 'Change what type of event triggers validation to run.',
			name: 'validateOn',
			type: "| 'blur'<br />	| 'change'<br /> | 'input'",
		},
		{
			default: 'false',
			desc: 'Validates the form on mount.',
			name: 'validateOnMount',
			type: 'boolean',
		},
		{
			default: 'undefined',
			desc: `The validation schema for the form. Both <a href="${links.yup}" target="_blank" nofollow>Yup</a> and <a href="${links.zod}" target="_blank" nofollow>Zod</a> schemas are supported.`,
			name: 'validationSchema',
			type: 'Schema',
		},
		{
			default: 'filled',
			desc: 'Applies a distinct style to the component.',
			name: 'variant',
			type: `
			| 'filled'<br />
			| 'underlined'<br />
			| 'outlined'<br />
			| 'plain'<br />
			| 'solo'<br />
			| 'solo-inverted'<br />
			| 'solo-filled'`,
		},
		{
			default: 'undefined',
			desc: 'Sets the width for the component.',
			name: 'width',
			type: 'string',
		},
	];


	return {
		componentProps,
		propsHeaders,
	};
});
