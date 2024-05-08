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

		this._initializeElements();
		this._setupEventHandlers(actions);
	}

	private _initializeElements(): void {
		this._total = ensureElement<HTMLElement>('.order-success__description', this.container);
		this._close = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
	}

	private _setupEventHandlers(actions?: ISuccessActions): void {
		// Setting up event handlers based on provided actions
		const eventTarget = this._close || this.container;  // Fallback to container if no close button
		if (actions?.onClick) {
			eventTarget.addEventListener('click', actions.onClick);
		}
	}

	set total(value: number) {
		// Setting the total value in a formatted string
		this.setText(this._total, `Списано ${value} синапсов`);
	}
}
