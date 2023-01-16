
import { Request } from 'express';

import { ICategoriesService } from '../../services/categories';

import { Query } from '../../../domain/entities/query.model';

import { Category } from '../../../domain/entities/models';

export const buildListCategories = (service: ICategoriesService) => {
	return async (
		request: Partial<Request>,
	): Promise<{ categories: Category[] }> => {
		let filters = request.body;
		if (!request.body.filters) {
			filters = [];
		};

		let limit = 1000

		if (request.query?.limit) {
			limit = parseInt(request.query?.limit as string)
		};

		let offset = 0

		if (request.query?.limit) {
			offset = parseInt(request.query?.limit as string)
		};

		let query = new Query(filters, { offset, limit }, {});

		return { categories: await service.listCategories(query) }
	};
};