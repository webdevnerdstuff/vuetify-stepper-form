import VSFTestField from '../VSFTestField.vue';


describe('<VSFTestField />', () => {
	it('mounts', () => {
		// see: https://on.cypress.io/mounting-vue
		cy.mount(VSFTestField, {
			props: {
				foo: 'bar',
			},
		});
	});
});
