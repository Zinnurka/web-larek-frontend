import { View } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export class Page extends View<IPage> {
	protected _basket_counter: HTMLElement;
	protected _gallery: HTMLElement;
	protected _page_wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._basket_counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._gallery = ensureElement<HTMLElement>('.gallery');
		this._page_wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});

		this.basket_counter = 0;
	}

	get basket_counter(): number {
		return +this._basket_counter.textContent;
	}


	set basket_counter(value: number) {
		this.setText(this._basket_counter, String(value));
	}

	set locked(value: boolean) {
		if (value) {
			this._page_wrapper.classList.add('page__wrapper_locked');
		} else {
			this._page_wrapper.classList.remove('page__wrapper_locked');
		}
	}

	set gallery(items: HTMLElement[]) {
		this._gallery.replaceChildren(...items);
	}


}