import { defineStore } from 'pinia';
import { useCoreStore } from './index';


export const useMenuStore = defineStore('menu', () => {
	const coreStore = useCoreStore();
	const links = coreStore.links;

	const componentItems = [
		{
			href: '#components-v-autocomplete',
			icon: 'mdi:mdi-playlist-edit',
			key: 'v-autocomplete',
			link: `${links.vuetify}en/api/v-autocomplete/`,
			title: 'VAutocomplete',
			topTitle: 'VAutocomplete',
		},
		{
			href: '#components-v-checkbox',
			icon: 'mdi:mdi-checkbox-outline',
			key: 'v-checkbox',
			link: `${links.vuetify}en/api/v-checkbox/`,
			title: 'VCheckbox',
			topTitle: 'VCheckbox',
		},
		{
			href: '#components-v-combobox',
			icon: 'mdi:mdi-playlist-edit',
			key: 'v-combobox',
			link: `${links.vuetify}en/api/v-combobox/`,
			title: 'VCombobox',
			topTitle: 'VCombobox',
		},
		{
			href: '#components-v-color-field',
			icon: 'mdi:mdi-palette',
			key: 'v-color-field',
			link: `${links.vColorField}`,
			title: 'VColorField',
			topTitle: 'VColorField',
		},
		{
			href: '#components-v-fancy-radio',
			icon: 'mdi:mdi-star-box',
			key: 'v-fancy-radio',
			link: ``,
			title: 'VFancyRadio',
			topTitle: 'VFancyRadio',
		},
		{
			href: '#components-v-file-input',
			icon: 'mdi:mdi-paperclip',
			key: 'v-file-input',
			link: `${links.vuetify}en/api/v-file-input/`,
			title: 'VFileInput',
			topTitle: 'VFileInput',
		},
		{
			href: '#components-v-radio',
			icon: 'mdi:mdi-circle-slice-8',
			key: 'v-radio',
			link: `${links.vuetify}en/api/v-radio/`,
			title: 'VRadio',
			topTitle: 'VRadio',
		},
		{
			href: '#components-v-select',
			icon: 'mdi:mdi-format-list-bulleted',
			key: 'v-select',
			link: `${links.vuetify}en/api/v-select/`,
			title: 'VSelect',
			topTitle: 'VSelect',
		},
		{
			href: '#components-v-switch',
			icon: 'mdi:mdi-toggle-switch-off-outline',
			key: 'v-switch',
			link: `${links.vuetify}en/api/v-switch/`,
			title: 'VSwitch',
			topTitle: 'VSwitch',
		},
		{
			href: '#components-v-textarea',
			icon: 'mdi:mdi-text-long',
			key: 'v-textarea',
			link: `${links.vuetify}en/api/v-textarea/`,
			title: 'VTextarea',
			topTitle: 'VTextarea',
		},
		{
			href: '#components-v-text-field',
			icon: 'mdi:mdi-minus',
			key: 'v-text-field',
			link: `${links.vuetify}en/api/v-text-field/`,
			title: 'VTextField',
			topTitle: 'VTextField',
		},
	];

	const vuetifyLinks = [
		{
			icon: 'mdi:mdi-github',
			key: 'vuetify-github',
			link: links.vuetifyGithub,
			title: 'Github',
		},
		{
			key: 'vuetify',
			link: `${links.vuetify}en/components/all/`,
			title: 'Vuetify Components',
		},
	];

	const menuItems = [
		{
			href: '#home',
			icon: 'mdi:mdi-home',
			title: 'Home',
		},
		{
			href: '#installation',
			icon: 'mdi:mdi-plus-thick',
			title: 'Installation',
		},
		{
			href: '#description',
			icon: 'mdi:mdi-information-outline',
			title: 'Description',
		},
		{
			href: '#usage',
			icon: 'mdi:mdi-power-plug-outline',
			title: 'Usage',
		},
		{
			href: '#example',
			icon: 'mdi:mdi-code-json',
			title: 'Example',
		},
		{
			href: '#components',
			icon: '$vuetify',
			items: [
				...componentItems,
				// {
				// 	href: '#components-v-inline-custom-field',
				// 	icon: 'mdi:mdi-mushroom',
				// 	key: 'v-inline-custom-field',
				// 	title: 'VInlineCustomField',
				// 	topTitle: 'VInlineCustomField',
				// }
			],
			key: 'components',
			title: 'Components',
		},
		{
			href: '#props',
			icon: 'mdi:mdi-cog',
			items: [
				{
					href: '#props',
					icon: 'mdi:mdi-cog',
					key: 'shared-props',
					title: 'Props',
				},
				{
					href: '#props-pages',
					icon: 'mdi:mdi-book-open-outline',
					key: 'pages-props',
					title: 'Pages',
				},
				{
					href: '#props-fields',
					icon: 'mdi:mdi-form-textbox',
					key: 'fields-props',
					title: 'Fields',
				},
			],
			title: 'Props',
		},
		{
			href: '#events',
			icon: 'mdi:mdi-calendar-star',
			title: 'Events',
		},
		{
			href: '#slots',
			icon: 'mdi:mdi-slot-machine',
			title: 'Slots',
		},
		{
			href: '#playground',
			icon: 'mdi:mdi-seesaw',
			title: 'Playground',
		},
		{
			href: '#dependencies',
			icon: 'mdi:mdi-asterisk-circle-outline',
			title: 'Dependencies',
		},
		{
			href: '#license',
			icon: 'mdi:mdi-card-account-details-outline',
			title: 'License',
		},
		{
			href: '#legal',
			icon: 'mdi:mdi-scale-balance',
			title: 'Legal',
		},
	];

	return {
		componentItems,
		menuItems,
		vuetifyLinks,
	};
});
