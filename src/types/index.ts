export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IBasket {
	items: IProduct[];
	total: number;
}

export interface IOrder {
	payment: 'cash' | 'card';
	email: string;
	phone: string;
	address: string;
	items: string[];
	total: number;
}

export type OrderForm = Omit<IOrder, 'total' | 'items'>;

export interface IOrderResult {
	id: string;
	total: number;
}