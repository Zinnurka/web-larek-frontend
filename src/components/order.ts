import { Form } from './common/Form';
import { OrderForm, PaymentMethod } from '../types';
import { EventEmitter } from './base/events';
import { ensureElement } from '../utils/utils';

export class Order extends Form<OrderForm> {
	protected _cardPayment: HTMLButtonElement;
	protected _cashPayment: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: EventEmitter) {
		super(container, events);

		this._cardPayment = ensureElement<HTMLButtonElement>(
			'.button_alt[name=card]',
			this.container
		);
		this._cashPayment = ensureElement<HTMLButtonElement>(
			'.button_alt[name=cash]',
			this.container
		);

		this._cardPayment.addEventListener('click', () => {
			this.payment = 'card';
			this.onInputChange('payment', 'card');
		});

		this._cashPayment.addEventListener('click', () => {
			this.payment = 'cash';
			this.onInputChange('payment', 'cash');
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	set payment(value: PaymentMethod) {
		this._cardPayment.classList.toggle('button_alt-active', value === 'card');
		this._cashPayment.classList.toggle('button_alt-active', value === 'cash');
	}
}