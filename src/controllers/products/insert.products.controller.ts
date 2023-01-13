import { Request } from 'express'

import { Product } from 'domain/entities/product.model';

import { IProductsService } from '../../services/products';

export const buildInsertProducts = (service: IProductsService) => {
	return async (
		request: Partial<Request>,
	): Promise<{ insertedID: number[] }> => {
		return { insertedID: await service.insertProducts(request.body as Product[]) };
	};
};