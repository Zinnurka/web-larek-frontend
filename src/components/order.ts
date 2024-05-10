import { Form } from './common/Form';
import { IDeliveryForm } from '../types';
import { EventEmitter } from './base/events';
import { ensureElement } from '../utils/utils';

export class Order extends Form<IDeliveryForm> {
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;

	constructor(container: HTMLFormElement, emitter: EventEmitter) {
		super(container, emitter);

		this._card = ensureElement<HTMLButtonElement>(
			'.button_alt[name=card]',
			this.container
		);
		this._cash = ensureElement<HTMLButtonElement>(
			'.button_alt[name=cash]',
			this.container
		);

		this._card.addEventListener('click', () => {
			this._card.classList.add('button_alt-active')
			this._cash.classList.remove('button_alt-active')
			this.onInputChange('payment', 'card');
		});

		this._cash.addEventListener('click', () => {
			this._cash.classList.add('button_alt-active')
			this._card.classList.remove('button_alt-active')
			this.onInputChange('payment', 'cash');
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}