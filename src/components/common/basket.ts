import { IBasket } from '../../types';
import { cloneTemplate, createElement, ensureElement } from '../../utils/utils';
import { View } from '../base/component';
import { EventEmitter } from '../base/events';

export class Basket extends View<IBasket> {
	static template = ensureElement<HTMLTemplateElement>('#basket');
	private _list: HTMLElement;
	private _total: HTMLElement;
	private _button: HTMLElement;
	private _items: HTMLElement[] = [];

	constructor(protected events: EventEmitter) {
		super(cloneTemplate(Basket.template), events);
		this._total = this.container.querySelector('.basket__price');
		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._button = this.container.querySelector('.button');
		this._button?.addEventListener('click', () => {
			this.events.emit('order:open');
		});

	}

	set selected(items: string[]) {
		this.setDisabled(this._button, items.length === 0);
	}

	get items(): HTMLElement[] {
		return this._items;
	}

	set items(items: HTMLElement[]) {
		this._items = items;
		if (items.length) {
			items.forEach((item, index) => {
				const numbering = item.querySelector('.basket__item-index');
				numbering.textContent = `${index + 1}`;
			});
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста'
				})
			);
		}
		this.setDisabled(this._button, items.length === 0);
	}

	set total(total: number) {
		this.setText(this._total, `${total} синапсов`);
	}
}
