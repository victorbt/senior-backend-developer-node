import { ICategory } from 'domain/entities/category.model';

import { ICategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';

import { IQuery } from '../../../domain/entities/query.model';

export type IListCategories = (query: IQuery) => Promise<ICategory[]>;

export const buildListCategories = ({
	categoriesRepo
}: {
	categoriesRepo: ICategoriesRepo;
}): IListCategories => {
	return async query => {
		return await categoriesRepo.find(query);
	};
};