import { defineStore } from 'pinia';
import { useCoreStore } from './index';


export const useMenuStore = defineStore('menu', () => {
	const coreStore = useCoreStore();
	const links = coreStore.links;

	const componentItems = [
		{
			href: '#components',
			icon: '$vuetify',
			key: 'components',
			link: '',
			title: 'Vuetify',
		},
		{
			href: '#components-buttons-field',
			icon: 'mdi:mdi-button-cursor',
			key: 'buttons-field',
			link: '',
			title: 'Buttons Field',
		},
		// {
		// 	href: '#components-field-label',
		// 	icon: 'mdi:mdi-label',
		// 	key: 'field-label',
		// 	link: '',
		// 	title: 'Field Label',
		// },
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
			href: '#components',
			icon: '$vuetify',
			items: [
				...componentItems,
			],
			key: 'components',
			title: 'Components',
		},
		{
			href: '#validation',
			icon: 'mdi:mdi-check-circle-outline',
			title: 'Validation',
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
			href: '#examples',
			icon: 'mdi:mdi-code-json',
			items: [
				{
					href: '#examples',
					icon: 'mdi:mdi-code-json',
					key: 'examples-basic',
					title: 'Simple Form',
				},
				{
					href: '#examples-responsive-columns',
					icon: 'mdi:mdi-code-json',
					key: 'examples-responsive-columns',
					title: 'Columns',
				},
				{
					href: '#examples-field-slots',
					icon: 'mdi:mdi-code-json',
					key: 'examples-field-slots',
					title: 'Slots',
				},
				{
					href: '#examples-validation',
					icon: 'mdi:mdi-code-json',
					key: 'examples-validation',
					title: 'Validation',
				},
				{
					href: '#examples-conditional-fields',
					icon: 'mdi:mdi-code-json',
					key: 'examples-conditional-fields',
					title: 'Conditional Fields',
				},
				{
					href: '#examples-summary-page',
					icon: 'mdi:mdi-code-json',
					key: 'examples-summary-page',
					title: 'Summary Page',
				},
				{
					href: '#examples-buttons-field',
					icon: 'mdi:mdi-code-json',
					key: 'examples-buttons-field',
					title: 'Buttons Field',
				},
			],
			title: 'Examples',
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
