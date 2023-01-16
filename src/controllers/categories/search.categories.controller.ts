import { Request } from 'express';

import { ICategoriesService } from '../../services/categories';

import { Category } from '../../../domain/entities/models';

export const buildSearchCategories = (service: ICategoriesService) => {
    return async (
        request: Partial<Request>,
    ): Promise<{ categories: Category[] }> => {
        let text = request.body['text'] as string

        return {
            categories: await service.searchCategories(text)
        };
    };
};