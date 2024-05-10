import { Api, ApiListResponse } from './base/api';
import { IOrder, ISuccess, IProduct } from '../types';

export interface IProductAPI {
	getProducts: () => Promise<IProduct[]>;
	getProduct: (id: string) => Promise<IProduct>;
	order: (order: IOrder) => Promise<ISuccess>;
}

export class productAPI extends Api implements IProductAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProducts = (): Promise<IProduct[]> => this.get('/product').then((data: ApiListResponse<IProduct>) =>
		data.items.map((item) => ({
			...item,
			image: this.cdn + item.image,
		}))
	);

	getProduct = (id: string): Promise<IProduct> => this.get(`/product/${id}`).then((item: IProduct) => ({
		...item,
		image: this.cdn + item.image,
	}));

	order = (order: IOrder): Promise<ISuccess> => this.post('/order', order).then((data: ISuccess) => data);
}
