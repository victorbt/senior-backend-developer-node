import { Request } from 'express'

import { Product } from 'domain/entities/product.model';

import { IProductsService } from '../../services/products';

type ProductData = Omit<Product, '_id' | 'id'>;

export const buildInsertProducts = (service: IProductsService) => {
	return async (
		request: Partial<Request>,
	): Promise<{ products: Product[] }> => {
		try {
			let products = request.body as ProductData[]

			return { products: await service.insertProducts(products as Product[]) };
		}
		catch (e) {
			console.log(e)
			throw e
		}
	};
};