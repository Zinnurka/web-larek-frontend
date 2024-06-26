import { View } from './base/component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export class Page extends View<IPage> {
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this.preparation();
	}

	private preparation(): void {
		this._counter = ensureElement<HTMLElement>('.header__basket-counter', this.container);
		this._catalog = ensureElement<HTMLElement>('.gallery', this.container);
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper', this.container);
		this._basket = ensureElement<HTMLElement>('.header__basket', this.container);
		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set disable(value: boolean) {
		this._wrapper.classList.toggle('page__wrapper_locked', value);
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}


}
