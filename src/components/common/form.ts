import { View } from '../base/Component';
import { EventEmitter } from '../base/events';
import { ensureElement } from '../../utils/utils';

interface IFormState {
	valid: boolean;
	errors: string[];
}

export class Form<T extends Record<string, any>> extends View<IFormState> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(
		protected container: HTMLFormElement,
		protected events: EventEmitter
	) {
		super(container, events);

		this._initElements();
		this._setupEventListeners();
	}

	private _initElements(): void {
		this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
	}

	private _setupEventListeners(): void {
		this.container.addEventListener('input', this.handleInputEvent);
		this.container.addEventListener('submit', this.handleSubmitEvent);
	}

	private handleInputEvent = (e: Event): void => {
		const target = e.target as HTMLInputElement;
		const field = target.name as keyof T;
		this.onInputChange(field, target.value);
	};

	private handleSubmitEvent = (e: Event): void => {
		e.preventDefault();
		this.events.emit(`${this.container.name}:submit`);
	};

	protected onInputChange(field: keyof T, value: string): void {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(value: string[]) {
		this._errors.innerHTML = value.join(', ');
	}

	render(state: Partial<T> & IFormState): HTMLFormElement {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
