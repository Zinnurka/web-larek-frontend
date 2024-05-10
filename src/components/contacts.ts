import { IDeliveryForm } from '../types';
import { EventEmitter } from './base/events';
import { Form } from './common/form';

export class Contacts extends Form<IDeliveryForm> {

	protected _emailElement: HTMLInputElement;
	protected _phoneElement: HTMLInputElement;

	constructor(container: HTMLFormElement, emitter: EventEmitter) {
		super(container, emitter);
		const controls = this.container.elements;
		this._emailElement = controls.namedItem('email') as HTMLInputElement;
		this._phoneElement = controls.namedItem('phone') as HTMLInputElement;
	}

	set emailElement(value: string) {
		this._emailElement.value = value;
	}

	set phoneElement(value: string) {
		this._phoneElement.value = value;
	}
}