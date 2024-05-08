import { View } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

interface IModalData {
	content: HTMLElement;
}

export class Modal extends View<IModalData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container, events);

		this._initializeElements();
		this._setupEventListeners();
	}

	private _initializeElements(): void {
		this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
		this._content = ensureElement<HTMLElement>('.modal__content', this.container);
	}

	private _setupEventListeners(): void {
		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));

		// Prevent modal from closing when clicking inside the content area
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		// Replace the modal content safely and clear if necessary
		if (value) {
			this._content.replaceChildren(value);
		} else {
			this._content.innerHTML = '';  // Clear content when null
		}
	}

	open(): void {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close(): void {
		this.container.classList.remove('modal_active');
		this.events.emit('modal:close');
	}
}
