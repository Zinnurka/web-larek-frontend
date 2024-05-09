import { AppState } from './components/appState';
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

const appState = new AppState(emitter);

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), emitter);
const basket = new Basket(emitter);
const order = new Order(getClonedTemplate(orderTemplate), emitter);
const contacts = new Contacts(getClonedTemplate(contactsTemplate), emitter);
const page = new Page(container, emitter);

api
	.getProducts()
	.then(appState.setItems.bind(appState))
	.catch((err) => console.log(err));

emitter.on('items:change', handlerItemChange);

emitter.on('card:select', handlerCardSelect);

emitter.on('preview:change', handlerPreviewChange);

emitter.on('basket:change', handlerBasketChange);

emitter.on('basket:open', handlerBasketOpen);

emitter.on('order:open', handlerOrderOpen);

emitter.on(/^order\..*:change/, (data) => handleFormChange(data, order));
emitter.on(/^contacts\..*:change/, (data) => handleFormChange(data, contacts));

emitter.on('formErrors:change', handlerFormErrorsChange);

emitter.on('contacts:submit', handlerContactSubmit);

emitter.on('order:submit', handlerOrderSubmit );

function getClonedTemplate(template: HTMLTemplateElement): HTMLFormElement {
	return cloneTemplate(template);
}

function showModal(content: any) {
	modal.render({ content: content });
	modal.open();
}

function handlerBasketChange() {
	page.counter = appState.basket.items.length;

	basket.items = appState.basket.items.map((id) => {
		const item = appState.items.find((item) => item.id === id);
		const card = new Card(getClonedTemplate(cardBasketTemplate), {
			onClick: () => appState.removeFromBasket(item),
		});
		return card.render(item);
	});

	basket.total = appState.basket.total;
}

function handleFormChange(data:any , target:any ) {
	appState.setOrderField(data.field, data.value);
}

function handlerFormErrorsChange(errors: any) {
	const { payment, address, email, phone } = errors;
	order.valid = !payment && !address;
	contacts.valid = !email && !phone;
}

function handlerOrderOpen(){
	showModal(order.render({
		payment: 'card',
		address: '',
		valid: false,
		errors: [],
	}));
}

function handlerOrderSubmit(){
	showModal(contacts.render({
		phone: '',
		email: '',
		valid: false,
		errors: [],
	}));
}

function handlerContactSubmit(){
	api
		.order(appState.order)
		.then(() => {
			const success = new Success(getClonedTemplate(successTemplate), {
				onClick: () => {
					modal.close();
					appState.clearBasket();
					handlerBasketChange();
				},
			});
			showModal(success.render({ total: appState.order.total }));
		})
		.catch((err) => {
			console.error(err);
		});
}

function handlerBasketOpen (){
	showModal(basket.render());
}

function handlerCardSelect(item:IProduct){
	appState.setPreview(item);
}

function handlerItemChange (items: IProduct[]){
	page.catalog = items.map((item) => {
		const card = new Card(getClonedTemplate(cardCatalogTemplate), {
			onClick: () => emitter.emit('card:select', item),
		});
		return card.render(item);
	});
}

function handlerPreviewChange (item: IProduct){
	const card = new Card(getClonedTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (item.price === null){
				card.setDisabled(card.buttonElement, true)
				card.button = 'Недоступно'
			}
			else if (appState.isAddedToBasket(item)) {
				appState.removeFromBasket(item);
				card.button = 'В корзину';
			} else {
				appState.addInBasket(item);
				card.button = 'Удалить из корзины';
			}
		},
	});

	card.button = appState.isAddedToBasket(item) ? 'Удалить из корзины' : 'В корзину';
	showModal(card.render(item));
}

emitter.on('modal:open', () => {
	page.disable = true;
});

emitter.on('modal:close', () => {
	page.disable = false;
});