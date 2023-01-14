import { ICategory } from 'domain/entities/category.model';

import { ICategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';

export type ISearchCategories = (text: string) => Promise<ICategory[]>;

export const buildSearchCategories = ({
	categoriesRepo
}: {
	categoriesRepo: ICategoriesRepo;
}): ISearchCategories => {
	return async text => {
		return await categoriesRepo.search(text);
	};
};