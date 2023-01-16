import { Request } from 'express';

import { ICategoriesService } from '../../services/categories';

import { Query} from '../../../domain/entities/query.model';

import { Category } from '../../../domain/entities/models';

type CategoryData = Omit<Category, '_id' | 'id'>;

export const buildUpdateCategory = (service: ICategoriesService) => {
    return async (
        request: Partial<Request>,
    ): Promise<Category> => {
        let categoryId =  request.params?.['id'] as string
        let categoryID = parseInt(categoryId);

        let query = new Query([{ field: "id", operator: "$eq", value: categoryID }], {}, {});

        return await service.updateCategory(query, request.body as CategoryData);
    };
};