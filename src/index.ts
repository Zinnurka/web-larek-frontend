import './scss/styles.scss';

import {Api} from "./components/base/api"
import {API_URL} from './utils/constants';


const api = new Api(API_URL)
const product = '/product'

const productCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog')


// Получаем список товаров с сервера
const products = api.get(product)
console.log(products)

