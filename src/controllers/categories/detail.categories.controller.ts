import { Request } from 'express'

import { Category } from '../../../domain/entities/category.model'

import { ICategoriesService } from '../../services/categories';

export const buildProductDetail = (service: ICategoriesService) => {
    return async (
        request: Partial<Request>,
    ): Promise<Category> => {
        try {
            let categoryId: string = request.params ? request.params?.['id'] : "0";
            let categoryID = parseInt(categoryId);
            return await service.categoryDetail(categoryID);
        } catch (e) {
            throw e;
        }
    };
};