
import { Request } from 'express';

import { IProductsService } from '../../services/products';

import { Query, IFilter } from '../../../domain/entities/models';

import { Product } from '../../../domain/entities/models';

type ProductData = Omit<Product, '_id'>;

export const buildListProducts = (service: IProductsService) => {
	return async (
		request: Partial<Request>,
	): Promise<{ products: Product[] }> => {
		let filters: IFilter[]

		let filtersBody = request.body;
		if (!filtersBody.filters) {
			filters = [];
		} else {
			filters = request.body.filters as IFilter[]
		}

		let limit = 1000

		if (request.query?.limit) {
			limit = parseInt(request.query?.limit as string)
		};

		let offset = 0

		if (request.query?.limit) {
			offset = parseInt(request.query?.limit as string)
		};

		let query = new Query(filters, { offset, limit }, {});

		return { products: await service.listProducts(query) as ProductData[] }
	};
};