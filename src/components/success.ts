import { IOrderResult } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
interface ISuccessActions {
	onClick: (event: MouseEvent) => void;
}

export class Success extends Component<IOrderResult> {
	protected _total: HTMLElement;
	protected _close: HTMLButtonElement;

	constructor(protected container: HTMLFormElement, actions?: ISuccessActions) {
		super(container);
		this._total = this.container.querySelector('.order-success__description');
		this._close = this.container.querySelector('.order-success__close');
		const eventTarget = this._close || this.container;
		if (actions?.onClick) {
			eventTarget.addEventListener('click', actions.onClick);
		}
	}
	set total(value: number) {
		this.setText(this._total, `Списано ${value} синапсов`);
	}
}
