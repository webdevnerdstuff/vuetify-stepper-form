import {
	useOnActions
} from '../validation';
import type {
	Field,
} from '../../types';
import type { SinonStub } from 'cypress/types/sinon';


describe('Validation Composable', () => {

	describe('useOnActions', () => {
		const actions = ['blur', 'change', 'input', 'click'] as const;
		let emitSpy: SinonStub<any[], any>;
		let validateStub: SinonStub<any[], any>;
		let field: Field;
		let options: {
			action: ValidateAction;
			emit: any;
			field: Field;
			settingsValidateOn: Settings['validateOn'];
			validate: any;
		};

		beforeEach(() => {
			emitSpy = cy.stub();
			validateStub = cy.stub().resolves();
			field = { name: 'foo', validateOn: undefined };
			options = {
				action: 'blur',
				emit: emitSpy,
				field,
				settingsValidateOn: undefined,
				validate: validateStub,
			};
		});

		const runValidationTest = () => {
			cy.wrap(null).then(() => useOnActions(options)).then(() => {
				expect(validateStub).to.have.been.calledOnce;
				expect(emitSpy).to.have.been.calledWith('validate', field);
			});
		};

		actions.forEach((action) => {
			it(`should call validate and emit for "${action}" action  action when validateOn is "${action}"`, () => {
				options.action = action;
				options.settingsValidateOn = action;
				field.validateOn = action;
				runValidationTest();
			});
		});

		it('should not call validate or emit for unrelated actions', () => {
			options.action = 'keydown' as any;
			cy.wrap(null).then(() => useOnActions(options)).then(() => {
				expect(validateStub).not.to.have.been.called;
				expect(emitSpy).not.to.have.been.called;
			});
		});
	});
});
