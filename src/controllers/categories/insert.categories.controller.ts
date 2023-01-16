import { Request } from 'express'

import { Category } from 'domain/entities/category.model';

import { ICategoriesService } from '../../services/categories';

type CategoryData = Omit<Category, '_id' | 'id'>;

export const buildInsertCategories = (service: ICategoriesService) => {
    return async (
        request: Partial<Request>,
    ): Promise<{ categories: Category[] }> => {
        try {
            let categories = request.body as CategoryData[]

            return { categories: await service.insertCategories(categories as Category[]) };
        }
        catch (e) {
            console.log(e)
            throw e
        }
    };
};