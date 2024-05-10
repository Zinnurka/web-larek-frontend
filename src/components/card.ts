import { IProduct } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/component';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
	protected _price: HTMLElement;
	protected _category?: HTMLElement;
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _buttonTitle?: HTMLButtonElement;
	protected _description?: HTMLElement;
	protected categoryMap: { [key: string]: string } = {
		'софт-скил': 'card__category_soft',
		'другое': 'card__category_other',
		'хард-скил': 'card__category_hard',
		'дополнительное': 'card__category_additional',
		'кнопка': 'card__category_button',
	};

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);

		this._description = container.querySelector(`.card__description`);
		this._category = container.querySelector(`.card__category`);
		this._buttonTitle = container.querySelector(`.card__button`);
		this._image = container.querySelector(`.card__image`);

		if (actions?.onClick) {
			if (this._buttonTitle) {
				this._buttonTitle.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set buttonTitle(value: string) {
		this.setText(this._buttonTitle, value);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	get buttonElement(): HTMLElement {
		return this._buttonTitle;
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	get category(): string {
		return this._category.textContent || '';
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category?.classList?.add(this.categoryMap[value],
		);
	}

	get price(): number {
		return Number(this._price.textContent || '');
	}

	set price(value: number | null) {
		this.setText(
			this._price,
			value ? `${value.toString()} синапсов` : 'Бесценно',
		);
	}

	set description(value: string) {
		if (value) {
			this.setText(this._description, value);
		} else {
			this._description?.remove();
		}
	}

}