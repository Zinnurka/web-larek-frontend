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

const emitter = new EventEmitter();
const api = new productAPI(CDN_URL, API_URL);
const container: HTMLElement = document.body

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const appData = new AppData(emitter);

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), emitter);
const basket = new Basket(emitter);
const order = new Order(getClonedTemplate(orderTemplate), emitter);
const contacts = new Contacts(getClonedTemplate(contactsTemplate), emitter);
const page = new Page(container, emitter);

api
	.getProducts()
	.then(appData.setItems.bind(appData))
	.catch((err) => console.log(err));

emitter.on('items:change', (items: IProduct[]) => {
	page.catalog = items.map((item) => {
		const card = new Card(getClonedTemplate(cardCatalogTemplate), {
			onClick: () => emitter.emit('card:select', item),
		});
		return card.render(item);
	});
});

emitter.on('card:select', (item: IProduct) => {
	appData.setPreview(item);
});

emitter.on('preview:change', (item: IProduct) => {
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

emitter.on('basket:change', handleBasketChange);

emitter.on('basket:open', () => {
	showModal(basket.render());
});

emitter.on('order:open', () => {
	showModal(order.render({
		payment: 'card',
		address: '',
		valid: false,
		errors: [],
	}));
});

emitter.on(/^order\..*:change/, (data) => handleFormChange(data, order));
emitter.on(/^contacts\..*:change/, (data) => handleFormChange(data, contacts));

emitter.on('formErrors:change', handleFormErrorsChange);

emitter.on('contacts:submit', () => {
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

emitter.on('order:submit', () => {
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

// блокировка и разблокировка прокрутки страницы
emitter.on('modal:open', () => {
	page.disable = true;
});

emitter.on('modal:close', () => {
	page.disable = false;
});