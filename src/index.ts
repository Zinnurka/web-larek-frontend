import './scss/styles.scss';
import { productAPI } from './components/productAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { Card } from './components/Card';
import { list } from 'postcss';

const contentElement = document.querySelector('.gallery');
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;

const product = new productAPI(API_URL, CDN_URL);

product.getProducts().then(item => {
	item['items'].forEach(item=>{
		const card = new Card(cardCatalogTemplate);
		contentElement.prepend(card.render(item));
	})
});