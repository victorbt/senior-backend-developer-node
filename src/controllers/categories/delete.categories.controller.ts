import { Request } from 'express'
import { ICategoriesService } from '../../services/categories';

export const buildDeleteCategory = (service: ICategoriesService) => {
    return async (
        request: Partial<Request>,
    ): Promise<void> => {
        try {
            let ok = await service.deleteCategory(request.body);
            if (ok) {
                return
            }
        } catch (e) {
            throw e;
        }

    };
};