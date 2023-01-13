
import { Request } from 'express';

import { IProductsService } from '../../services/products';

import { Query } from '../../../domain/entities/query.model';

import { Product } from '../../../domain/entities/models';

export const buildListProducts = (service: IProductsService) => {
	return async (
		request: Partial<Request>,
	): Promise<{ products: Product[] }> => {
		let filters = request.body;
		if (!request.body.filters) {
			filters = [];
		};

		let query = new Query(filters, { offset: 0, limit: 0 }, {});

		return { products: await service.listProducts(query) }
	};
};