import {Api} from './base/api';
import { data } from 'autoprefixer';

const product = '/product'
interface IProductAPI {
	getProducts: () => Promise<object>;

}

export class ProductAPI extends Api implements IProductAPI {
	readonly cdn: string;
	constructor(baseUrl: string,cdn: string) {
		super(baseUrl);
		this.cdn = cdn
	}

	getProducts():Promise<object> {
		return this.get(product)
	}
}