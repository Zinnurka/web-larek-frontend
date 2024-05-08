import { AppData } from './components/appData';
import { Card } from './components/card';
import { Contacts } from './components/contacts';
import { Order } from './components/order';
import { Page } from './components/page';
import { Success } from './components/success';
import { productAPI } from './components/productAPI';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/common/basket';
import { Modal } from './components/common/modal';
import './scss/styles.scss';
import { IProduct } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter();
const api = new productAPI(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const modalTemplate = ensureElement<HTMLElement>('#modal-container');

const appData = new AppData(events);

const page = new Page(document.body, events);
const modal = new Modal(modalTemplate, events);
const basket = new Basket(events);
const order = new Order(getClonedTemplate(orderTemplate), events);
const contacts = new Contacts(getClonedTemplate(contactsTemplate), events);

api
	.getProducts()
	.then(appData.setItems.bind(appData))
	.catch((err) => console.log(err));

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

events.on('items:change', (items: IProduct[]) => {
	page.catalog = items.map((item) => {
		const card = new Card(getClonedTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render(item);
	});
});

events.on('card:select', (item: IProduct) => {
	appData.setPreview(item);
});

events.on('preview:change', (item: IProduct) => {
	const card = new Card(getClonedTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (appData.inBasket(item)) {
				appData.removeFromBasket(item);
				card.button = 'В корзину';
			} else {
				appData.addToBasket(item);
				card.button = 'Удалить из корзины';
			}
		},
	});

	card.button = appData.inBasket(item) ? 'Удалить из корзины' : 'В корзину';
	showModal(card.render(item));
});

events.on('basket:change', handleBasketChange);

events.on('basket:open', () => {
	showModal(basket.render());
});

events.on('order:open', () => {
	showModal(order.render({
		payment: 'card',
		address: '',
		valid: false,
		errors: [],
	}));
});

events.on(/^order\..*:change/, (data) => handleFormChange(data, order));
events.on(/^contacts\..*:change/, (data) => handleFormChange(data, contacts));

events.on('formErrors:change', handleFormErrorsChange);

events.on('contacts:submit', () => {
	api
		.order(appData.order)
		.then(() => {
			const success = new Success(getClonedTemplate(successTemplate), {
				onClick: () => {
					modal.close();
					appData.clearBasket();
					handleBasketChange();
				},
			});
			showModal(success.render({ total: appData.order.total }));
		})
		.catch((err) => {
			console.error(err);
		});
});

events.on('order:submit', () => {
	showModal(contacts.render({
		phone: '',
		email: '',
		valid: false,
		errors: [],
	}));
});

function getClonedTemplate(template: HTMLTemplateElement): HTMLFormElement {
	return cloneTemplate(template);
}

function showModal(content: any) {
	modal.render({ content: content });
	modal.open();
}

function handleBasketChange() {
	page.counter = appData.basket.items.length;

	basket.items = appData.basket.items.map((id) => {
		const item = appData.items.find((item) => item.id === id);
		const card = new Card(getClonedTemplate(cardBasketTemplate), {
			onClick: () => appData.removeFromBasket(item),
		});
		return card.render(item);
	});

	basket.total = appData.basket.total;
}

function handleFormChange(data:any , target:any ) {
	appData.setOrderField(data.field, data.value);
}

function handleFormErrorsChange(errors: any) {
	const { payment, address, email, phone } = errors;
	order.valid = !payment && !address;
	contacts.valid = !email && !phone;
}
