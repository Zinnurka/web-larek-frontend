import './scss/styles.scss';
import {ProductAPI} from './components/productAPI'
import {API_URL, CDN_URL} from './utils/constants';

const api = new ProductAPI(API_URL,CDN_URL)
api.getProducts().then(data=>console.log(data))