import { Category, Query } from '../../../domain/entities/models';
import { ICategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';

export type ICategoryDetail = (query: Query) => Promise<Category>;

export const buildCategoryDetail = ({
    categoriesRepo,
}: {
    categoriesRepo: ICategoriesRepo;
}): ICategoryDetail => {
    return async query => {
        return categoriesRepo.findOne(query)
    };
};
