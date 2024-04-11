import { Api } from './base/api';

export class productAPI extends Api {
	product = '/product/';
	cdn: string;

	constructor(baseUrl: string, cdn: string) {
		super(baseUrl);
		this.cdn = cdn;
	}

	getProducts() {
		return this.get(this.product);
	}
}