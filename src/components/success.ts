import { ISuccess, ISuccessActions } from '../types';
import { Component } from './base/component';

export class Success extends Component<ISuccess> {
	protected _closeButton: HTMLButtonElement;
	protected _total: HTMLElement;

	constructor(protected container: HTMLFormElement, actions?: ISuccessActions) {
		super(container);
		this._total = this.container.querySelector('.order-success__description');
		this._closeButton = this.container.querySelector('.order-success__close');
		const eventTarget = this._closeButton || this.container;
		if (actions?.onClick) {
			eventTarget.addEventListener('click', actions.onClick);
		}
	}
	set total(value: number) {
		this._total.textContent = `Списано ${value} синапсов`
	}
}
