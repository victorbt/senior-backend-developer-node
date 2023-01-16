import { Request } from 'express'

import { Category, Query } from '../../../domain/entities/models'

import { ICategoriesService } from '../../services/categories';

export const buildCategoryDetail = (service: ICategoriesService) => {
    return async (
        request: Partial<Request>,
    ): Promise<Category> => {
        try {
            let categoryId: string = request.params ? request.params?.['id'] : "0";
            let categoryID = parseInt(categoryId);

            let query = new Query([{ field: "id", operator: "$eq", value: categoryID }], {}, {});

            return await service.categoryDetail(query);
        } catch (e) {
            throw e;
        }
    };
};