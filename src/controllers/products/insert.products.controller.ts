import { Request } from 'express'

import { Product } from 'domain/entities/product.model';

import { IProductsService } from '../../services/products';
import { ApiError } from '../../../src/errors/api.error';
import { StatusCodes } from 'http-status-codes';

type ProductData = Pick<Product, 'name' | 'price' | 'categories'>;

export const buildInsertProducts = (service: IProductsService) => {
	return async (
		request: Partial<Request>,
	): Promise<{ insertedID: number[] }> => {
		try {
			let products = request.body as ProductData[]

			if (products.length == 0) {
				throw new ApiError("empty products list", StatusCodes.BAD_REQUEST)
			}

			return { insertedID: await service.insertProducts(products as Product[]) };
		}
		catch (e) {
			console.log(e)
			throw e
		}
	};
};