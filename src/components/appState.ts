import {
	IBasket,
	IOrder,
	IProduct,
	IDeliveryForm,
	PaymentMethod, FormErrors,
} from '../types';
import { IEvents } from './base/events';

export class AppState {
	items: IProduct[] = [];
	order: IOrder;
	formErrors: FormErrors = {};
	basket: IBasket;
	preview: IProduct = null;

	constructor(protected events: IEvents) {
		this.clearOrderAndBasket()
	}

	clearOrderAndBasket() {
		this.order = {
			items: [],
			email: '',
			phone: '',
			payment: 'card',
			address: '',
			total: 0,
		}
		this.basket = {
			items: [],
			total: 0,
		}
	}

	isAddedToBasket(item: IProduct) {
		const basketItems = this.basket.items;
		return basketItems.includes(item.id);
	}

	addInBasket(item: IProduct) {
		this.basket.items.push(item.id);
		this.basket.total = this.basket.total + item.price;
		this.updateBasket();
	}

	removeFromBasket(item: IProduct) {
		this.basket.items = this.basket.items.filter((id) => id != item.id);
		this.basket.total = this.basket.total - item.price;
		this.updateBasket();
	}

	clearBasket() {
		this.basket.items = [];
		this.basket.total = 0;
		this.updateBasket();
	}

	updateBasket() {
		this.events.emit('basket:change', this.basket);
	}

	setItems(items: IProduct[]) {
		this.items = items;
		this.events.emit('items:change', this.items);
	}

	setPreview(item: IProduct) {
		this.preview = item;
		this.events.emit('preview:change', item);
	}

	setPaymentMethod(method: PaymentMethod) {
		this.order.payment = method;
	}

	setOrderField(field: keyof IDeliveryForm, value: string) {
		if (field === 'payment') {
			this.setPaymentMethod(value as PaymentMethod);
		} else {
			this.order[field] = value;
		}

		if (this.order.payment && this.validateOrder()) {
			this.order.total = this.basket.total;
			this.order.items = this.basket.items;
		}
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		if (!this.order.address) {
			errors.phone = 'Необходимо указать адрес';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}