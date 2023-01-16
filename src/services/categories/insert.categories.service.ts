import { Category } from '../../../domain/entities/category.model';

import { ICategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';

export type IInsertCategories = (Categories: Category[]) => Promise<Category[]>;

export const buildInsertCategories = ({
    categoriesRepo,
}: {
    categoriesRepo: ICategoriesRepo;
}): IInsertCategories => {
    return async Categories => {
        return categoriesRepo.insertMany(Categories)
    };
};
