
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

		let query = new Query(filters, { offset: 0, limit: 0 }, {});

		return { categories: await service.listCategories(query) }
	};
};