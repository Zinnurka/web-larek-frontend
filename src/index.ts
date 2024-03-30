import './scss/styles.scss';
import { ProductAPI } from './components/productAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';

const events = new EventEmitter()

const ProductCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

const api = new ProductAPI(API_URL, CDN_URL);
api.getProducts().then(data => console.log(data));



