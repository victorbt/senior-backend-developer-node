import { Category, Query } from '../../../domain/entities/models';
import { ICategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';

export type IUpdateCategory = (query: Query, category: Category) => Promise<Category>;

export const buildUpdateCategory = ({
    categoriesRepo,
}: {
    categoriesRepo: ICategoriesRepo;
}): IUpdateCategory => {
    return async (query, category) => {
        return categoriesRepo.updateOne(query, category)
    };
};
