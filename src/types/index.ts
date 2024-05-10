export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IBasket {
	items: string[];
	total: number;
}

export type PaymentMethod = 'cash' | 'card';

export interface IOrder {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	items: string[];
	total: number;
}

export type IDeliveryForm = Omit<IOrder, 'total' | 'items'>;

export interface IOrderResult {
	id: string;
	total: number;
}

